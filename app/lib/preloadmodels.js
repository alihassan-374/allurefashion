import { useFBX, useGLTF } from "@react-three/drei";

export function preloadModels() {
  useFBX.preload("/models/Standing Idle.fbx");
  useFBX.preload("/models/Standing Greeting.fbx");

  useGLTF.preload("/models/beauty.glb");
  useGLTF.preload("/models/dress.glb");
  useGLTF.preload("/models/accesirues.glb");
}