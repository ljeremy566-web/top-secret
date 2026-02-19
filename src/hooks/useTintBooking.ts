import { useState, useEffect } from 'react';
import { fetchPricesByVehicle, type CarType, type TintServiceItem } from '../services/tintService';
import { safeGetItem, safeSetItem } from '../lib/storage';

export type ServiceMode = 'shop' | 'mobile';

export interface CartItem extends TintServiceItem {
    uid: string;
}

export const useTintBooking = () => {
    // --- ESTADOS DE UI ---
    const [view, setView] = useState<'selection' | 'booking'>('selection');
    const [loading, setLoading] = useState<boolean>(true);

    // --- ESTADOS PERSISTENTES (LocalStorage) ---
    const [carType, setCarType] = useState<CarType>(() =>
        (safeGetItem('tint_car') as CarType) || 'sedan'
    );

    const [mode, setMode] = useState<ServiceMode>(() =>
        (safeGetItem('tint_mode') as ServiceMode) || 'shop'
    );

    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const saved = safeGetItem('tint_cart');
            if (!saved) return [];
            const parsed: CartItem[] = JSON.parse(saved);
            // Filter out items from old format that don't have a valid price
            return parsed.filter((item) => typeof item.price === 'number' && !isNaN(item.price));
        } catch {
            return [];
        }
    });

    // --- ESTADO DE DATOS (Supabase) ---
    const [availableServices, setAvailableServices] = useState<TintServiceItem[]>([]);

    // Persistencia
    useEffect(() => safeSetItem('tint_car', carType), [carType]);
    useEffect(() => safeSetItem('tint_mode', mode), [mode]);
    useEffect(() => safeSetItem('tint_cart', JSON.stringify(cart)), [cart]);

    // --- OBTENER DATOS AL CAMBIAR DE CARRO ---
    useEffect(() => {
        let isMounted = true;

        const loadPrices = async () => {
            setLoading(true);
            const data = await fetchPricesByVehicle(carType);

            if (isMounted) {
                console.log('✅ Precios cargados desde Supabase:', data);
                setAvailableServices(data);

                // Limpiar el carrito cuando cambia el tipo de auto para evitar precios incorrectos
                setCart([]);

                setLoading(false);
            }
        };

        loadPrices();

        return () => {
            isMounted = false;
        };
    }, [carType]);

    // --- LÓGICA DEL CARRITO ---
    const toggleCartItem = (item: TintServiceItem) => {
        // Usar db_price_id para identificación única, o combinar nombre + categoría como respaldo
        const exists = cart.find((i) =>
            i.db_price_id ? i.db_price_id === item.db_price_id : (i.name === item.name && i.category === item.category)
        );

        if (exists) {
            // Remover del carrito
            setCart(cart.filter((i) =>
                i.db_price_id ? i.db_price_id !== item.db_price_id : (i.name !== item.name || i.category !== item.category)
            ));
        } else {
            // Agregar al carrito
            const newItem: CartItem = { ...item, uid: createUuid() };
            setCart([...cart, newItem]);
        }
    };

    const total = cart.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

    // Filtros Helpers para la UI
    const carbonServices = availableServices.filter((s) => s.category === 'carbon');
    const ceramicServices = availableServices.filter((s) => s.category === 'ceramic');

    return {
        view, setView,
        carType, setCarType,
        mode, setMode,
        cart, toggleCartItem,
        total,
        loading,
        carbonServices,
        ceramicServices,
    };
};

function createUuid(): string {
    const cryptoObj = (typeof globalThis !== 'undefined' ? globalThis.crypto : undefined) as {
        randomUUID?: () => string;
        getRandomValues?: (arr: Uint8Array) => void;
    } | undefined;
    if (cryptoObj?.randomUUID) {
        return cryptoObj.randomUUID();
    }
    if (!cryptoObj?.getRandomValues) {
        return `fallback-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
    }
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    // RFC 4122 version 4
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
