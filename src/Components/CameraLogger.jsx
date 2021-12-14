import { useThree } from "@react-three/fiber";
const CameraLogger = () => {
  const { camera } = useThree();

  console.log("pos", camera.position);
  console.log("qua", camera.quaternion);
  return null;
};

export default CameraLogger;
