// inputNode.js

import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';


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
