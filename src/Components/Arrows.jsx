import * as THREE from "three";
import Arrow from "./Arrow";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

const Arrows = (props) => {
  const { activeExhaustNum, activeIntakeNum } = props;
  const degToRad = (deg) => {
    const rad = THREE.MathUtils.degToRad(deg);
    return rad;
  };

  const fbx = useLoader(FBXLoader, "/spline.fbx");
  const geo = fbx.children[0].geometry;
  const { curve } = useMemo(() => {
    const points = [];
    if (geo instanceof THREE.BufferGeometry) {
      let positions: Float32Array = geo.attributes["position"].array;
      let ptCout = positions.length / 3;
      for (let i = 0; i < ptCout; i++) {
        let p = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        p.x = p.x * 0.006;
        p.y = p.y * 0.006;
        p.z = p.z * 0.006;
        points.push(p);
      }
    }
    console.log("fbx points", points);
    const curve = new THREE.CatmullRomCurve3(points);
    return { curve };
  }, [geo]);

  return (
    <>
      <group>
        <Arrow lineDisplay color="blue" curve={curve} />
      </group>
    </>
  );
};

export default Arrows;
