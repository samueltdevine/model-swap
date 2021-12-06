import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState } from "react";
import Yoo from "./Yoo";
import House from "./House";
import * as THREE from "three";
import GuiQuestion from "./Components/GuiQuestion";

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
  const [activeIntakeNum, setActiveIntakeNum] = useState(0);
  console.log(activeIntakeNum);
  return (
    <div className="App">
      <div style={{ display: "flex", height: "100vh" }}>
        <GuiQuestion
          setActiveExhaustNum={setActiveExhaustNum}
          activeExhaustNum={activeExhaustNum}
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
        >
          Exhaust
        </GuiQuestion>
        <GuiQuestion
          setActiveIntakeNum={setActiveIntakeNum}
          activeIntakeNum={activeIntakeNum}
          type={"intake"}
          names={[
            "Plastic Gable Louvers",
            "Aluminum Undereave Intake Vent",
            "Continuous Undereave Vent",
            "Plastic Soffit Vent",
            "Roftop Intake Vent",
            "Closable Soffit Vent",
          ]}
        >
          Intake
        </GuiQuestion>
        <Canvas>
          <Suspense fallback={null}>
            <House
              currentExhaustNum={activeExhaustNum}
              currentIntakeNum={activeIntakeNum}
            />
            {/* <Yoo currentNum={activeExhaustNum} /> */}
            <OrbitControls maxPolarAngle={THREE.MathUtils.degToRad(99)} />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
