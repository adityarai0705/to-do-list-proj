import React, { useState } from "react";

function App() {
  const [ primaryToDo, setToDo] = useState( "");
  const [ primaryDate, setDate] = useState();
  const [ list, setList] = useState([]);
  // [] makes the list an array

  const updateInput = (event) => {
    setToDo( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  const updateDate = (event) => {
    setDate( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  const addElement = () => {
    console.log( "kaam kiya");
    setList( (curList) => {
      return [...curList, [primaryToDo, primaryDate, false]];
    });
    setToDo("");
  };

  const deleteElement = (index) => {
    console.log( "Delete");
    setList( (curList) => {
      return curList.filter( (curElt, curIndex) => {
        return index !== curIndex;
      });
    });

  };

  const completeElement = (index) => {
    console.log( "Complete");
    const newList = list.map((curElement, curIndex) => { 
      if( curIndex === index){
        curElement[ 2] = true;
        return curElement;
      }else{
        return curElement;
      }
    });
    setList( newList);
  };

  const numPending = () => {
    let counter = 0;
    list.map( (curElt) => {
      if( curElt[ 2] == false) counter++;
    })
    return counter;
  }

  const numCompleted = () => {
    let counter = 0;
    list.map( (curElt) => {
      if( curElt[ 2] == true) counter++;
    })
    return counter;
  }

  return (
   <>
    <div className="text-6xl font-extrabold drop-shadow-2xl bg-teal-500 text-blue-900 text-center">To-do List</div>
    <div className='h-screen w-screen bg-teal-100 flex flex-col'>
      <div className="flex flex-row justify-center m-4">
        <input className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateInput} value={primaryToDo}></input>
        <input type={'date'} className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateDate}></input>
        {/* onChange calls a jsx function whenever the text inside the input field is changed */}

        <button className="m-2 p-2 bg-green-500 rounded-lg text-green-100 hover:bg-yellow-500 hover:text-yellow-100" onClick={addElement}>Add Task</button>
      </div>

      
      <div className="bg-yellow-100 m-4 rounded-lg p-4">
        <h3 className="text-yellow-900 underline font-extrabold">Pending</h3>
        {
          numPending() == 0 ?
          <p className="text-yellow-800">No task to be done yet.</p>
          :
          list.map(
            (curElt, curIndex) => { 
              return (curElt[ 2] === false ? 
              (<>
                <div className="">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-yellow-900 font-bold"> {curElt[ 0]} </p>
                      <p className="text-yellow-900"> {curElt[ 1]} </p>
                    </div>
                    <div className="flex flex-row">
                      <div className="hover:text-green-100 hover:bg-green-800 text-green-900 rounded p-2 m-2 cursor-pointer" onClick={() => completeElement( curIndex )}>Complete</div>
                      <div className="hover:text-red-100 hover:bg-red-800 text-red-900 rounded p-2 m-2 cursor-pointer" onClick={() => deleteElement( curIndex )}>Delete</div>
                    </div>
                    
                  </div>
                </div>
                <hr/>
              </>) : (<></>) );
            })
        }
      </div>

     
      <div className="bg-yellow-100 m-4 rounded-lg p-4">
        <h3 className="text-yellow-900 underline font-extrabold">Completed</h3>
        {
          numCompleted() == 0 ?
          <p className="text-yellow-800">No task has been completed yet.</p>
          :
          list.map(
            (curElt, curIndex) => { 
              return (curElt[ 2] === true ? 
              (<>
                <div className="">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-yellow-900 font-bold line-through"> {curElt[ 0]} </p>
                      <p className="text-yellow-900"> {curElt[ 1]} </p>
                    </div>
                    <div className="flex flex-row">
                      <div className="hover:text-red-100 hover:bg-red-800 text-red-900 rounded p-2 m-2 cursor-pointer" onClick={() => deleteElement( curIndex )}>Delete</div>
                    </div>
                    
                  </div>
                </div>
                <hr/>
              </>) : (<></>) );
            })
        }
        </div>

    </div>
   </>
  );
}

export default App;
