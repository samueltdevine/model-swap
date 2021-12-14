import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { CameraControls } from "three-stdlib";

const CameraGuide = (props) => {
  const { activeIntakeNum, activeExhaustNum, lastSelected } = props;
  // const ref = useRef();
  const { camera } = useThree();

  let lastNum = 0;

  if (lastSelected[1] === "intake") {
    lastNum = lastSelected[0];
  }
  if (lastSelected[1] === "exhaust") {
    lastNum = lastSelected[0] + 6;
  }
  //   debugger;
  console.log("last", lastNum);

  useFrame((state) => {
    state.camera.fov = 38;
    state.camera.updateProjectionMatrix();
  });

  const pram1 = 0.1;
  const pram2 = 1;
  useFrame(({ clock, camera }) => {
    const x = THREE.MathUtils.damp(
      camera.position.x,
      matrices[lastNum].Vector3.x,
      pram1,
      pram2
    );
    const y = THREE.MathUtils.damp(
      camera.position.y,
      matrices[lastNum].Vector3.y,
      pram1,
      pram2
    );
    const z = THREE.MathUtils.damp(
      camera.position.z,
      matrices[lastNum].Vector3.z,
      pram1,
      pram2
    );

    const qx = THREE.MathUtils.damp(
      camera.quaternion.x,
      matrices[lastNum].Quaternion.x,
      pram1,
      pram2
    );
    const qy = THREE.MathUtils.damp(
      camera.quaternion.y,
      matrices[lastNum].Quaternion.y,
      pram1,
      pram2
    );
    const qz = THREE.MathUtils.damp(
      camera.quaternion.z,
      matrices[lastNum].Quaternion.z,
      pram1,
      pram2
    );
    const qw = THREE.MathUtils.damp(
      camera.quaternion.w,
      matrices[lastNum].Quaternion.w,
      pram1,
      pram2
    );
    const dynamicFov = THREE.MathUtils.damp(
      camera.fov,
      matrices[lastNum].Fov,
      pram1,
      pram2
    );

    if (lastNum !== undefined) {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
      camera.quaternion.x = qx;
      camera.quaternion.y = qy;
      camera.quaternion.z = qz;
      camera.quaternion.w = qw;
      camera.fov = dynamicFov;
    }

    camera.updateProjectionMatrix();
  });

  //   useFrame(() => {
  //     if (activeIntakeNum === 1) {
  //       camera.position.set(
  //         matrices[1].Vector3.x,
  //         matrices[1].Vector3.y,
  //         matrices[1].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[1].Quaternion.x,
  //         matrices[1].Quaternion.y,
  //         matrices[1].Quaternion.z,
  //         matrices[1].Quaternion.w
  //       );
  //       // camera.quaternion = matrices[1].Quanterion;
  //     }
  //     if (activeIntakeNum === 2) {
  //       camera.fov = 75;
  //       camera.position.set(
  //         matrices[2].Vector3.x,
  //         matrices[2].Vector3.y,
  //         matrices[2].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[2].Quaternion.x,
  //         matrices[2].Quaternion.y,
  //         matrices[2].Quaternion.z,
  //         matrices[2].Quaternion.w
  //       );
  //     }
  //     if (activeIntakeNum === 3) {
  //       camera.fov = 75;

  //       camera.position.set(
  //         matrices[3].Vector3.x,
  //         matrices[3].Vector3.y,
  //         matrices[3].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[3].Quaternion.x,
  //         matrices[3].Quaternion.y,
  //         matrices[3].Quaternion.z,
  //         matrices[3].Quaternion.w
  //       );
  //     }
  //     if (activeIntakeNum === 4) {
  //       camera.fov = 75;

  //       camera.position.set(
  //         matrices[4].Vector3.x,
  //         matrices[4].Vector3.y,
  //         matrices[4].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[4].Quaternion.x,
  //         matrices[4].Quaternion.y,
  //         matrices[4].Quaternion.z,
  //         matrices[4].Quaternion.w
  //       );
  //     }
  //     if (activeIntakeNum === 5) {
  //       camera.fov = 75;

  //       camera.position.set(
  //         matrices[5].Vector3.x,
  //         matrices[5].Vector3.y,
  //         matrices[5].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[5].Quaternion.x,
  //         matrices[5].Quaternion.y,
  //         matrices[5].Quaternion.z,
  //         matrices[5].Quaternion.w
  //       );
  //     }
  //     if (activeIntakeNum === 6) {
  //       camera.fov = 75;
  //       camera.position.set(
  //         matrices[6].Vector3.x,
  //         matrices[6].Vector3.y,
  //         matrices[6].Vector3.z
  //       );
  //       camera.quaternion.set(
  //         matrices[6].Quaternion.x,
  //         matrices[6].Quaternion.y,
  //         matrices[6].Quaternion.z,
  //         matrices[6].Quaternion.w
  //       );
  //     }
  //     // debugger;

  //     // camera.updateMatrixWorld();
  //     camera.updateMatrix();
  //     camera.updateProjectionMatrix();
  //   });

  //   useFrame(() => {
  //   console.log("camera", camera);
  //   console.log("camera pos", camera.position);
  //   console.log("camera qua", camera.quaternion);
  //   console.log("camera qua", camera.fov);
  //   });
  return null;
  //   return <perspectiveCamera position={[-1, 1, -5]} {...props} />;
};

const matrices = {
  0: {
    Vector3: {
      x: -0.9845270770963455,
      y: 0.7799945399031827,
      z: 3.944647325591781,
    },
    Quaternion: {
      x: 0.03738517939203008,
      y: 0.007279189779345312,
      z: -0.0002723314247121629,
      w: 0.9992743805349845,
    },
    Fov: 55,
  },
  1: {
    Vector3: {
      x: -5.472475046084495,
      y: 2.6551389057519588,
      z: 1.803366706336503,
    },
    Quaternion: {
      x: -0.13593025779965517,
      y: -0.5319543318034656,
      z: -0.08698763634244487,
      w: 0.8312524917337706,
    },
    Fov: 40,
  },
  2: {
    Vector3: {
      x: -2.848949749845441,
      y: 1.5548227735025253,
      z: 1.879100944312328,
    },
    Quaternion: {
      x: 0.00965825004726916,
      y: -0.49844875771378605,
      z: 0.005553620842381282,
      w: 0.8668475710499204,
    },
    Fov: 80,
  },
  3: {
    Vector3: {
      x: -2.848949749845441,
      y: 1.5548227735025253,
      z: 1.879100944312328,
    },
    Quaternion: {
      x: 0.00965825004726916,
      y: -0.49844875771378605,
      z: 0.005553620842381282,
      w: 0.8668475710499204,
    },
    Fov: 80,
  },
  4: {
    Vector3: {
      x: -2.848949749845441,
      y: 1.5548227735025253,
      z: 1.879100944312328,
    },
    Quaternion: {
      x: 0.00965825004726916,
      y: -0.49844875771378605,
      z: 0.005553620842381282,
      w: 0.8668475710499204,
    },
    Fov: 80,
  },
  5: {
    Vector3: {
      x: -3.117819646859672,
      y: 1.9841275562106966,
      z: 2.1352293973481156,
    },
    Quaternion: {
      x: -0.061785912062837706,
      y: -0.4829645263534151,
      z: -0.03418975171773629,
      w: 0.8727879629281469,
    },
    Fov: 80,
  },
  6: {
    Vector3: {
      x: -2.848949749845441,
      y: 1.5548227735025253,
      z: 1.879100944312328,
    },
    Quaternion: {
      x: 0.00965825004726916,
      y: -0.49844875771378605,
      z: 0.005553620842381282,
      w: 0.8668475710499204,
    },
    Fov: 80,
  },
  7: {
    Vector3: {
      x: -3.8605714796519157,
      y: 3.37992777791149646,
      z: 0.27692242922508603,
    },
    Quaternion: {
      x: -0.18242180318304319,
      y: -0.6469799724200458,
      z: -0.16344501780507495,
      w: 0.7220975883947421,
    },
    Fov: 80,
  },
  8: {
    Vector3: {
      x: -3.8605714796519157,
      y: 3.37992777791149646,
      z: 0.27692242922508603,
    },
    Quaternion: {
      x: -0.18242180318304319,
      y: -0.6469799724200458,
      z: -0.16344501780507495,
      w: 0.7220975883947421,
    },
    Fov: 80,
  },
  9: {
    Vector3: {
      x: -3.0869739864650266,
      y: 3.07564238529690632,
      z: -0.3085620661380885,
    },
    Quaternion: {
      x: -0.15318481904317696,
      y: -0.7382987189142686,
      z: -0.178949017032828,
      w: 0.6320021061414618,
    },
    Fov: 80,
  },
  10: {
    Vector3: {
      x: -2.1285400744836975,
      y: 2.887711178232551,
      z: -1.7485887724318543,
    },
    Quaternion: {
      x: 0.07459455852788245,
      y: 0.9185291139900057,
      z: 0.20968810182146747,
      w: -0.32675804281650866,
    },
    Fov: 80,
  },
  11: {
    Vector3: {
      x: -2.1285400744836975,
      y: 2.887711178232551,
      z: -1.7485887724318543,
    },
    Quaternion: {
      x: 0.07459455852788245,
      y: 0.9185291139900057,
      z: 0.20968810182146747,
      w: -0.32675804281650866,
    },
    Fov: 80,
  },
  12: {
    Vector3: {
      x: -5.472475046084495,
      y: 2.6551389057519588,
      z: 1.803366706336503,
    },
    Quaternion: {
      x: -0.13593025779965517,
      y: -0.5319543318034656,
      z: -0.08698763634244487,
      w: 0.8312524917337706,
    },
    Fov: 40,
  },
};

export default CameraGuide;
