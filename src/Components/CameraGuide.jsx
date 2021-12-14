import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

const CameraGuide = (props) => {
  const ref = useRef();
  const set = useThree((state) => state.set);
  // Make the camera known to the system
  useEffect(() => void set({ camera: ref.current }), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  //   useFrame(() => {
  console.log("camera pos", ref.position);
  console.log("camera qua", ref.quaternion);
  //   });
  //   return <></>;
  return <perspectiveCamera ref={ref} position={[-1, 1, 6]} {...props} />;
};

export default CameraGuide;
