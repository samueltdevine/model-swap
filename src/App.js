import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState } from "react";
import Yoo from "./Yoo";
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
  const [activeNum, setActiveNum] = useState(0);
  return (
    <div className="App">
      <div style={{ display: "flex", height: "100vh" }}>
        <GuiQuestion
          setActiveNum={setActiveNum}
          activeNum={activeNum}
          answer={3}
        >
          Which one is right?
        </GuiQuestion>
        <Canvas>
          <Suspense fallback={null}>
            <Yoo currentNum={activeNum} />
            <OrbitControls maxPolarAngle={THREE.MathUtils.degToRad(90)} />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
