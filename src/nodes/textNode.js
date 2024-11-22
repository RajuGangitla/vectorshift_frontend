// textNode.js
import { Handle, Position } from 'reactflow';
import ReusableNode from '../reusable/node';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{ width: 200, height: 80, border: '1px solid black' }}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input
//             type="text"
//             value={currText}
//             onChange={handleTextChange}
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }


export const TextNode = ({ id, data }) => (
  <ReusableNode
    data={data}
    id={id}
    style={{ backgroundColor: '#e3f2fd' }}
    title="Text"
    inputRequired={true}
    inputLabel="Text"
    selectRequired={false}
    handles={[
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
    defaultInputValue={'{{input}}'}
    customPrefix={"customOutput-"}
    fallbackPrefix={"output_"}
  />
);
