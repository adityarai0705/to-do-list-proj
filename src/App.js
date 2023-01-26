import React, { useEffect, useState } from "react";
import Image from "./Image";
import axios from 'axios';
import { useMemo } from "react";


function App() {
  const [ primaryToDo, setToDo] = useState( undefined);
  const [ primaryDate, setDate] = useState();
  const [ primaryImage, setImage] = useState();
  const [ list, setList] = useState([]);
  const [ temp, setTemp] = useState([]);
  const [ quote, setQuote] = useState( "Loading...");

  const updateInput = (event) => {
    setToDo( event.target.value);
  };



  function GetDate(){
    const separator = '-';
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`;
  }

  const SortDue = () => {
    let newlist = list;
    let SortListDue = newlist.sort((a, b) => new Date(...a[1].split('/').reverse()) - new Date(...b[1].split('/').reverse()));
    setList( SortListDue);
    setDate( null);
  }

  const SortAdd = () => {
    let newlist = list;
    let SortListAdd = newlist.sort((a, b) => new Date(...a[1].split('/').reverse()) - new Date(...b[1].split('/').reverse()));
    setList( SortListAdd);
    setDate( null);
  }



  function updateImage(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const updateDate = (event) => {
    setDate( event.target.value);
    // event.target.value => value of event ( passed into function as it is called within an input field)
  };

  const addElement = () => {
    console.log( "kaam kiya");
    setList( (curList) => {
      return [...curList, [primaryToDo, primaryDate, false, primaryImage, GetDate()]];
    });
    console.log( primaryDate);
    console.log( GetDate());
    setToDo(undefined);
    setImage(undefined);
    setDate(undefined);
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
      const response = await axios.get("https://favqs.com/api/qotd");
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
      <div className="flex flex-col justify-center m-4 lg:flex-row">
        <input className='m-2 p-2 rounded-lg border-2' placeholder='Enter new task' onChange={updateInput} value={primaryToDo}></input>
        <input type={'date'} className='m-2 p-2 rounded-lg border-2' onChange={updateDate}></input>
        <div className='m-2 p-2 border border-yellow-900 text-yellow-900 rounded-lg'>
        <p className="font-bold">Upload Image</p>
        <input type={"file"} accept={"image/png, image/jpeg"} className='rounded-lg' onChange={updateImage}></input> 
        </div>
        {/* onChange calls a jsx function whenever the text inside the input field is changed */}

        <button className="m-2 p-2 bg-green-500 rounded-lg text-green-100 hover:bg-green-900 hover:text-yellow-400 cursor-pointer w-40" onClick={addElement}>Add Task</button>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center">
       <button onClick={SortDue} className='bg-teal-700 hover:bg-teal-900 text-teal-100 w-80 h-30 m-2 md:mx-20 md:mx-40 rounded-md p-2' style={{'width':'7cm'}}>Sort according to due date</button>
       <button onClick={SortAdd} className='bg-teal-700 hover:bg-teal-900 text-teal-100 w-80 h-30 m-2 md:mx-20 md:mx-40 rounded-md p-2' style={{'width':'7cm'}}>Sort according to date created</button>
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
                <div className="bg-teal-200 p-2 rounded-lg">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-yellow-900 font-bold max-w-[50%]"> { curElt[ 0] == undefined ? 'No Title' : curElt[ 0]} </p>
                      <p className="text-yellow-900"> {curElt[ 1] == undefined ? 'No Date' : curElt[ 1]} </p>
                      <Image image = {curElt[ 3]} />
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="hover:text-green-100 hover:bg-green-800 text-green-900 rounded p-2 m-2 cursor-pointer h-10" onClick={() => completeElement( curIndex )}>Complete</div>
                      <div className="hover:text-red-100 hover:bg-red-800 text-red-900 rounded p-2 m-2 cursor-pointer h-10" onClick={() => deleteElement( curIndex )}>Delete</div>
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
                <div className="bg-teal-200 p-2 rounded-lg">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-yellow-900 font-bold line-through max-w-[50%]">  { curElt[ 0] == undefined ? 'No Title' : curElt[ 0]} </p>
                      <p className="text-yellow-900"> {curElt[ 1] == undefined ? 'No Date' : curElt[ 1]} </p>
                      <Image image = {curElt[ 3]} />
                    </div>
                    <div className="flex flex-row">
                      <div className="hover:text-red-100 hover:bg-red-800 text-red-900 rounded p-2 m-2 cursor-pointer h-10" onClick={() => deleteElement( curIndex )}>Delete</div>
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



