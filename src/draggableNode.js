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
    // <div
    //   // className={type}
    //   onDragStart={(event) => onDragStart(event, type)}
    //   onDragEnd={(event) => (event.target.style.cursor = 'grab')}
    //   className={`cursor-grab min-w-[80px] h-[60px] flex items-center justify-center rounded-lg bg-gray-800 text-white shadow-md ${type}`}
    //   // style={{
    //   //   cursor: 'grab',
    //   //   minWidth: '80px',
    //   //   height: '60px',
    //   //   display: 'flex',
    //   //   alignItems: 'center',
    //   //   borderRadius: '8px',
    //   //   backgroundColor: '#1C2536',
    //   //   justifyContent: 'center',
    //   //   flexDirection: 'column'
    //   // }}
    //   draggable
    // >
    //   <span >{label}</span>
    // </div>
  );
};
