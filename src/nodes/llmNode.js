// llmNode.js

import { Position } from 'reactflow';
import ReusableNode from '../reusable/node';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <ReusableNode
      data={data}
      title="LLM"
      inputRequired={false}
      selectRequired={false}
      handles={handles}
    />
  );
};