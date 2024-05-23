import { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable,  onDelete }) {
  const [showButtons, setShowButtons] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  
  const toggleButtons = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };
  
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  return (
    <div className="relative shadow-lg p-6 mb-6 bg-white rounded-lg" onClick={toggleButtons}>
      {showButtons && (
        <div className="absolute bottom-10 right-1 transform -translate-y-full flex space-x-2 mb-2">
          <button onClick={toggleEdit} className="">
            <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          
          <button>
            <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      ) }
      <Handle type="target" position={ Position.Top } isConnectable={ isConnectable }/>
      <div>
        <label htmlFor="text"></label>
        <input
          id="text"
          name="text"
          onChange={ onChange }
          className="nodrag text-center"
          style={ { textAlign: 'center', width: '100%' } }
          disabled={ !isEditing }
          ref={ inputRef }
        />
      </div>
      <Handle type="source" position={ Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
