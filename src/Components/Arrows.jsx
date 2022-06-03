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

  console.log("activeExhaustNum", activeExhaustNum);
  console.log("activeIntakeNum", activeIntakeNum);

  const fbx = useLoader(FBXLoader, "/splines17.fbx");
  const splineArray = fbx.children;

  const getByString = (str, array) => {
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

  const intake1s = getByString("intake1", splineArray);
  const intake1curveSide = useMemo(() => {
    const curves = bufferGeomstoCurves(intake1s);
    return curves;
  }, [fbx]);
  const intake2s = getByString("intake2", splineArray);
  const intake2curveUnderEave = useMemo(() => {
    const curves = bufferGeomstoCurves(intake2s);
    return curves;
  }, [fbx]);
  const intake3s = getByString("intake3", splineArray);
  const intake3curveRoof = useMemo(() => {
    const curves = bufferGeomstoCurves(intake3s);
    return curves;
  }, [fbx]);
  const intake4s = getByString("intake4", splineArray);
  const intake4curveRoof = useMemo(() => {
    const curves = bufferGeomstoCurves(intake4s);
    return curves;
  }, [fbx]);
  const intake6s = getByString("intake6", splineArray);
  const intake6louver = useMemo(() => {
    const curves = bufferGeomstoCurves(intake6s);
    return curves;
  }, [fbx]);

  const exhaust1s = getByString("exhaust1", splineArray);
  const exhaustRidge = useMemo(() => {
    const curves = bufferGeomstoCurves(exhaust1s);
    return curves;
  }, [fbx]);

  const exhaust3s = getByString("exhaust1", splineArray);
  const exhaustBack = useMemo(() => {
    const curves = bufferGeomstoCurves(exhaust1s);
    return curves;
  }, [fbx]);

  const exhaust4s = getByString("exhaust4", splineArray);
  const exhaust4curves = useMemo(() => {
    const curves = bufferGeomstoCurves(exhaust4s);
    return curves;
  }, [fbx]);

  const exhaust5s = getByString("exhaust5", splineArray);
  const exhaustTurbines = useMemo(() => {
    const curves = bufferGeomstoCurves(exhaust5s);
    return curves;
  }, [fbx]);

  const exhaust6s = getByString("exhaust6", splineArray);
  const exhaust6line = useMemo(() => {
    const curves = bufferGeomstoCurves(exhaust6s);
    return curves;
  }, [fbx]);

  return (
    <>
      {activeIntakeNum === 1 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 2 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 3 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 4 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 5 &&
        intake4curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 6 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 7 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 8 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 9 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 10 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 11 &&
        intake4curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 12 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 1 + 12 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 2 + 12 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 3 + 12 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 4 + 12 &&
        intake4curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 5 + 12 &&
        intake3curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 6 + 12 &&
        intake6louver.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 7 + 12 &&
        intake6louver.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {/* {activeIntakeNum === 7 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 8 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 9 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 10 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 11 &&
        intake3curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 12 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 13 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 14 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 15 &&
        intake3curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 16 &&
        intake3curveRoof.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 17 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))}
      {activeIntakeNum === 18 &&
        intake2curveUnderEave.map((curve) => (
          <Arrow lineDisplay color="blue" curve={curve} />
        ))} */}

      {activeExhaustNum <= 13 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 1 + 12 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 2 + 12 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 3 + 12 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 4 + 12 &&
        exhaust4curves.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 5 + 12 &&
        exhaustTurbines.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 6 + 12 &&
        exhaust6line.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {/* {activeExhaustNum === 7 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 8 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 9 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 10 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 11 &&
        exhaustTurbines.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 12 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 13 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 14 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 15 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 16 &&
        exhaustRidge.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 17 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))}
      {activeExhaustNum === 18 &&
        exhaustBack.map((curve) => (
          <Arrow lineDisplay color="red" curve={curve} />
        ))} */}
    </>
  );
};

export default Arrows;
