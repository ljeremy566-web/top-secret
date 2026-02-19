import { Suspense, useState, useEffect, lazy } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { MustangModel } from './MustangModel';
import garageImage from '../../images/Garaje.png';

const LazyStage = lazy(() =>
    import('@react-three/drei').then((mod) => ({ default: mod.Stage }))
);
const LazyOrbitControls = lazy(() =>
    import('@react-three/drei').then((mod) => ({ default: mod.OrbitControls }))
);
const LazyContactShadows = lazy(() =>
    import('@react-three/drei').then((mod) => ({ default: mod.ContactShadows }))
);

interface CarWindowProps {
    tintLevel: number; // 0 = clear, 1 = light, 2 = medium, 3 = dark, 4 = limo
}

const ContextLostHandler = ({ onContextLost }: { onContextLost: () => void }) => {
    const { gl } = useThree();

    useEffect(() => {
        const handleLost = () => onContextLost();
        const handleRestored = () => onContextLost();

        gl.domElement.addEventListener('webglcontextlost', handleLost);
        gl.domElement.addEventListener('webglcontextrestored', handleRestored);

        return () => {
            gl.domElement.removeEventListener('webglcontextlost', handleLost);
            gl.domElement.removeEventListener('webglcontextrestored', handleRestored);
        };
    }, [gl, onContextLost]);

    return null;
};

const CarWindow = ({ tintLevel }: CarWindowProps) => {
    const [canvasKey, setCanvasKey] = useState(0);
    return (
        <div
            className="w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
            style={{
                backgroundImage: `url(${garageImage})`,
                backgroundSize: '260%',
                backgroundPosition: '50% 75%',
            }}
        >
            <Canvas
                key={canvasKey}
                shadows
                dpr={[1, 2]}
                camera={{ position: [4, 1.5, 5], fov: 30 }}
            >
                <ContextLostHandler onContextLost={() => setCanvasKey((k) => k + 1)} />
                <Suspense fallback={null}>
                    <LazyStage environment="city" intensity={0.6}>
                        <MustangModel tintLevel={tintLevel} scale={1.2} />
                    </LazyStage>
                </Suspense>
                <Suspense fallback={null}>
                    <LazyContactShadows
                        position={[0, -0.01, 0]}
                        opacity={0.6}
                        scale={15}
                        blur={2}
                        far={4}
                        color="black"
                    />
                </Suspense>
                <Suspense fallback={null}>
                    <LazyOrbitControls
                        makeDefault
                        enableDamping={true}
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CarWindow;
