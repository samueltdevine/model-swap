import MoveAlongCurve from "./MoveAlongCurve";
import { useMemo } from "react";
import * as THREE from "three";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";

const Arrow = (props) => {
  const { lineDisplay } = props;
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
  const ammount = 4;
  const length = curve.getLength();

  const height = 0.4;
  //cylinder point
  const { flow } = useMemo(() => {
    const testCyl = new THREE.CylinderBufferGeometry(1, 1, 1, 12);
    const mat = new THREE.MeshBasicMaterial({ color: "red" });
    const testCylMesh = new THREE.Mesh(testCyl, mat);
    const geometry = new THREE.ConeBufferGeometry(0.1, height, 4);
    geometry.rotateZ(THREE.MathUtils.degToRad(-90));
    const material = new THREE.MeshPhongMaterial({
      color: 0x99ffff,
      wireframe: false,
    });
    const objectToCurve = new THREE.Mesh(geometry, material);

    const flow = new Flow(objectToCurve);
    flow.updateCurve(0, curve);
    //   scene.add(flow.object3D);
    flow.uniforms.spineOffset.value = flow.uniforms.spineLength.value - height;

    // console.log("rerun");
    // console.log(flow);
    return { flow };
  }, []);

  //   debugger;
  return (
    <>
      {lineDisplay && <primitive object={line} />}
      <primitive object={flow.object3D} />
      <group>
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 2}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 4}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 6}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 8}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 10}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 12}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 14}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 16}
        />
      </group>
    </>
  );
};
export default Arrow;
