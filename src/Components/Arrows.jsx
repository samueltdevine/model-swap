import * as THREE from "three";
import Arrow from "./Arrow";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import getUniqeNodesByKey from "../getUniqueNodesByKey";

const Arrows = (props) => {
  const { activeExhaustNum, activeIntakeNum } = props;
  const degToRad = (deg) => {
    const rad = THREE.MathUtils.degToRad(deg);
    return rad;
  };

  const fbx = useLoader(FBXLoader, "/splines3.fbx");
  const splineArray = fbx.children;

  const getByString = (str, array, color) => {
    const filteredArray = array.filter((child) => child.name.includes(str));
    // filteredArray.map((child) => {
    //   return <Arrow lineDisplay color={color} curve={child.geometry} />;
    // });
    return filteredArray;
  };

  const bufferGeomstoCurves = (arr) => {
    const curves = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      const geo = element.geometry;
      //   const { curve } = useMemo(() => {
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
          p.x = p.x * 0.003;
          p.y = p.y * 0.003;
          p.z = p.z * 0.003;
          points.push(p);
        }
      }

      const curve = new THREE.CatmullRomCurve3(points);
      curves.push(curve);
    }
    return curves;
  };

  const intake1s = getByString("intake1", splineArray, "blue");
  const intake1curves = useMemo(() => {
    const curves = bufferGeomstoCurves(intake1s);
    return curves;
  }, [fbx]);
  const intake2s = getByString("intake2", splineArray, "blue");
  const intake2curves = useMemo(() => {
    const curves = bufferGeomstoCurves(intake2s);
    return curves;
  }, [fbx]);
  const intake5s = getByString("intake4", splineArray, "blue");
  const intake5curves = useMemo(() => {
    const curves = bufferGeomstoCurves(intake5s);
    return curves;
  }, [fbx]);
  return (
    <>
      {activeIntakeNum === 1 &&
        intake1curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 2 &&
        intake2curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 3 &&
        intake2curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 4 &&
        intake2curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 6 &&
        intake2curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 5 &&
        intake5curves.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
    </>
  );
};

export default Arrows;
