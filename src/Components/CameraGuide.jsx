import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "react-spring";
import * as THREE from "three";
import { CameraControls } from "three-stdlib";
const CameraGuide = (props) => {
  const { activeIntakeNum, activeExhaustNum } = props;
  // const ref = useRef();
  const { camera } = useThree();

  useFrame((state) => {
    state.camera.fov = 38;
    state.camera.updateProjectionMatrix();
  });

  useFrame(() => {
    if (activeIntakeNum === 1) {
      camera.position.set(
        matrices[1].Vector3.x,
        matrices[1].Vector3.y,
        matrices[1].Vector3.z
      );
      camera.quaternion.set(
        matrices[1].Quaternion.x,
        matrices[1].Quaternion.y,
        matrices[1].Quaternion.z,
        matrices[1].Quaternion.w
      );
      // camera.quaternion = matrices[1].Quanterion;
    }
    if (activeIntakeNum === 2) {
      camera.fov = 75;
      camera.position.set(
        matrices[2].Vector3.x,
        matrices[2].Vector3.y,
        matrices[2].Vector3.z
      );
      camera.quaternion.set(
        matrices[2].Quaternion.x,
        matrices[2].Quaternion.y,
        matrices[2].Quaternion.z,
        matrices[2].Quaternion.w
      );
    }
    if (activeIntakeNum === 3) {
      camera.fov = 75;

      camera.position.set(
        matrices[3].Vector3.x,
        matrices[3].Vector3.y,
        matrices[3].Vector3.z
      );
      camera.quaternion.set(
        matrices[3].Quaternion.x,
        matrices[3].Quaternion.y,
        matrices[3].Quaternion.z,
        matrices[3].Quaternion.w
      );
    }
    if (activeIntakeNum === 4) {
      camera.fov = 75;

      camera.position.set(
        matrices[4].Vector3.x,
        matrices[4].Vector3.y,
        matrices[4].Vector3.z
      );
      camera.quaternion.set(
        matrices[4].Quaternion.x,
        matrices[4].Quaternion.y,
        matrices[4].Quaternion.z,
        matrices[4].Quaternion.w
      );
    }
    if (activeIntakeNum === 5) {
      camera.fov = 75;

      camera.position.set(
        matrices[5].Vector3.x,
        matrices[5].Vector3.y,
        matrices[5].Vector3.z
      );
      camera.quaternion.set(
        matrices[5].Quaternion.x,
        matrices[5].Quaternion.y,
        matrices[5].Quaternion.z,
        matrices[5].Quaternion.w
      );
    }
    if (activeIntakeNum === 6) {
      camera.fov = 75;
      camera.position.set(
        matrices[6].Vector3.x,
        matrices[6].Vector3.y,
        matrices[6].Vector3.z
      );
      camera.quaternion.set(
        matrices[6].Quaternion.x,
        matrices[6].Quaternion.y,
        matrices[6].Quaternion.z,
        matrices[6].Quaternion.w
      );
    }
    // debugger;
    camera.updateMatrixWorld();
    camera.updateMatrix();
    camera.updateProjectionMatrix();
  });

  //   useFrame(() => {
  console.log("camera", camera);
  console.log("camera pos", camera.position);
  console.log("camera qua", camera.quaternion);
  //   });
  // return <></>;
  return <perspectiveCamera position={[-1, 1, -5]} {...props} />;
};

const matrices = {
  1: {
    Vector3: {
      x: -5.472475046084495,
      y: 2.6551389057519588,
      z: 2.063366706336503,
    },
    Quaternion: {
      x: -0.13593025779965517,
      y: -0.5319543318034656,
      z: -0.08698763634244487,
      w: 0.8312524917337706,
    },
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
  },
};

export default CameraGuide;