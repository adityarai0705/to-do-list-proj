import React, { useState } from "react";

function App() {
  const [ primaryToDo, setToDo] = useState( "");
  const [ list, setList] = useState([]);
  // [] makes the list an array

  const updateInput = (event) => {
    setToDo( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  const addElement = () => {
    console.log( "kaam kiya");
    setList( (curList) => {
      return [...curList, primaryToDo];
    });
    setToDo("");
  };

  return (
   <>
    <div className="text-6xl font-extrabold drop-shadow-2xl bg-teal-500 text-blue-900 text-center">To-do List</div>
    <div className='h-screen w-screen bg-teal-100 flex flex-col'>
      <div className="flex flex-row justify-center m-4">
        <input className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateInput} value={primaryToDo}></input>
        {/* onChange calls a jsx function whenever the text inside the input field is changed */}

        <button className="m-2 p-2 bg-green-500 rounded-lg text-green-100 hover:bg-yellow-500 hover:text-yellow-100" onClick={addElement}>Add Task</button>
      </div>

      <div className="bg-yellow-100 m-4 rounded-lg p-4">

        
            {
              list.map(
                (curElt) => { 
                  return <>
                    <div className="">
                      <div className="flex flex-row justify-between">
                        <p className="text-yellow-800"> {curElt} </p>
                        <div className="fa fa-trash"></div>
                      </div>
                    </div>
                    <hr/>
                  </>;
                })
            }
            
        
      </div>
    </div>
   </>
  );
}

export default App;
