// src/services/tintService.ts
// ──────────────────────────────────────────────────
// Servicio que obtiene precios de tint desde Supabase
// usando la instancia de axios configurada.
// ──────────────────────────────────────────────────

import axios from 'axios';
import { getRequiredEnv } from '../lib/env';

export type CarType = 'coupe' | 'sedan' | 'suv';

export interface TintServiceItem {
    db_price_id: number;
    name: string;
    price: number;
    squareId: string | null;
    category: 'carbon' | 'ceramic';
}

interface SupabasePriceRow {
    id: number;
    amount: number;
    square_id: string | null;
    services: {
        name: string;
        categories: {
            slug: 'carbon' | 'ceramic';
        };
    } | null;
}

// Supabase REST endpoint base
const SUPABASE_URL = getRequiredEnv('VITE_SUPABASE_URL');
const SUPABASE_KEY = getRequiredEnv('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');

const supabaseRest = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
    },
});

/**
 * Fetch tint prices for a specific vehicle type from Supabase.
 *
 * Query:  prices → vehicle_types (inner join, filter by slug)
 *                → services → categories (to get name + category)
 */
export async function fetchPricesByVehicle(carType: CarType): Promise<TintServiceItem[]> {
    try {
        const { data } = await supabaseRest.get('/prices', {
            params: {
                select: 'id,amount,square_id,vehicle_types!inner(slug),services(name,categories(slug))',
                'vehicle_types.slug': `eq.${carType}`,
                order: 'amount.asc',
            },
        });

        // Transform raw Supabase response → app-friendly format
        return (data ?? []).map((row: SupabasePriceRow) => ({
            db_price_id: row.id,
            name: row.services?.name ?? 'Unknown',
            price: Number(row.amount),
            squareId: row.square_id ?? null,
            category: (row.services?.categories?.slug ?? 'carbon') as 'carbon' | 'ceramic',
        }));
    } catch (error) {
        console.error('Error fetching tint prices:', error);
        return [];
    }
}
