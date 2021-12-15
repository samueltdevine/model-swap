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
import CameraGuide from "./Components/CameraGuide";
import CameraLogger from "./Components/CameraLogger";

function App() {
  const [activeExhaustNum, setActiveExhaustNum] = useState(0);
  const [activeIntakeNum, setActiveIntakeNum] = useState(1);
  const [activePreview, setActivePreview] = useState(0);
  const [activeIntake, onActiveIntake] = useState(null);
  const [activeExhaust, onActiveExhaust] = useState(null);
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

  return (
    <div className="App">
      <div className="wrapper" style={{ display: "flex", height: "100%" }}>
        <div className="gui" style={{}}>
          <Tabs
            defaultActiveKey="exhaust"
            // id="uncontrolled-tab-example"
            // className="mb-2"
          >
            <Tab eventKey="exhaust" title="Exhaust">
              <GuiQuestion
                setActiveExhaustNum={setActiveExhaustNum}
                activeExhaustNum={activeExhaustNum}
                setActivePreview={setActivePreview}
                // answer={3}
                type={"exhaust"}
                names={[
                  "Plastic Ridge Vent",
                  "Mesh Ridge Vent",
                  "Plastic Slant Back Roof Louver",
                  "Aluminum Square Roof Louver",
                  '12" Internally Braced Wind Turbine',
                  "Plastic Gable Louvers",
                ]}
              ></GuiQuestion>
            </Tab>
            <Tab eventKey="intake" title="Intake">
              <GuiQuestion
                setActiveIntakeNum={setActiveIntakeNum}
                activeIntakeNum={activeIntakeNum}
                setActivePreview={setActivePreview}
                type={"intake"}
                names={[
                  "Plastic Gable Louvers",
                  "Aluminum Undereave Intake Vent",
                  "Continuous Undereave Vent",
                  "Plastic Soffit Vent",
                  "Roftop Intake Vent",
                  "Closable Soffit Vent",
                ]}
              ></GuiQuestion>
            </Tab>
          </Tabs>
        </div>
        <div className="canvasWrap" style={{ width: "100%", height: "100%" }}>
          <Canvas shadows={true} shadowMap>
            <Suspense fallback={null}>
              <Arrows
                activeExhaustNum={activeExhaustNum}
                activeIntakeNum={activeIntakeNum}
              />
              {/* <Arrow scale={1} /> */}
              {/* <MoveAlongCurve /> */}
              <Products
                onActiveIntake={onActiveIntake}
                onActiveExhaust={onActiveExhaust}
                // forwardedRef={childRef}
                currentExhaustNum={activeExhaustNum}
                currentIntakeNum={activeIntakeNum}
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
              <DepthOfField
                focusDistance={0.96} // where to focus
                focalLength={0.2} // focal length
                bokehScale={4} // bokeh size
              />
              <Noise opacity={0.01} />
            </EffectComposer>
            {/* <OrbitControls
              target={[-1, 1, 0]}
              maxDistance={6}
              maxPolarAngle={THREE.MathUtils.degToRad(99)}
            /> */}
            <CameraLogger />
            <CameraGuide
              lastSelected={activePreview}
              activeIntakeNum={activeIntakeNum}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
