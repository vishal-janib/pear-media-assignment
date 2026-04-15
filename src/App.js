import { useState } from "react";
import Navbar from "./components/Navbar";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => setActiveTab("text")}>Creative Studio</button>

        <button onClick={() => setActiveTab("image")}>Style Lab</button>
      </div>

      <div style={{ marginTop: "30px" }}>
        {activeTab === "text" && <WorkflowText />}
        {activeTab === "image" && <WorkflowImage />}
      </div>
    </div>
  );
}

export default App;
