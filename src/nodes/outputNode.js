// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import ReusableNode from '../reusable/node';

// export const OutputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
//   const [outputType, setOutputType] = useState(data.outputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setOutputType(e.target.value);
//   };

//   return (
//     <div style={{ width: 200, height: 80, border: '1px solid black' }}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-value`}
//       />
//       <div>
//         <span>Output</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={currName}
//             onChange={handleNameChange}
//           />
//         </label>
//         <label>
//           Type:
//           <select value={outputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">Image</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }


export const OutputNode = ({ id, data }) => (
  <ReusableNode
    data={data}
    id={id}
    style={{ backgroundColor: '#e3f2fd' }}
    title="Input"
    inputRequired={true}
    inputLabel="Name"
    selectRequired={true}
    selectLabel="Type"
    selectOptions={[
      { value: 'Text', label: 'Text' },
      { value: 'File', label: 'File' },
    ]}
    handles={[
      { type: 'source', position: Position.Right, id: `${id}-value` },
    ]}
    customPrefix={"customOutput-"}
    fallbackPrefix={"output_"}
  />
);
