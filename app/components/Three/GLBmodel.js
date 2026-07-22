
"use client";

import { useGLTF } from "@react-three/drei";

export default function GLBModel({ url }) {
  const { scene } = useGLTF(url);

  return <primitive 
  object={scene}
  scale={3.5}
   />;
}