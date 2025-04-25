import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Flow from "./Flow";
import { ReactFlowProvider } from "reactflow";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatFlow from "./ChatFlow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ReactFlowProvider>
                <Flow />
              </ReactFlowProvider>
            }
          />
          <Route path="/flow" element={<ChatFlow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
