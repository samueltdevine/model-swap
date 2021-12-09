import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState, useRef, useEffect } from "react";
import Yoo from "./Yoo";
import House from "./House";
import * as THREE from "three";
import GuiQuestion from "./Components/GuiQuestion";
import JiggleArrow from "./Components/JiggleArrow";
import { EffectComposer, Outline, Noise } from "@react-three/postprocessing";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
// import { EdgeDetectionMode } from "postprocessing";

import Products from "./Products";
const Model = () => {
  const gltf = useLoader(GLTFLoader, "./yoo4.glb");
  const part1 = gltf.nodes["cube1"];
  console.log(part1);
  return (
    <>
      <primitive object={part1} scale={0.01} />
    </>
  );
};

function App() {
  const [activeExhaustNum, setActiveExhaustNum] = useState(0);
  const [activeIntakeNum, setActiveIntakeNum] = useState(1);
  const [activePreview, setActivePreview] = useState(undefined);
  const [activeIntake, onActiveIntake] = useState(null);
  const [activeExhaust, onActiveExhaust] = useState(null);
  const selectedIntake = activeIntake ? [activeIntake] : undefined;
  const selectedExhaust = activeExhaust ? [activeExhaust] : undefined;

  console.log("selectedIntake", selectedIntake);

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
              {selectedIntake && (
                <Outline
                  blur
                  selection={selectedIntake}
                  visibleEdgeColor="white"
                  hiddenEdgeColor="white"
                  edgeStrength={1}
                  width={500}
                />
              )}
              <Noise opacity={0.1} />
              {/* <GodRays /> */}
            </EffectComposer>
            <EffectComposer multisampling={8} autoClear={false}>
              {selectedExhaust && (
                <Outline
                  blur
                  hiddenEdgeColor="white"
                  selection={selectedExhaust}
                  visibleEdgeColor="white"
                  edgeStrength={1}
                  width={500}
                />
              )}
            </EffectComposer>
            <OrbitControls maxPolarAngle={THREE.MathUtils.degToRad(99)} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
