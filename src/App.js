import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [ primaryToDo, setToDo] = useState( "");
  const [ primaryDate, setDate] = useState();
  const [ list, setList] = useState([]);
  const [ quote, setQuote] = useState( "Loading...");
  // [] makes the list an array

  // function timeout(delay: number) {
  //   return new Promise( res => setTimeout(res, delay) );
  // }

  const updateInput = (event) => {
    setToDo( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  const updateDate = (event) => {
    setDate( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  // const SortList = () => {
  //   // const sorted = [...list].sort((a, b) => {
  //   //   return (new Date(b[1].split('/')) - new Date(a[1].split('/')));
  //   // });
  //   // console.log( sorted);
  //   // setList(sorted);
  //   setList( (curList) => {
  //     return (
  //       [...curList].sort( a, b) => {
  //         return ( new Date( b[ 1].split( '/')) - new Date( a[ 1].split( '/')));
  //       }
  //     );
  //   });
  // }

  const addElement = () => {
    console.log( "kaam kiya");
    setList( (curList) => {
      return [...curList, [primaryToDo, primaryDate, false]];
    });
    setToDo("");
    // const timerId = setTimeout(() => {
    //   console.log( list);
    // }, 2000);
    
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

  async function fetchData() {
    try {
      const response = await axios.get("https://favqs.com/api/qotd")
      // setQuote(response.data)
      // console.log( response.data);
      const obj = response.data;
      setQuote( obj[ 'quote'][ 'body']);
      console.log( quote);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
   <>
    <div className="text-6xl font-extrabold drop-shadow-2xl bg-teal-100 text-blue-900 text-center cursor-default select-none">To-do List</div>
    <div className="text-2xl p-10 md:px-20 lg:px-40 bg-teal-300"><p>{quote}</p></div>
    <div className='min-h-screen w-screen bg-teal-200 flex flex-col select-none'>
      <div className="flex flex-col justify-center m-4 md:flex-row">
        <input className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateInput} value={primaryToDo}></input>
        <input type={'date'} className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateDate}></input>
        {/* onChange calls a jsx function whenever the text inside the input field is changed */}

        <button className="m-2 p-2 bg-green-500 rounded-lg text-green-100 hover:bg-green-900 hover:text-yellow-400 cursor-pointer w-40" onClick={addElement}>Add Task</button>
      </div>

      <div className="bg-teal-100 m-4 rounded-lg p-4 cursor-default md:mx-20 lg:mx-40 border border-yellow-900">
        <h3 className="text-yellow-900 underline font-extrabold">Pending Tasks</h3>
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
                      <p className="text-yellow-900 font-bold max-w-[50%]"> {curElt[ 0]} </p>
                      <p className="text-yellow-900"> {curElt[ 1]} </p>
                    </div>
                    <div className="flex flex-col md:flex-row">
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


      <div className="bg-teal-100 m-4 rounded-lg p-4 cursor-default md:mx-20 lg:mx-40 border border-yellow-900">
        <h3 className="text-yellow-900 underline font-extrabold">Completed Tasks</h3>
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
                      <p className="text-yellow-900 font-bold line-through max-w-[50%]"> {curElt[ 0]} </p>
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



