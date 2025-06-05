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















// import React, { useState } from "react";
// import { FiPlus, FiTrash } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { FaFire } from "react-icons/fa";

// export const CustomKanban = () => {
//   return (
//     <div className="h-screen w-full bg-neutral-900 text-neutral-50">
//       <Board />
//     </div>
//   );
// };

// const Board = () => {
//   const [cards, setCards] = useState(DEFAULT_CARDS);

//   return (
//     <div className="flex h-full w-full gap-3 overflow-scroll p-12">
//       <Column
//         title="Backlog"
//         column="backlog"
//         headingColor="text-neutral-500"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="TODO"
//         column="todo"
//         headingColor="text-yellow-200"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="In progress"
//         column="doing"
//         headingColor="text-blue-200"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="Complete"
//         column="done"
//         headingColor="text-emerald-200"
//         cards={cards}
//         setCards={setCards}
//       />
//       <BurnBarrel setCards={setCards} />
//     </div>
//   );
// };

// const Column = ({ title, headingColor, cards, column, setCards }) => {
//   const [active, setActive] = useState(false);

//   const handleDragStart = (e, card) => {
//     e.dataTransfer.setData("cardId", card.id);
//   };

//   const handleDragEnd = (e) => {
//     const cardId = e.dataTransfer.getData("cardId");

//     setActive(false);
//     clearHighlights();

//     const indicators = getIndicators();
//     const { element } = getNearestIndicator(e, indicators);

//     const before = element.dataset.before || "-1";

//     if (before !== cardId) {
//       let copy = [...cards];

//       let cardToTransfer = copy.find((c) => c.id === cardId);
//       if (!cardToTransfer) return;
//       cardToTransfer = { ...cardToTransfer, column };

//       copy = copy.filter((c) => c.id !== cardId);

//       const moveToBack = before === "-1";

//       if (moveToBack) {
//         copy.push(cardToTransfer);
//       } else {
//         const insertAtIndex = copy.findIndex((el) => el.id === before);
//         if (insertAtIndex === undefined) return;

//         copy.splice(insertAtIndex, 0, cardToTransfer);
//       }

//       setCards(copy);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     highlightIndicator(e);

//     setActive(true);
//   };

//   const clearHighlights = (els) => {
//     const indicators = els || getIndicators();

//     indicators.forEach((i) => {
//       i.style.opacity = "0";
//     });
//   };

//   const highlightIndicator = (e) => {
//     const indicators = getIndicators();

//     clearHighlights(indicators);

//     const el = getNearestIndicator(e, indicators);

//     el.element.style.opacity = "1";
//   };

//   const getNearestIndicator = (e, indicators) => {
//     const DISTANCE_OFFSET = 50;

//     const el = indicators.reduce(
//       (closest, child) => {
//         const box = child.getBoundingClientRect();

//         const offset = e.clientY - (box.top + DISTANCE_OFFSET);

//         if (offset < 0 && offset > closest.offset) {
//           return { offset: offset, element: child };
//         } else {
//           return closest;
//         }
//       },
//       {
//         offset: Number.NEGATIVE_INFINITY,
//         element: indicators[indicators.length - 1],
//       }
//     );

//     return el;
//   };

//   const getIndicators = () => {
//     return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
//   };

//   const handleDragLeave = () => {
//     clearHighlights();
//     setActive(false);
//   };

//   const filteredCards = cards.filter((c) => c.column === column);

//   return (
//     <div className="w-56 shrink-0">
//       <div className="mb-3 flex items-center justify-between">
//         <h3 className={`font-medium ${headingColor}`}>{title}</h3>
//         <span className="rounded text-sm text-neutral-400">
//           {filteredCards.length}
//         </span>
//       </div>
//       <div
//         onDrop={handleDragEnd}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         className={`h-full w-full transition-colors ${
//           active ? "bg-neutral-800/50" : "bg-neutral-800/0"
//         }`}
//       >
//         {filteredCards.map((c) => {
//           return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
//         })}
//         <DropIndicator beforeId={null} column={column} />
//         <AddCard column={column} setCards={setCards} />
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, id, column, handleDragStart }) => {
//   return (
//     <>
//       <DropIndicator beforeId={id} column={column} />
//       <motion.div
//         layout
//         layoutId={id}
//         draggable="true"
//         onDragStart={(e) => handleDragStart(e, { title, id, column })}
//         className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
//       >
//         <p className="text-sm text-neutral-100">{title}</p>
//       </motion.div>
//     </>
//   );
// };

// const DropIndicator = ({ beforeId, column }) => {
//   return (
//     <div
//       data-before={beforeId || "-1"}
//       data-column={column}
//       className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
//     />
//   );
// };

// const BurnBarrel = ({ setCards }) => {
//   const [active, setActive] = useState(false);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setActive(true);
//   };

//   const handleDragLeave = () => {
//     setActive(false);
//   };

//   const handleDragEnd = (e) => {
//     const cardId = e.dataTransfer.getData("cardId");

//     setCards((pv) => pv.filter((c) => c.id !== cardId));

//     setActive(false);
//   };

//   return (
//     <div
//       onDrop={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
//         active
//           ? "border-red-800 bg-red-800/20 text-red-500"
//           : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
//       }`}
//     >
//       {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
//     </div>
//   );
// };

// const AddCard = ({ column, setCards }) => {
//   const [text, setText] = useState("");
//   const [adding, setAdding] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!text.trim().length) return;

//     const newCard = {
//       column,
//       title: text.trim(),
//       id: Math.random().toString(),
//     };

//     setCards((pv) => [...pv, newCard]);

//     setAdding(false);
//   };

//   return (
//     <>
//       {adding ? (
//         <motion.form layout onSubmit={handleSubmit}>
//           <textarea
//             onChange={(e) => setText(e.target.value)}
//             autoFocus
//             placeholder="Add new task..."
//             className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
//           />
//           <div className="mt-1.5 flex items-center justify-end gap-1.5">
//             <button
//               onClick={() => setAdding(false)}
//               className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
//             >
//               <span>Add</span>
//               <FiPlus />
//             </button>
//           </div>
//         </motion.form>
//       ) : (
//         <motion.button
//           layout
//           onClick={() => setAdding(true)}
//           className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//         >
//           <span>Add card</span>
//           <FiPlus />
//         </motion.button>
//       )}
//     </>
//   );
// };

// const DEFAULT_CARDS = [
//   // BACKLOG
//   { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
//   { title: "SOX compliance checklist", id: "2", column: "backlog" },
//   { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
//   { title: "Document Notifications service", id: "4", column: "backlog" },
//   // TODO
//   {
//     title: "Research DB options for new microservice",
//     id: "5",
//     column: "todo",
//   },
//   { title: "Postmortem for outage", id: "6", column: "todo" },
//   { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

//   // DOING
//   {
//     title: "Refactor context providers to use Zustand",
//     id: "8",
//     column: "doing",
//   },
//   { title: "Add logging to daily CRON", id: "9", column: "doing" },
//   // DONE
//   {
//     title: "Set up DD dashboards for Lambda listener",
//     id: "10",
//     column: "done",
//   },
// ];