import React, { useCallback, useRef, Suspense } from "react";
import { useTexture, useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BoxBufferGeometry, Object3D, SplineCurve } from "three";
import * as THREE from "three";
import JiggleArrow from "./Components/JiggleArrow";
import Arrow from "./Components/Arrow";

const Products = (props) => {
  const refIntake = useRef();
  const refExhaust = useRef();
  // console.log("houseRef", ref);
  const {
    currentIntakeNum,
    currentExhaustNum,
    onActiveIntake,
    onActiveExhaust,
    atticMode,
    atticNum,
  } = props;

  const houseOnly = useLoader(GLTFLoader, "/houseOnly13.gltf");
  const products = useLoader(GLTFLoader, "/products19.gltf");
  const arrow = useLoader(GLTFLoader, "/arrow3.gltf");
  const lightsAttic = useLoader(FBXLoader, "/houseOnly13lights.fbx");
  // debugger;
  const lightGroupPos1 = lightsAttic.children[0].position;
  const lightGroupPos2 = lightsAttic.children[1].position;
  // const lightsAttic = useLoader(FBXLoader, "/house13lights.fbx");

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

  const exhausts = getUniqeNodesAndGroupsByKeyContaining("Exhaust", products);
  exhausts.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const intakes = getUniqeNodesAndGroupsByKeyContaining("Intake", products);
  intakes.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const intakeNames = [];
  const exhaustNames = [];
  intakes.forEach((i) => intakeNames.push(i.name));
  exhausts.forEach((i) => exhaustNames.push(i.name));
  console.log("intakes", intakeNames);
  console.log("exhauts", exhaustNames);
  // debugger;
  const houseOnlyMeshes = getUniqeNodesByKey("Mesh", houseOnly);
  const meshesOnly = getMeshesOnly(houseOnlyMeshes);
  const sidingNormal = useLoader(TextureLoader, "NormalMap6.png");
  const sidingBump = useLoader(TextureLoader, "Bump4.png");
  const moldMap = useLoader(TextureLoader, "Mold.png");
  //   const sidingbump = useTexture("outer_wallsBump.png");
  const sidingNormalAttic = useTexture("NormalMap6.png");
  houseOnly.materials["Siding"].color = { b: 0.8, g: 0.8, r: 0.8 };
  houseOnly.materials["Roof"].color = { b: 0.2, g: 0.2, r: 0.2 };

  const sidingMat = new THREE.MeshPhysicalMaterial({
    // color: 0xe6e6e6,
    // bumpMap: sidingbump,
  });

  //   houseOnly.materials["Siding"] = sidingMat;
  // houseOnly.materials["Siding"].normalMap = sidingNormal;
  // houseOnly.materials["Siding"].bumpMap = sidingBump;
  // debugger;
  // houseOnly.materials["Siding_attic"].normalMap = sidingNormalAttic;
  //   debugger;

  const mat = houseOnly.materials["window"];
  const matPlace = new THREE.MeshStandardMaterial();
  mat.opacity = 0.36;
  // debugger;
  //   houseOnly.nodes["outer_walls"].castShadow = true;
  //   houseOnly.nodes["outer_walls"].material = mat;
  houseOnly.nodes["outer_walls"].material.refractionRatio = 0;
  // houseOnly.nodes["outer_walls"].material.normalMap = sidingNormal;
  console.log("siding", houseOnly, houseOnly.nodes["outer_walls"].material);
  houseOnly.nodes["outer_walls"].material.color = { b: 0.8, g: 0.8, r: 0.8 };

  houseOnly.nodes["attic_cutout"].material.bumpMap = sidingBump;
  // debugger;
  houseOnly.nodes["attic_cutout"].material.bumpScale = 0.01;

  houseOnly.nodes["outer_walls"].receiveShadow = true;
  //   houseOnly.nodes["outer_walls"].visible = false;
  houseOnly.nodes["attic_cutout"].castShadow = true;
  // houseOnly.nodes["attic_cutout"].visible = false;
  houseOnly.nodes["Trim"].castShadow = true;
  houseOnly.nodes["Concrete"].castShadow = true;
  houseOnly.nodes["Foof_main"].receiveShadow = false;
  houseOnly.nodes["Foof_main"].castShadow = false;
  // houseOnly.nodes["Windows-House_Main"].castShadow = true;
  // houseOnly.nodes["Windows-window"].castShadow = true;
  // houseOnly.nodes["Windows-window_1"].castShadow = true;
  houseOnly.nodes["Windows"].castShadow = true;
  houseOnly.nodes["Ground"].receiveShadow = true;
  houseOnly.nodes["Ground"].castShadow = false;
  const mold = houseOnly.materials["Insulation"].clone();

  const light1 = new THREE.PointLight(0xffffff, 0.25);
  light1.position.setX(lightGroupPos1.x);
  light1.position.setZ(lightGroupPos1.z - 20);
  light1.position.setY(lightGroupPos1.y - 20);
  const light2 = light1.clone();
  light2.position.setX(lightGroupPos1.x - 300);
  const light3 = light1.clone();
  light3.position.setX(lightGroupPos1.x - 200);
  //   debugger;
  if (atticMode === true) {
    // houseOnly.nodes["attic_cutout"].visible = false;
    if (atticNum === 0) {
      houseOnly.nodes["Baffles_2"].visible = false;
      houseOnly.nodes["ice_1"].visible = false;
      houseOnly.nodes["ice_2"].visible = false;
      houseOnly.nodes["Stud"].material = matPlace;
      houseOnly.nodes["insulation"].material = matPlace;
      houseOnly.nodes["extra_insulation"].visible = false;
      // houseOnly.materials["Insulation"] = matPlace;
    }
    if (atticNum === 1) {
      houseOnly.nodes["Baffles_2"].visible = true;
      houseOnly.nodes["ice_1"].visible = false;
      houseOnly.nodes["ice_2"].visible = false;
      houseOnly.nodes["Stud"].material = matPlace;
      houseOnly.nodes["insulation"].material = matPlace;
      houseOnly.nodes["extra_insulation"].visible = false;
      // houseOnly.materials["Insulation"] = matPlace;
    }
    if (atticNum === 2) {
      // mold.map = moldMap;
      houseOnly.nodes["Stud"].material = mold;
      houseOnly.nodes["insulation"].material = mold;
      houseOnly.nodes["extra_insulation"].visible = false;
      houseOnly.nodes["Baffles_2"].visible = false;
      houseOnly.nodes["Stud"].material = mold;

      houseOnly.nodes["ice_1"].visible = false;
      houseOnly.nodes["ice_2"].visible = false;
    }
    if (atticNum === 3) {
      houseOnly.nodes["Baffles_2"].visible = false;
      houseOnly.nodes["ice_1"].visible = true;
      houseOnly.nodes["ice_2"].visible = true;
      houseOnly.nodes["extra_insulation"].visible = false;
      houseOnly.nodes["Stud"].material = matPlace;
      houseOnly.nodes["insulation"].material = matPlace;
    }
    if (atticNum === 4) {
      houseOnly.nodes["Baffles_2"].visible = false;
      houseOnly.nodes["ice_1"].visible = false;
      houseOnly.nodes["ice_2"].visible = false;
      houseOnly.nodes["extra_insulation"].visible = true;
      houseOnly.nodes["Stud"].material = matPlace;
      houseOnly.nodes["insulation"].material = matPlace;
      light1.intensity = 0;
      light2.intensity = 0;
      light3.intensity = 0;
    }
    if (atticNum === 5) {
      houseOnly.nodes["Baffles_2"].visible = false;
      houseOnly.nodes["ice_1"].visible = false;
      houseOnly.nodes["ice_2"].visible = false;
      houseOnly.nodes["extra_insulation"].visible = false;
      houseOnly.nodes["Stud"].material = matPlace;
      houseOnly.nodes["insulation"].material = matPlace;
      // light1.intensity = 0;
      // light2.intensity = 0;
      // light3.intensity = 0;
    }
  } else {
    houseOnly.nodes["attic_cutout"].visible = true;
  }
  return (
    <>
      <Suspense>
        <directionalLight
          castShadow={true}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          position={[3, 2, 3]}
        />

        <group
          scale={0.003}
          // position={[1.2, -2, 0]}
        >
          <primitive object={houseOnly.scene} />
          <primitive object={light1} />
          <primitive object={light2} />
          <primitive object={light3} />
          {/* <primitive object={lightsAttic} /> */}
          <group>
            {currentExhaustNum !== null && (
              <primitive
                ref={refExhaust}
                onBeforeRender={(e) => onActiveExhaust(refExhaust)}
                object={exhausts[currentExhaustNum - 1]}
              />
            )}
            {currentIntakeNum !== null && (
              <primitive
                ref={refIntake}
                onBeforeRender={(e) => onActiveIntake(refIntake)}
                object={intakes[currentIntakeNum - 1]}
              />
            )}
          </group>
          )}
        </group>
      </Suspense>
    </>
  );
};

export default Products;
