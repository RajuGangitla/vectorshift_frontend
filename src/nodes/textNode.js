// textNode.js
import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';


export const TextNode = ({ id, data }) => (
  <ReusableNode
    data={data}
    id={id}
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
