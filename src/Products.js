import React, { useCallback, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxBufferGeometry } from "three";
import * as THREE from "three";
const Products = (props) => {
  const refIntake = useRef();
  const refExhaust = useRef();

  // console.log("houseRef", ref);
  const {
    currentIntakeNum,
    currentExhaustNum,
    onActiveIntake,
    onActiveExhaust,
  } = props;
  const houseOnly = useLoader(GLTFLoader, "/houseOnly3.gltf");
  const products = useLoader(GLTFLoader, "/products.gltf");

  const getUniqeNodesAndGroupsByKeyContaining = useCallback(
    (keyContainString, gltf) => {
      const checkIfGroup = (nodeOrGroup) =>
        nodeOrGroup.children &&
        Array.isArray(nodeOrGroup.children) &&
        nodeOrGroup.children.length > 0;
      const nodesAndGroupsEntries = Object.entries(gltf.nodes);
      return nodesAndGroupsEntries
        .filter(([key, nodeOrGroup]) => {
          if (!key.includes(keyContainString)) return false;

          if (checkIfGroup(nodeOrGroup)) return true;
          const isInAGroup = nodesAndGroupsEntries.some((entry) => {
            if (entry[0] === key) return false;
            const isEntryGroup = checkIfGroup(entry[1]);
            if (!isEntryGroup) return false;
            return entry[1].children.some(
              (child) => child.name === nodeOrGroup.name
            );
          });
          if (isInAGroup) return false;
          return true;
        })
        .map(([, value]) => value);
    },
    [products, houseOnly]
  );
  const exhausts = getUniqeNodesAndGroupsByKeyContaining("exhaust", products);
  exhausts.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const intakes = getUniqeNodesAndGroupsByKeyContaining("intake", products);
  intakes.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  //   const windows = getUniqeNodesAndGroupsByKeyContaining("Window", houseOnly);
  const sidingbump = useTexture("Bump.png");
  houseOnly.materials["Siding"].color = { b: 0.8, g: 0.4, r: 0.2 };
  houseOnly.materials["Roof"].color = { b: 0.01, g: 0.01, r: 0.01 };
  houseOnly.materials["Siding"].bumpMap = sidingbump;
  houseOnly.materials["Siding"].bumpScale = 0.02;

  const mat = houseOnly.materials["window"];
  mat.opacity = 0.36;
  return (
    <>
      <group scale={0.003} position={[1, -2, 0]}>
        <primitive object={houseOnly.scene} />
        <primitive
          ref={refExhaust}
          onBeforeRender={(e) => onActiveExhaust(refExhaust)}
          object={exhausts[currentExhaustNum]}
        />
        <primitive
          ref={refIntake}
          onBeforeRender={(e) => onActiveIntake(refIntake)}
          object={intakes[currentIntakeNum - 1]}
        />
      </group>
    </>
  );
};

export default Products;
