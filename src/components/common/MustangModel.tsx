/*
  3D Mustang Model with interactive tint animation.
  Model: 2015 Ford Mustang GT.
  Includes custom paint, animated glass tint, and fixed materials for critical parts.
*/

import * as THREE from 'three';
import { useRef, useEffect, useMemo, type JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { animate } from 'animejs';
import type { GLTF } from 'three-stdlib';

// ─── Tint Configuration ─────────────────────────────────────────────
export interface TintConfig {
    color: string;
    opacity: number;
    roughness: number;
    transmission: number;
}

export const TINT_CONFIGS: Record<number, TintConfig> = {
    0: { color: '#cce8ff', opacity: 0.15, roughness: 0.05, transmission: 0.95 }, // Clear
    1: { color: '#8ab5d4', opacity: 0.35, roughness: 0.08, transmission: 0.70 }, // Light
    2: { color: '#3d6a8a', opacity: 0.55, roughness: 0.12, transmission: 0.45 }, // Medium
    3: { color: '#1e3347', opacity: 0.75, roughness: 0.18, transmission: 0.20 }, // Dark
    4: { color: '#080c10', opacity: 0.95, roughness: 0.05, transmission: 0.05 }, // Limo
};

// ─── GLTF Types ──────────────────────────────────────────────────────
type GLTFResult = GLTF & {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
};

// ─── Component ───────────────────────────────────────────────────────
interface MustangModelProps {
    tintLevel: number;
    bodyColor?: string; // Optional custom body color
}

// Default to a vibrant Red to make the tint pop
export function MustangModel({ tintLevel, bodyColor = '#d62828', ...props }: MustangModelProps & JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/mustang/scene.gltf') as unknown as GLTFResult;

    // ─── Custom Materials ───

    // 1. Premium Metallic Body Paint (Red default)
    const bodyMaterial = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(bodyColor),
            metalness: 0.7,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            envMapIntensity: 1.5,
        });
    }, [bodyColor]);

    // 2. Rubber Material (Fixes potential "L2" / generic material issues on tires)
    const rubberMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#1a1a1a', // Dark grey/black
            roughness: 0.9,
            metalness: 0.1,
            side: THREE.DoubleSide, // Ensure visibility even if scaled negatively
        });
    }, []);

    // 3. Wheel Rim Material (Silver/Chrome)
    const rimMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#e0e0e0', // Silver
            roughness: 0.2,
            metalness: 0.8,
            side: THREE.DoubleSide, // Ensure visibility
        });
    }, []);

    // 4. Brake Caliper Material (Red)
    const caliperMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#ff0000', // Racing Red
            roughness: 0.4,
            metalness: 0.6,
            side: THREE.DoubleSide,
        });
    }, []);

    // 5. Rotor Material (Steel)
    const rotorMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#888888', // Steel grey
            roughness: 0.5,
            metalness: 0.7,
            side: THREE.DoubleSide,
        });
    }, []);


    // ─── Glass Material (Animated) ───
    const glassMaterial = useMemo(() => {
        const config = TINT_CONFIGS[0];
        return new THREE.MeshPhysicalMaterial({
            transparent: true,
            transmission: config.transmission,
            opacity: config.opacity,
            roughness: config.roughness,
            color: new THREE.Color(config.color),
            thickness: 0.5,
            envMapIntensity: 2,
            clearcoat: 1,
            side: THREE.DoubleSide,
        });
    }, []);

    const glassMaterialRef = useRef(glassMaterial);

    // Animate glass when tintLevel changes
    useEffect(() => {
        const mat = glassMaterialRef.current;
        const config = TINT_CONFIGS[tintLevel] ?? TINT_CONFIGS[0];
        const targetColor = new THREE.Color(config.color);

        const animState = {
            r: mat.color.r,
            g: mat.color.g,
            b: mat.color.b,
            opacity: mat.opacity,
            roughness: mat.roughness,
            transmission: mat.transmission,
        };

        animate(animState, {
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
            opacity: config.opacity,
            roughness: config.roughness,
            transmission: config.transmission,
            ease: 'inOutQuad',
            duration: 800,
            onUpdate: () => {
                mat.color.setRGB(animState.r, animState.g, animState.b);
                mat.opacity = animState.opacity;
                mat.roughness = animState.roughness;
                mat.transmission = animState.transmission;
                mat.needsUpdate = true;
            },
        });
    }, [tintLevel]);

    return (
        <group {...props} dispose={null}>
            {/* ─── WHEEL GROUPS (Fixed Materials) ─── */}
            {/* Wheel FL */}
            <group position={[-0.927, 0.336, 1.43]} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1.129, 1.129]}>
                <mesh geometry={nodes.Object_4.geometry} material={caliperMaterial} />  {/* Caliper F L */}
                <mesh geometry={nodes.Object_5.geometry} material={caliperMaterial} />  {/* Caliper R L? */}
                <mesh geometry={nodes.Object_6.geometry} material={rotorMaterial} />    {/* Rotor */}
                <mesh geometry={nodes.Object_7.geometry} material={rubberMaterial} />   {/* Tyre */}
                <mesh geometry={nodes.Object_8.geometry} material={rimMaterial} />      {/* Wheel */}
            </group>
            {/* Wheel RL */}
            <group position={[-0.947, 0.327, -1.276]} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1.099, 1.099]}>
                <mesh geometry={nodes.Object_10.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_11.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_12.geometry} material={rotorMaterial} />
                <mesh geometry={nodes.Object_13.geometry} material={rubberMaterial} />
                <mesh geometry={nodes.Object_14.geometry} material={rimMaterial} />
            </group>
            {/* Wheel RR */}
            <group position={[0.947, 0.327, -1.276]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1.099, 1.099]}>
                <mesh geometry={nodes.Object_16.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_17.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_18.geometry} material={rotorMaterial} />
                <mesh geometry={nodes.Object_19.geometry} material={rubberMaterial} />
                <mesh geometry={nodes.Object_20.geometry} material={rimMaterial} />
            </group>
            {/* Wheel FR */}
            <group position={[0.927, 0.336, 1.43]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1.129, 1.129]}>
                <mesh geometry={nodes.Object_50.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_51.geometry} material={caliperMaterial} />
                <mesh geometry={nodes.Object_52.geometry} material={rotorMaterial} />
                <mesh geometry={nodes.Object_53.geometry} material={rubberMaterial} />
                <mesh geometry={nodes.Object_54.geometry} material={rimMaterial} />
            </group>

            {/* ─── BODY PAINT MESHES (Custom Color) ─── */}
            <mesh geometry={nodes.Object_24.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Mirror Right (housing) */}
            <mesh geometry={nodes.Object_40.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Chassis Ext */}
            <mesh geometry={nodes.Object_42.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Door Right */}
            <mesh geometry={nodes.Object_46.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Boot */}
            {/* Mirror Glass Left - Use original material for reflection */}
            <mesh geometry={nodes.Object_48.geometry} material={materials['LOD_A_MIRROR_GLASS_LEFT_mm_ext_Mat']} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_58.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Front Bumper */}
            <mesh geometry={nodes.Object_62.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Hood */}
            <mesh geometry={nodes.Object_90.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Rear Bumper */}
            {/* Mirror Glass Right - Use original material for reflection */}
            <mesh geometry={nodes.Object_98.geometry} material={materials['LOD_A_MIRROR_GLASS_RIGHT_mm_ext_Mat']} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_102.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Body */}
            <mesh geometry={nodes.Object_106.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Door Left */}
            <mesh geometry={nodes.Object_114.geometry} material={bodyMaterial} rotation={[Math.PI / 2, 0, 0]} /> {/* Mirror Left (housing) */}

            {/* ─── Non-Painted Meshes (Original Materials) ─── */}
            <mesh geometry={nodes.Object_22.geometry} material={materials.LOD_A_EXHAUST_mm_wheel_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_26.geometry} material={materials.LOD_A_CHASSIS_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_28.geometry} material={materials.LOD_A_INTERIOR_mm_cab_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_30.geometry} material={materials.LOD_A_CHASSIS_mm_chassis_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_32.geometry} material={materials.LOD_A_BOOT_mm_badges_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_34.geometry} material={materials.LOD_A_TAILLIGHT_LENS_LEFT_mm_windows_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_36.geometry} material={materials.LOD_A_FRONTBUMPER_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_38.geometry} material={materials.LOD_A_HOOD_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_44.geometry} material={materials.LOD_A_CHASSIS_mm_badges_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_56.geometry} material={materials.LOD_A_DOOR_RIGHT_mm_cab_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_60.geometry} material={materials.LOD_A_CHASSIS_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_64.geometry} material={materials.LOD_A_FRONTBUMPER_mm_chassis_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_68.geometry} material={materials.LOD_A_BODY_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_70.geometry} material={materials.LOD_A_FRONTBUMPER_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_72.geometry} material={materials.LOD_A_MIRROR_LEFT_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_74.geometry} material={materials.LOD_A_DOOR_LEFT_mm_cab_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_76.geometry} material={materials.LOD_A_BODY_mm_badges_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_78.geometry} material={materials.LOD_A_REARBUMPER_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_80.geometry} material={materials.LOD_A_BOOT_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_82.geometry} material={materials.LOD_A_STEERING_WHEEL_mm_cab_Mat} position={[0.375, 0.794, 0.206]} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_84.geometry} material={materials.LOD_A_MIRROR_LEFT_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_86.geometry} material={materials.LOD_A_HEADLIGHT_LENS_LEFT_mm_windows_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_88.geometry} material={materials.LOD_A_BRAKES_LEFT_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_90.geometry} material={materials.LOD_A_REARBUMPER_mm_ext_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_92.geometry} material={materials.LOD_A_MIRROR_RIGHT_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_94.geometry} material={materials.LOD_A_TAILLIGHT_LENS_RIGHT_mm_windows_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_96.geometry} material={materials.LOD_A_REARBUMPER_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_100.geometry} material={materials.LOD_A_HEADLIGHT_LENS_RIGHT_mm_windows_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_104.geometry} material={materials.LOD_A_BRAKES_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_108.geometry} material={materials.LOD_A_BODY_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_110.geometry} material={materials.LOD_A_DOOR_RIGHT_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_116.geometry} material={materials.LOD_A_BRAKES_RIGHT_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_118.geometry} material={materials.LOD_A_FRONTBUMPER_mm_badges_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_122.geometry} material={materials.LOD_A_DOOR_LEFT_mm_misc_Mat} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_124.geometry} material={materials.LOD_A_MIRROR_RIGHT_mm_lights_Mat} rotation={[Math.PI / 2, 0, 0]} />

            {/* ─── GLASS MESHES (Animated Tint) ─── */}
            <mesh geometry={nodes.Object_66.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_112.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_120.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_126.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_128.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_130.geometry} material={glassMaterial} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

useGLTF.preload('/mustang/scene.gltf');
