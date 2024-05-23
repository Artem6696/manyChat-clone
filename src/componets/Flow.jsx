import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import uuid from 'react-uuid';
import TextUpdaterNode from './TextUpdaterNode.jsx';
import logo from '../assets/logo.jpeg';
const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  { id: uuid(), type: 'textUpdater', position: { x: 0, y: 0 }, data: {} },
];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );
  
  const addNode = useCallback(() => {
    const newNode = {
      id: uuid(),
      type: 'textUpdater',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { value: '' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);
  
  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, []);
  
  return (
    <div style={{ display: 'flex', height: '100%' , width: '100%' }}>
      <div className={"box-border h-auto w-36 bg-gray-100"}>
        <img className={'w32 h-auto pb-2 '} src={logo} alt=""/>
      <button
        onClick={addNode}
        className="absolute z-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-80"
        style={{ top: 10, left: 10 }}
      >
        add action
      </button>
      </div>
      <div style={{ display: 'flex', height: '100%' , width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
