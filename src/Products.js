import React, { useCallback, useRef } from "react";
import { useGLTF, useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  const houseOnly = useLoader(GLTFLoader, "/houseOnly.gltf");
  const products = useLoader(GLTFLoader, "/products2.gltf");

  const getUniqeNodesAndGroupsByKeyContaining = useCallback(
    (keyContainString) => {
      const checkIfGroup = (nodeOrGroup) =>
        nodeOrGroup.children &&
        Array.isArray(nodeOrGroup.children) &&
        nodeOrGroup.children.length > 0;
      const nodesAndGroupsEntries = Object.entries(products.nodes);
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
    [products]
  );
  const exhausts = getUniqeNodesAndGroupsByKeyContaining("exhaust");
  exhausts.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const intakes = getUniqeNodesAndGroupsByKeyContaining("intake");
  intakes.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <group scale={0.003} position={[1, -2, 0]}>
        <primitive object={houseOnly.scene} />
        <primitive object={products.nodes["attic_cutout"]} />
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
        {/* <primitive
        position={[1, -2, 0]}
        scale={0.003}
        object={gltf.nodes["2_Aluminum_UnderEave_Vent_2"]}
    /> */}
      </group>
    </>
  );
};

export default Products;
