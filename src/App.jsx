import { useState } from "react";

function App() {
  const [columns, setcolumns] = useState({
    company1: {
      name: "Company 1",
      items: [
        { id: "1", content: "Task1" },
        { id: "2", content: "Task2" },
      ],
    },
    company2: {
      name: "Company 2",
      items: [
        { id: "3", content: "Task3" },
        { id: "4", content: "Task4" },
      ],
    },
  });

  const [newTask, setnewTask] = useState("");
  const [activeColumns, setactiveColumns] = useState("company1");      //default add task to coloumn
  const [draggedItem, setdraggedItem] = useState(null);               //which task is currently dragged 

  const addNewTask = () => {                                        //add  new task 
    if (newTask.trim() === "") return;                             //inputisempty

    const updatedColumns = { ...columns };                         //copy of columns
    updatedColumns[activeColumns].items.push({
      id: Date.now().toString(),                                     //random id
      content: newTask,
    });

    setcolumns(updatedColumns);                                    //added to column which we made
    setnewTask("");
  };

  const RemoveTask = (columnId, TaskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== TaskId
    );
    setcolumns(updatedColumns);
  };

  const handleDragStart = (columnId, item) => {                                  //Track the item currently dragged
    setdraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();                                                             //prevent Default behaviour
  };
              
  const handleDrop = (e, targetColumnId, targetItemId = null) => {                                //dropping the box innside the column
    e.preventDefault();
    if (!draggedItem) return;                                     

    const { columnId: sourceColumnId, item: dragged } = draggedItem;                   //extract the information 

    const updatedColumns = { ...columns };

    // Remove from source
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter(
      (i) => i.id !== dragged.id
    );

    if (targetItemId) {
      
      const targetItems = updatedColumns[targetColumnId].items;
      const targetIndex = targetItems.findIndex((i) => i.id === targetItemId);

      if (sourceColumnId === targetColumnId) {
                                                                                // Interchange position in same column
        targetItems.splice(targetIndex, 0, dragged);
      } else {
                                                                                   // Add to new column at the position
        targetItems.splice(targetIndex + 1, 0, dragged);
      }
    } else {
                                                                                     // Dropped on empty space in column
      updatedColumns[targetColumnId].items.push(dragged);
    }

    setcolumns(updatedColumns);
    setdraggedItem(null);
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
        <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setnewTask(e.target.value)}
            placeholder="ADD Task +"
            className="flex p-3 bg-zinc-700 text-white"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
        </div>

        <div className="flex gap-4 w-full">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
              className="w-1/2 bg-zinc-700 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-white text-xl font-bold mb-4">
                {column.name}
              </h2>
              <div className="space-y-2">
                {column.items.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(columnId, item)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, columnId, item.id)} 
                    className="bg-zinc-700 text-amber-50 p-2 rounded shadow cursor-move flex justify-between items-center"
                  >
                    <span>{item.content}</span>
                    <button
                      onClick={() => RemoveTask(columnId, item.id)}
                      className="text-red-500 font-bold "
                    >
                      ✏️     ×
                    </button>
                    
                  </div>
                  
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;





// import { useState } from "react"

// function App(){
//   const [columns, setcolumns] = useState({
//     Company1:{
//       name:"company1",
//       items:[
//         {id:"1",content:"Task1"},
//         {id:"2",content:"Task2"}
//       ]
//     },
//     company2:{
//       name:"company2",
//       items:[
//         {id:"3",content:"Task3"},
//         {id:"4",content:"Task4"}
//       ]
//     }
//   })

//   const [newTask, setnewTask] = useState("")
//   const [activeColumns, setactiveColumns] = useState("company1")             //default add task to coloumn
//   const [draggedItem, setdraggedItem] = useState(null)          //which task is currently dragged 

//   const addNewTask=()=>{                       //new Task
//     if (newTask.trim==="")                      //inputisempty
//       return;

//       const updatedColumns={...columns};            //copy of columns
//       updatedColumns[activeColumns].items.push({
//         id:Date.now().toString(),                                //new id 
//         content:newTask,
//       })

//     setcolumns(updatedColumns);             //added to columns which we made   
//     setnewTask("")
//   }

//   const RemoveTask=(columnId,TaskId)=>{
//     const updatedColumns={...columns};  

//     updatedColumns[columnId].items = updatedColumns[columnId].items.
//     filter((item)=>item.id !==TaskId)                                                             //filters the elements
//     setcolumns(updatedColumns);
//   }




//   const handleDragStart=(columnId,item)=>{          //Track the item currently dragged
//     setdraggedItem({columnId, item})
//   }

//   const handleDragOver=(e)=>{
//     e.preventDefault();                            //prevent Default behaviour
//   }      
  
//   const handleDrop=(e,columnId)=>{               //dropping the box innside the column
//     e.preventDefault();

//     if(!draggedItem) return;    
//     const {columnId,sourceColumnId,item} = draggedItem;    //extract the information 
//    if (sourceColumnId===columnId)return; 
    
//     const updatedColumns ={...columns};

//     updatedColumns[sourceColumnId].items =updatedColumns
//     [sourceColumnId].item.filter((i)=>i.id !=item.id)

//     updatedColumns[columnId].items.push(item)

//     setcolumns(updatedColumns);
//     setdraggedItem(null);
//   }

//   //ui
//   const coulumnStyles={
//     company1:{
//       header:"bg-gradient-to-r from-blue-600 to blue-400",
//       border:"border-blue-400"
//     },
//     company2:{
//       header:"bg-gradient-to-r from-yellow-600 to-yellow-400",
//       border:"border-yellow-400"
//     }
//   }

// return (
//   <>
//   <div className="p-6 w-full min-h-screen bg-gradient-to-b from-zinc-900 ti-zinc-800 flex items-center justify-center">

//   <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
//     <div className="mb8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
//       <input type="text" value={newTask}
//       onchange={(e)=> setnewTask(e.target.value)}
//       placeholder="Add new Task" className="flex-grow p-3 bg-zinc-700 text-white"
//       onKeyDown={(e)=>e.key ==="Enter" && addNewTask()} 
//       />
//     </div>
//   </div>
//   </div>


//   </>
// )}
