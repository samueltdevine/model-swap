import MoveAlongCurve from "./MoveAlongCurve";
import { useMemo } from "react";
import * as THREE from "three";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";

const Arrow = (props) => {
  const { lineDisplay, curve, color } = props;
  //   const color = "red";

  const somePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 1, 0),
    //   new THREE.Vector3(-1, 0.2, -1),
  ];
  //   console.log("somepoints", somePoints);
  //   const curve2 = new THREE.CatmullRomCurve3(somePoints);
  curve.closed = false;
  //   debugger;
  const points = curve.getPoints(60);
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  const ammount = 4;
  const length = curve.getLength();

  const height = 0.08;
  //cylinder point
  const { flow } = useMemo(() => {
    const testCyl = new THREE.CylinderBufferGeometry(1, 1, 1, 12);
    const mat = new THREE.MeshBasicMaterial({ color: color });
    const testCylMesh = new THREE.Mesh(testCyl, mat);
    const geometry = new THREE.ConeBufferGeometry(0.05, height - 0.01, 4);
    geometry.rotateZ(THREE.MathUtils.degToRad(-90));
    const material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false,
    });
    const objectToCurve = new THREE.Mesh(geometry, material);

    const flow = new Flow(objectToCurve);
    flow.updateCurve(0, curve);
    //   scene.add(flow.object3D);
    flow.uniforms.spineOffset.value =
      flow.uniforms.spineLength.value - height / 2;

    // console.log("rerun");
    // console.log(flow);
    return { flow };
  }, []);
  return (
    <>
      <group>
        {/* {lineDisplay && <primitive object={line} />} */}
        <primitive object={flow.object3D} />
        <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 0.02 * 2}
          color={color}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 4}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 6}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 8}
        />

        {/* <MoveAlongCurve
          height={height}
          curve={curve}
          offsetAmmt={(1 / length) * 0.02 * 2 - length / 2}
          color={color}
        /> */}
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 4 - length / 2}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 6 - length / 2}
        />
        <MoveAlongCurve
          height={height}
          curve={curve}
          color={color}
          offsetAmmt={(1 / length) * 0.02 * 8 - length / 2}
        />
      </group>
    </>
  );
};
export default Arrow;
