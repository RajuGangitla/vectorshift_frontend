// outputNode.js

import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';


export const OutputNode = ({ id, data }) => (
  <ReusableNode
    data={data}
    id={id}
    title="Output"
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
