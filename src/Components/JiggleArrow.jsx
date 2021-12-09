import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";
import { MeshBasicMaterial } from "three";
import * as THREE from "three";
const JiggleArrow = (props) => {
  const { position, rotation, color, obj } = props;
  const arrow = useLoader(GLTFLoader, "/arrow3.gltf");
  // debugger;
  let animatedPram = 0;
  // const animatedPram = 0;
  useFrame((state) => {
    // animatedPram =
    arrow.nodes["Plane"].geometry.translate(
      0,
      0,

      Math.sin(2 * state.clock.getElapsedTime()) * 0.3
    );
  });
  const blueMat = new MeshBasicMaterial({ color: "blue" });
  const redMat = new MeshBasicMaterial({ color: "red" });
  blueMat.side = THREE.DoubleSide;
  redMat.side = THREE.DoubleSide;
  return (
    <group position={position} rotation={rotation}>
      <mesh
        // position={(0, 0, animatedPram)}
        geometry={arrow.nodes["Plane"].geometry}
        material={color === "red" ? redMat : blueMat}
      />
    </group>
  );
};

export default JiggleArrow;
