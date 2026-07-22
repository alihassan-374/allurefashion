"use client";

import { useFBX, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function FBXModel({ url }) {
  const group = useRef();

  const model = useFBX(url);

  const { actions } = useAnimations(model.animations, group);

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={model}
      scale={0.015}
      position={[0, -2, 0]}
    />
  );
}