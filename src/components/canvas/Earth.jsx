import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF(`${import.meta.env.BASE_URL}planet/scene.gltf`);

  return (
    <primitive object={earth.scene} scale={3.1} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          rotation={[0,0,0]}
          autoRotate
          autoRotateSpeed = {30}
          rotateSpeed={2}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* <Earth rotation={[0, Math.PI, 0]} /> Flip the model around the Y-axis */}

        <Earth/>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
