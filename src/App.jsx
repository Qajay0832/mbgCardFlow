import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Flow from "./Flow";
import { ReactFlowProvider } from "reactflow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  );
}

export default App;
