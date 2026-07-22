"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";

import Loader from "./Loader";
import Lights from "./Lights";
import GLBModel from "./GLBmodel";
import FBXModel from "./FBXModel";

export default function Viewer({
  url,
  type = "glb",
}) {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <Lights />

<Environment files="/hdri/potsdamer_platz_4k.exr" />
{/* <Environment preset="studio" /> */}
        {type === "glb" ? (
          <GLBModel url={url} />
        ) : (
          <FBXModel url={url} />
        )}

        <ContactShadows />

        <OrbitControls
          autoRotate={false}
          enablePan={false}
          enableZoom={false}
        />
      </Suspense>
    </Canvas>
  );
}