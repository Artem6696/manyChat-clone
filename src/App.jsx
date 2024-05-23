import './App.css'
import Flow from "./componets/Flow.jsx";
import { ReactFlowProvider } from "reactflow";

function App() {


  return (
    <>
      <ReactFlowProvider>
         <Flow/>
      </ReactFlowProvider>
    </>
  )
}

export default App
