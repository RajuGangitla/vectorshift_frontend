// inputNode.js

import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';


// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//   };

//   return (
//     <div style={{ width: 200, height: 80, border: '1px solid black' }}>
//       <div>
//         <span>Input</span>
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
//           <select value={inputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">File</option>
//           </select>
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={${id}-value}
//       />
//     </div>
//   );
// }


export const InputNode = ({ id, data }) => (
  <ReusableNode
    data={data}
    id={id}
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
    customPrefix={"customInput-"}
    fallbackPrefix={"input_"}
  />
);
