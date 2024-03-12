import "./App.css";
import { useState } from "react";
import Editor from "./components/editor/Editor";
import exampleData from "./components/editor/data/exampleData";

function App() {
  const [data, setData] = useState(exampleData);

  return (
    <div className="App">
      <div className="app-content">
        <Editor data={data} setData={setData} />
      </div>
    </div>
  );
}

export default App;
