import { useEffect, useRef, useMemo, useState } from "react";
import React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { CameraControls } from "three-stdlib";
import { Vector3 } from "three";

const CameraGuide = (props) => {
  const { lastSelected, atticMode } = props;
  // const ref = useRef();
  console.log("last selected", lastSelected);
  const { camera } = useThree();

  useEffect(() => {
    // console.log("rendered attic mode changed");
  }, [atticMode]);

  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    // console.log("rendered set");
    setIsTransitioning(true);
  }, [atticMode]);

  let lastNum = 13;

  if (lastSelected[1] === "intake") {
    lastNum = lastSelected[0];
  }
  if (lastSelected[1] === "reset") {
    lastNum = lastSelected[0];
  }
  if (lastSelected[1] === "exhaust") {
    lastNum = lastSelected[0] + 18;
  }
  if (lastSelected[0] === 0) {
    if (lastSelected[1] === "intake") {
      lastNum = 13;
    }
    if (lastSelected[1] === "exhaust") {
      lastNum = 14;
    }
  }
  if (atticMode === true) {
    lastNum = 37;
    // wasAttic = true;
  } else {
    // wasAttic = "was";
  }
  //   debugger;

  // useFrame((state) => {
  //   // state.camera.fov = 50;
  //   // state.camera.near = 0.0001;
  //   state.camera.updateProjectionMatrix();
  // });

  console.log("lastNum", lastNum);
  const pram1 = 0.1;
  const pram2 = 1;
  // console.log("rendered");

  if (isTransitioning === true) {
    camera.position.x = matrices[lastNum].Vector3.x;
    camera.position.y = matrices[lastNum].Vector3.y;
    camera.position.z = matrices[lastNum].Vector3.z;
    camera.quaternion.x = matrices[lastNum].Quaternion.x;
    camera.quaternion.y = matrices[lastNum].Quaternion.y;
    camera.quaternion.z = matrices[lastNum].Quaternion.z;
    camera.quaternion.w = matrices[lastNum].Quaternion.w;
    camera.fov = matrices[lastNum].Fov;
    camera.updateProjectionMatrix();
    setIsTransitioning(false);
  }

  useFrame(({ clock, camera }) => {
    let x = THREE.MathUtils.damp(
      camera.position.x,
      matrices[lastNum].Vector3.x,
      pram1,
      pram2
    );
    let y = THREE.MathUtils.damp(
      camera.position.y,
      matrices[lastNum].Vector3.y,
      pram1,
      pram2
    );
    let z = THREE.MathUtils.damp(
      camera.position.z,
      matrices[lastNum].Vector3.z,
      pram1,
      pram2
    );

    let qx = THREE.MathUtils.damp(
      camera.quaternion.x,
      matrices[lastNum].Quaternion.x,
      pram1,
      pram2
    );
    let qy = THREE.MathUtils.damp(
      camera.quaternion.y,
      matrices[lastNum].Quaternion.y,
      pram1,
      pram2
    );
    let qz = THREE.MathUtils.damp(
      camera.quaternion.z,
      matrices[lastNum].Quaternion.z,
      pram1,
      pram2
    );
    let qw = THREE.MathUtils.damp(
      camera.quaternion.w,
      matrices[lastNum].Quaternion.w,
      pram1,
      pram2
    );
    let dynamicFov = THREE.MathUtils.damp(
      camera.fov,
      matrices[lastNum].Fov,
      pram1,
      pram2
    );
    if (isTransitioning !== true) {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
      camera.quaternion.x = qx;
      camera.quaternion.y = qy;
      camera.quaternion.z = qz;
      camera.quaternion.w = qw;
      camera.fov = dynamicFov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
};
const cam1 = {
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
};
const cam2side = {
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
  Fov: 45,
};
const cam3underEave = {
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
  Fov: 75,
};
const cam4aboveEave = {
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
  Fov: 75,
};
const cam5topRidge = {
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
  Fov: 75,
};
const cam6topBack = {
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
  Fov: 75,
};
const cam7 = {
  Vector3: {
    x: -3.023288458517792,
    y: 3.164946613431982,
    z: -0.8274275577280878,
  },
  Quaternion: {
    x: -0.0999182278616417,
    y: -0.8188757949600004,
    z: -0.1501583285577311,
    w: 0.5448956382045693,
  },
  Fov: 75,
};
const cam8 = {
  Vector3: {
    x: -4.79268157629895,
    y: 2.2098725598929694,
    z: 4.705432133131518,
  },
  Quaternion: {
    x: -0.12366182583476157,
    y: -0.33141276195337177,
    z: -0.043864216947459775,
    w: 0.934317539446433,
  },
  Fov: 45,
};
const cam9 = {
  Vector3: {
    x: -5.490067540934238,
    y: 2.284606117580961,
    z: -2.2779553552522507,
  },
  Quaternion: {
    x: -0.06518638180256404,
    y: -0.8455454404625233,
    z: -0.10616673080474427,
    w: 0.5191649728272898,
  },
  Fov: 45,
};
const cam10attic = {
  Vector3: {
    x: -1.6121285554887292,
    y: 2.169607159131349,
    z: -0.27214363084469395,
  },
  Quaternion: {
    x: -0.23495490994463872,
    y: -0.46324620466733457,
    z: -0.12884560126151598,
    w: 0.844747272969718,
  },
  Fov: 90,
};
const matrices = {
  0: cam1,
  1: cam3underEave,
  2: cam3underEave,
  3: cam3underEave,
  4: cam3underEave,
  5: cam4aboveEave,
  6: cam3underEave,
  7: cam3underEave,
  8: cam3underEave,
  9: cam3underEave,
  10: cam3underEave,
  11: cam4aboveEave,
  12: cam3underEave,
  13: cam3underEave,
  14: cam3underEave,
  15: cam4aboveEave,
  16: cam3underEave,
  17: cam3underEave,
  18: cam3underEave,
  19: cam6topBack,
  20: cam5topRidge,
  21: cam5topRidge,
  22: cam6topBack,
  23: cam6topBack,
  24: cam6topBack,
  25: cam6topBack,
  26: cam5topRidge,
  27: cam5topRidge,
  28: cam6topBack,
  29: cam6topBack,
  30: cam5topRidge,
  31: cam5topRidge,
  32: cam5topRidge,
  33: cam5topRidge,
  34: cam5topRidge,
  35: cam6topBack,
  36: cam6topBack,
  37: cam10attic,
  38: cam9,
  39: cam8,
};

export const MemoizedCameraGuide = React.memo(CameraGuide);
