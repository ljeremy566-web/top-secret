import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei';
import { MustangModel } from './MustangModel';

interface CarWindowProps {
    tintLevel: number; // 0 = clear, 1 = light, 2 = medium, 3 = dark, 4 = limo
}

const CarWindow = ({ tintLevel }: CarWindowProps) => {
    return (
        // Increased size: w/h 320->500px (mobile) and 420->600px (desktop) approximately, or simpler larger breakpoints
        <div className="w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-900 to-black shadow-[0_0_40px_rgba(255,159,28,0.08)]">
            {/* Tuned camera FOV and Position for max impact without cutting off */}
            <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 1.5, 5], fov: 30 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        {/* Scaled model slightly up, and applied new premium body color (Gunmetal Grey) */}
                        <MustangModel tintLevel={tintLevel} scale={1.2} />
                    </Stage>
                    <ContactShadows
                        position={[0, -0.01, 0]}
                        opacity={0.6}
                        scale={15}
                        blur={2}
                        far={4}
                        color="black"
                    />
                </Suspense>
                <OrbitControls
                    makeDefault
                    enableDamping={true}
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.1}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default CarWindow;
