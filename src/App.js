import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState } from "react";
import Yoo from "./Yoo";
import * as THREE from "three";

const Gui = ({ activeNum, setActiveNum }) => {
  return (
    <div
      className="gui-body"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Which One?</h1>
      <label>
        <input
          type="radio"
          // id="Question"
          name="1"
          value={0}
          checked={activeNum === 0}
          onChange={() => setActiveNum(0)}
        />
        1
      </label>
      <label>
        <input
          type="radio"
          // id="Question"
          name="2"
          value={1}
          checked={activeNum === 1}
          onChange={() => setActiveNum(1)}
        />
        2
      </label>
      <label>
        <input
          type="radio"
          // id="Question"
          name="3"
          value={2}
          checked={activeNum === 2}
          onChange={() => setActiveNum(2)}
        />
        3
      </label>
    </div>
  );
};

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
        <Gui setActiveNum={setActiveNum} activeNum={activeNum} />
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
