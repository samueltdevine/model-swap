import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { Color } from "three";
import { Geometry } from "three-stdlib";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";
import { mapLinear } from "three/src/math/MathUtils";

const MoveAlongCurve = (props) => {
  const { curve, offsetAmmt, height, material, color } = props;
  const capHeight = height;
  const mat = material;
  const lineHeight = 0.04;
  //   console.log("I'm a re-render!!!");
  const { flow } = useMemo(() => {
    const geometry = new THREE.BoxGeometry(
      lineHeight,
      0.02,
      0.0125,
      10,
      10,
      10
    );
    const material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false,
    });
    const objectToCurve = new THREE.Mesh(geometry, material);

    const flow = new Flow(objectToCurve);
    flow.updateCurve(0, curve);
    //   scene.add(flow.object3D);
    flow.uniforms.spineOffset.value = 0.2 + offsetAmmt;
    // console.log("rerun");
    // console.log(flow);
    return { flow };
  }, []);

  const capHeightHalf = capHeight / 2;
  //   const length = flow.uniforms.spineLength;
  const maxCap = flow.uniforms.spineLength.value - capHeightHalf;
  // Clamp number between two values with the following line:
  useFrame(() => {
    // flow.moveAlongCurve(0.01);
    // const offset = ;

    if (flow.uniforms.spineOffset.value < maxCap) {
      flow.uniforms.spineOffset.value = flow.uniforms.spineOffset.value + 0.005;
    }

    if (flow.uniforms.spineOffset.value > maxCap - 0.01) {
      flow.uniforms.spineOffset.value = 0 + lineHeight;
    }
    // console.log(flow.uniforms.spineOffset.value);
    // flow.uniforms.pathOffset.value = offset 0;
    // console.log(flow.uniforms.spineOffset.value);
  });

  return (
    <>
      <primitive object={flow.object3D} />
      {/* {flows.map((flow)=><primitive object={flow.object3d}/>)} */}
      {/* <mesh position={[0, 0, 0]} geometry={testCyl} material={mat}> */}
      {/* <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 32]} /> */}
      {/* <meshNormalMaterial attach="material" /> */}
      {/* </mesh> */}
    </>
  );
};
export default MoveAlongCurve;
