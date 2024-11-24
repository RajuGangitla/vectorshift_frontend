// draggableNode.js

export const DraggableNode = ({ type, label, Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex h-20 w-24 cursor-grab flex-col items-center justify-center rounded-lg bg-white p-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <Icon className="mb-2 h-8 w-8" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
