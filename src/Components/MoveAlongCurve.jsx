import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { Color } from "three";
import { Geometry } from "three-stdlib";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";

const MoveAlongCurve = () => {
  //   console.log("I'm a re-render!!!");
  const { line, flow } = useMemo(() => {
    const testCyl = new THREE.CylinderBufferGeometry(1, 1, 1, 12);
    const mat = new THREE.MeshBasicMaterial({ color: "red" });
    const testCylMesh = new THREE.Mesh(testCyl, mat);
    const somePoints = [
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(1, 0.6, 1),
      new THREE.Vector3(-1, 0, 1),
      //   new THREE.Vector3(-1, 0.2, -1),
    ];

    const curve = new THREE.CatmullRomCurve3(somePoints);
    curve.closed = false;

    const points = curve.getPoints(60);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );

    const geometry = new THREE.BoxGeometry(0.2, 0.08, 0.05);
    const material = new THREE.MeshPhongMaterial({
      color: 0x99ffff,
      wireframe: false,
    });
    const objectToCurve = new THREE.Mesh(geometry, material);

    const flow = new Flow(objectToCurve);
    flow.updateCurve(0, curve);
    //   scene.add(flow.object3D);
    flow.uniforms.spineOffset.value = 0.2;
    console.log("rerun");
    console.log(flow);
    return { line, flow };
  }, []);

  //   const length = flow.uniforms.spineLength;
  const maxCap = flow.uniforms.spineLength.value - 0.2;
  // Clamp number between two values with the following line:
  useFrame(() => {
    // flow.moveAlongCurve(0.01);
    // const offset = ;
    if (flow.uniforms.spineOffset.value < maxCap) {
      flow.uniforms.spineOffset.value = flow.uniforms.spineOffset.value + 0.01;
    }

    if (flow.uniforms.spineOffset.value > maxCap - 0.01) {
      flow.uniforms.spineOffset.value = 0.2;
    }
    console.log(flow.uniforms.spineOffset.value);
    // flow.uniforms.pathOffset.value = offset 0;
    // console.log(flow.uniforms.spineOffset.value);
  });

  return (
    <>
      <primitive object={line} />
      <primitive object={flow.object3D} />
      {/* <mesh position={[0, 0, 0]} geometry={testCyl} material={mat}> */}
      {/* <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 32]} /> */}
      {/* <meshNormalMaterial attach="material" /> */}
      {/* </mesh> */}
    </>
  );
};
export default MoveAlongCurve;
