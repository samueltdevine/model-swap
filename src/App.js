import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { CubeCamera, Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import GuiQuestion from "./Components/GuiQuestion";
import {
  EffectComposer,
  Outline,
  Noise,
  SSAO,
  DepthOfField,
} from "@react-three/postprocessing";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import Arrows from "./Components/Arrows";
import Products from "./Products";
import { MemoizedCameraGuide } from "./Components/CameraGuide";
import CameraLogger from "./Components/CameraLogger";

function App() {
  const [activeExhaustNum, setActiveExhaustNum] = useState(1);
  const [activeIntakeNum, setActiveIntakeNum] = useState(1);
  const [activePreview, setActivePreview] = useState(0);
  const [activeIntake, onActiveIntake] = useState(null);
  const [activeExhaust, onActiveExhaust] = useState(null);
  const [atticMode, setAtticMode] = useState(false);
  const [atticNum, setAtticNum] = useState(0);
  const selectedIntake = activeIntake ? [activeIntake] : undefined;
  const selectedExhaust = activeExhaust ? [activeExhaust] : undefined;

  // const CameraGuide = (props) => {
  //   // const ref = useRef();
  //   const { camera } = useThree();

  //   const matrices = {
  //     intake1: {
  //       Vector3: {
  //         x: -5.472475046084495,
  //         y: 2.6551389057519588,
  //         z: 2.063366706336503,
  //       },
  //       Quaternion: {
  //         _x: -0.13593025779965517,
  //         _y: -0.5319543318034656,
  //         _z: -0.08698763634244487,
  //         _w: 0.8312524917337706,
  //       },
  //     },
  //     intake2: {
  //       Vector3: {
  //         x: -5.472475046084495,
  //         y: 2.6551389057519588,
  //         z: 2.063366706336503,
  //       },
  //       Quaternion: {
  //         _x: -0.13593025779965517,
  //         _y: -0.5319543318034656,
  //         _z: -0.08698763634244487,
  //         _w: 0.8312524917337706,
  //       },
  //     },
  //   };

  //   useFrame((state) => {
  //     state.camera.fov = 38;
  //     // state.camera.updateProjectionMatrix()
  //   });

  //   useFrame(() => {
  //     camera.updateMatrixWorld();
  //     camera.updateProjectionMatrix();
  //   });

  //   // useFrame(() => {
  //   console.log("camera", camera);
  //   console.log("camera pos", camera.position);
  //   console.log("camera qua", camera.quaternion);
  //   // });
  //   // return <></>;
  //   return <perspectiveCamera {...props} />;
  // };

  console.log("Active", activePreview);
  console.log("atticNum", atticNum);
  return (
    <div className="App">
      <div className="wrapper" style={{ display: "flex", height: "100%" }}>
        <div className="gui" style={{}}>
          <div
            className={"gui-camera-switch"}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <label onClick={() => setActivePreview([38, "reset"])}>
                Back
              </label>
              <label onClick={() => setActivePreview([39, "reset"])}>
                Front
              </label>
            </div>
            <label
              style={{ justifySelf: "flex-end" }}
              onClick={() => setAtticMode((atticMode) => !atticMode)}
            >
              Attic Mode
            </label>
          </div>
          {/* {atticMode === false && ( */}
          <Tabs
            defaultActiveKey="exhaust"
            // id="uncontrolled-tab-example"
            // className="mb-2"
          >
            {/* {atticMode === false && (  */}
            <Tab eventKey="exhaust" title="Exhaust">
              <GuiQuestion
                atticMode={false}
                setActiveExhaustNum={setActiveExhaustNum}
                activeExhaustNum={activeExhaustNum}
                setActivePreview={setActivePreview}
                // answer={3}
                type={"exhaust"}
                names={[
                  "Contractor Assignment 1 Post Exhaust Aluminum square louver 8",
                  "Contractor Assignment 1 Post Exhaust Mesh Ridge Vent 23ft",
                  "Contractor Assignment 1 Post Exhaust Plastic Ridge Vent 22ft",
                  "Contractor Assignment 1 Post Exhaust Platic Slant Back Louvers 11",
                  "Contractor Assignment 1 Post Exhaust Turbines 2",
                  "Contractor Assignment 1 Pre Exhaust Aluminum square louver 4",
                  "Contractor Assignment 2 Post Exhaust Aluminum Square louver 9",
                  "Contractor Assignment 2 Post Exhaust Mesh Ridge Vent 26 feet",
                  "Contractor Assignment 2 Post Exhaust Plastic Ridge Vent 30ft",
                  "Contractor Assignment 2 Post Exhaust Plastic Slant Back Louver 12",
                  "Contractor Assignment 2 Post Exhaust Turbines 2",
                  "Contractor Assignment 2 Pre Exhaust Plastic Ridge Vent 30ft",
                  "Instructor Scenario 1 Post Exhaust Plastic Ridge Vent 22ft",
                  "Instructor Scenario 1 Pre Exhaust Plastic Ridge Vent 10ft",
                  "Instructor Scenario 2 Post Exhaust Ridge vent full",
                  "Instructor Scenario 2 Pre Exhaust Plastic Ridge Vent full",
                  "Instructor Scenario 3 Post Exhaust Square Roof Louver 5",
                  "Instructor Scenario 3 Pre Exhaust Square Roof Louver 3",
                  // "Contractor Assignment 1 Post Exhaust Aluminum square louver 8",
                ]}
              ></GuiQuestion>
            </Tab>
            <Tab eventKey="intake" title="Intake">
              <GuiQuestion
                atticMode={false}
                setActiveIntakeNum={setActiveIntakeNum}
                activeIntakeNum={activeIntakeNum}
                setActivePreview={setActivePreview}
                type={"intake"}
                names={[
                  "Contractor Assignment 1 Post Intake Aluminum Undereave Intake Vent 15",
                  "Contractor Assignment 1 Post Intake Closable soffit vent 7",
                  "Contractor Assignment 1 Post Intake Continuous Undereave Vent 48ft",
                  "Contractor Assignment 1 Post Intake Plastic Soffit Vent 18",
                  "Contractor Assignment 1 Post Intake Rooftop Intake Vent 43 feet",
                  "Contractor Assignment 1 Pre Intake Aluminum Undereave Intake Vent 10",
                  "Contractor Assignment 2 Post Intake Aluminum Undereave Intake Vent 21",
                  "Contractor Assignment 2 Post Intake Closable Soffit Vent 10",
                  "Contractor Assignment 2 Post Intake Continuous Undereave Vent 64ft",
                  "Contractor Assignment 2 Post Intake Plastic Soffit Vent 25",
                  "Contractor Assignment 2 Post Intake Rooftop Intake Vent 60ft",
                  "Contractor Assignment 2 Pre Intake Closable soffit vent 8",
                  "Instructor Scenario 1 Post Intake Plastic Soffit Vent 18",
                  "Instructor Scenario 1 Pre Intake Plastic Soffit Vent 10",
                  "Instructor Scenario 2 Post Intake Rooftop Vent full",
                  "Instructor Scenario 2 Pre Intake Plastic Bird Block Holes 30ft",
                  "Instructor Scenario 3 Post Intake Aluminum Undereave 10",
                  "Instructor Scenario 3 Pre Intake Aluminum Undereave 5",
                ]}
              ></GuiQuestion>
            </Tab>
            {/* )} */}
            {/* {atticMode && ( */}
            <Tab eventKey="Attic" title="Attic" disabled={!atticMode}>
              <GuiQuestion
                atticMode={true}
                setActiveIntakeNum={setActiveIntakeNum}
                activeIntakeNum={activeIntakeNum}
                setAtticNum={setAtticNum}
                atticNum={atticNum}
                setActivePreview={setActivePreview}
                type={"attic"}
                names={["Ideal", "Mold", "Ice", "Blocked Intake"]}
              ></GuiQuestion>
            </Tab>
            {/* )} */}
          </Tabs>

          {/* {atticMode === true && (
           
          )} */}
        </div>
        <div className="canvasWrap" style={{ width: "100%", height: "100%" }}>
          <Canvas shadows={true} shadowMap>
            <Suspense fallback={null}>
              {atticMode === false && (
                <Arrows
                  activeExhaustNum={activeExhaustNum}
                  activeIntakeNum={activeIntakeNum}
                />
              )}

              {/* <Arrow scale={1} /> */}
              {/* <MoveAlongCurve /> */}
              <Products
                onActiveIntake={onActiveIntake}
                onActiveExhaust={onActiveExhaust}
                atticMode={atticMode}
                atticNum={atticNum}
                currentExhaustNum={activeExhaustNum}
                currentIntakeNum={activeIntakeNum}
                atticNum={atticNum}
              />

              <Environment preset="sunset" />
            </Suspense>
            <EffectComposer multisampling={8} autoClear={true}>
              {/* {selectedIntake && (
                <Outline
                  blur
                  selection={selectedIntake}
                  visibleEdgeColor="white"
                  hiddenEdgeColor="white"
                  edgeStrength={1}
                  width={500}
                />
              )} */}
              {/* <GodRays /> */}
            </EffectComposer>
            <EffectComposer multisampling={8} autoClear={false}>
              {/* {selectedExhaust && (
                <Outline
                  blur
                  hiddenEdgeColor="white"
                  selection={selectedExhaust}
                  visibleEdgeColor="white"
                  edgeStrength={1}
                  width={500}
                />
              )} */}
              {/* <SSAO
                // blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
                samples={100}
                radius={0.01}
                intensity={100}
              /> */}
              {/* <DepthOfField
                focusDistance={0.9} // where to focus
                focalLength={0.3} // focal length
                bokehScale={2} // bokeh size
              /> */}
              <Noise opacity={0.01} />
            </EffectComposer>
            {/* <OrbitControls
              target={[-1, 1, 0]}
              maxDistance={6}
              maxPolarAngle={THREE.MathUtils.degToRad(99)}
            /> */}
            <CameraLogger />
            <MemoizedCameraGuide
              atticMode={atticMode}
              // setAtticMode={setAtticMode}
              lastSelected={activePreview}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
