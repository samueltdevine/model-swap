import React, { useCallback, useRef, Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BoxBufferGeometry, Object3D } from "three";
import * as THREE from "three";
import JiggleArrow from "./Components/JiggleArrow";
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

  const houseOnly = useLoader(GLTFLoader, "/houseOnly5.gltf");
  const products = useLoader(GLTFLoader, "/products4.gltf");
  const arrow = useLoader(GLTFLoader, "/arrow.gltf");

  const degToRad = (deg) => {
    const rad = THREE.MathUtils.degToRad(deg);
    return rad;
  };

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

  const getUniqeNodesByKey = useCallback((keyContainString, gltf) => {
    const checkIfGroup = (nodeOrGroup) =>
      nodeOrGroup.children &&
      Array.isArray(nodeOrGroup.children) &&
      nodeOrGroup.children.length > 0;
    const nodesAndGroupsEntries = Object.entries(gltf.nodes);
    return nodesAndGroupsEntries
      .filter(([key, nodeOrGroup]) => {
        if (!key.includes(keyContainString)) return true;

        if (checkIfGroup(nodeOrGroup)) return false;
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
  }, []);

  const getMeshesOnly = (arr) => {
    const meshesOnly = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.type === "Mesh") {
        element.castShadow = true;
        element.receiveShadow = true;
        meshesOnly.push(element);
      }
    }
    return meshesOnly;
  };

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
  const houseOnlyMeshes = getUniqeNodesByKey("Mesh", houseOnly);
  const meshesOnly = getMeshesOnly(houseOnlyMeshes);
  const sidingNormal = useLoader(TextureLoader, "NormalMap1.png");
  //   const sidingbump = useTexture("outer_wallsBump.png");
  const sidingNormalAttic = useTexture("NormalMap1.png");
  houseOnly.materials["Siding"].color = { b: 0.8, g: 0.8, r: 0.8 };
  houseOnly.materials["Siding_attic"].color = { b: 0.8, g: 0.8, r: 0.8 };
  houseOnly.materials["Roof"].color = { b: 0.2, g: 0.2, r: 0.2 };

  const sidingMat = new THREE.MeshPhysicalMaterial({
    // color: 0xe6e6e6,
    // bumpMap: sidingbump,
  });

  //   houseOnly.materials["Siding"] = sidingMat;
  houseOnly.materials["Siding"].normalMap = sidingNormal;
  houseOnly.materials["Siding_attic"].normalMap = sidingNormalAttic;
  //   debugger;

  const mat = houseOnly.materials["window"];
  mat.opacity = 0.36;
  //   houseOnly.nodes["outer_walls"].castShadow = true;
  //   houseOnly.nodes["outer_walls"].material = mat;
  houseOnly.nodes["outer_walls"].material.normalMap = sidingNormal;
  houseOnly.nodes["attic_cutout"].material.normalMap = sidingNormalAttic;
  houseOnly.nodes["outer_walls"].receiveShadow = true;
  //   houseOnly.nodes["outer_walls"].visible = false;
  houseOnly.nodes["attic_cutout"].castShadow = true;
  houseOnly.nodes["Trim"].castShadow = true;
  houseOnly.nodes["Concrete"].castShadow = true;
  houseOnly.nodes["Foof_main"].receiveShadow = false;
  houseOnly.nodes["Foof_main"].castShadow = false;
  houseOnly.nodes["Windows-House_Main"].castShadow = true;
  houseOnly.nodes["Windows-window"].castShadow = true;
  houseOnly.nodes["Windows-window_1"].castShadow = true;
  houseOnly.nodes["Windows"].castShadow = true;
  houseOnly.nodes["Ground"].receiveShadow = true;
  houseOnly.nodes["Ground"].castShadow = false;
  //   debugger;
  return (
    <>
      <Suspense>
        <directionalLight
          castShadow={true}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          position={[3, 2, 3]}
        />
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
          {currentExhaustNum <= 2 && (
            <group>
              <JiggleArrow
                obj={arrow}
                color={"red"}
                position={[-640, 900, -75]}
                rotation={[degToRad(0), degToRad(180), degToRad(90)]}
              />
              <JiggleArrow
                obj={arrow}
                color={"red"}
                position={[0, 900, -75]}
                rotation={[degToRad(0), degToRad(180), degToRad(90)]}
              />
              <JiggleArrow
                obj={arrow}
                color={"red"}
                position={[-640, 900, 150]}
                rotation={[degToRad(0), degToRad(0), degToRad(90)]}
              />
              <JiggleArrow
                obj={arrow}
                color={"red"}
                position={[0, 900, 150]}
                rotation={[degToRad(0), degToRad(0), degToRad(90)]}
              />
            </group>
          )}
          {currentExhaustNum === 1 ||
            currentExhaustNum === 2 ||
            currentExhaustNum === 0 ||
            currentExhaustNum === 6 || (
              <group>
                <JiggleArrow
                  obj={arrow}
                  color={"red"}
                  position={[-640, 1000, -50]}
                  rotation={[degToRad(90), degToRad(180), 0]}
                />
                <JiggleArrow
                  obj={arrow}
                  color={"red"}
                  position={[0, 1000, -50]}
                  rotation={[degToRad(90), degToRad(180), 0]}
                />
              </group>
            )}
          {currentExhaustNum === 6 && (
            <group>
              <JiggleArrow
                obj={arrow}
                color={"red"}
                position={[350, 775, 50]}
                rotation={[degToRad(0), degToRad(90), degToRad(90)]}
              />
            </group>
          )}
          {currentIntakeNum === 1 && (
            <group>
              <JiggleArrow
                obj={arrow}
                color={"blue"}
                position={[-1000, 775, 50]}
                rotation={[degToRad(0), degToRad(90), degToRad(90)]}
              />
            </group>
          )}
          {currentIntakeNum === 1 || currentIntakeNum === 5 || (
            <group>
              <JiggleArrow
                obj={arrow}
                color={"blue"}
                position={[-640, 450, 550]}
                rotation={[degToRad(90), degToRad(180), 0]}
              />
              <JiggleArrow
                obj={arrow}
                color={"blue"}
                position={[0, 450, 550]}
                rotation={[degToRad(90), degToRad(180), 0]}
              />
            </group>
          )}
          {currentIntakeNum === 5 && (
            <group>
              <JiggleArrow
                obj={arrow}
                color={"blue"}
                position={[-640, 570, 650]}
                rotation={[degToRad(25), degToRad(180), 0]}
              />
              <JiggleArrow
                obj={arrow}
                color={"blue"}
                position={[0, 570, 650]}
                rotation={[degToRad(25), degToRad(180), 0]}
              />
            </group>
          )}
        </group>
      </Suspense>
    </>
  );
};

export default Products;
