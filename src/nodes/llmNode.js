// llmNode.js

import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';


// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{ width: 200, height: 80, border: '1px solid black' }}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={${id}-system}
//       style={{ top: ${100 / 3}%}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={${id}-prompt}
//       style={{ top: ${200 / 3}%}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={${id}-response}
//       />
//     </div>
//   );
// }

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <ReusableNode
      data={data}
      style={{ backgroundColor: '#e1f5fe' }}  // Optional unique styling for LLMNode
      title="LLM Node"
      inputRequired={false}
      selectRequired={false}
      handles={handles}
    />
  );
};