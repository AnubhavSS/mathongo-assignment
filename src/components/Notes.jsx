"use client";
import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

const Notes = ({ id, playerTime, getTime,jumpToPoint }) => {
  const [html, setHtml] = useState("");
  const [addNote, setaddNote] = useState(false);
  const [info, setinfo] = useState([]);
  const [editVal, seteditVal] = useState()
const [edit, setedit] = useState(false)
  function onChange(e) {
    setHtml(e.target.value);
  }

  //converting date to required format
  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate.replace(",", "");
  }


  //Saving Data to local storage
  const handleSave = () => {
    const data = {
      date: formatDate(new Date()),
      time: Number(playerTime),
      text: html,
    };

    info.push(data);
    setinfo(info);
setHtml("")
    localStorage.setItem(id, JSON.stringify(info));
    setaddNote(!addNote);
  };

// Deleting the note
  const handleDelete=(val)=>{
    
      const  newArr=JSON.parse(localStorage.getItem(id)).filter(item=> Math.floor(item.time)!==Math.floor(val))
      // console.log(newArr,val)
    setinfo(newArr)
  localStorage.setItem(id, JSON.stringify(newArr));
  }

//Editing the note
  const handleEdit=(val)=>{
setaddNote(true)
setedit(true)
seteditVal(val)
setHtml(val.text)
  }

//Saving the edited info
const editSave=()=>{

  setinfo(JSON.parse(localStorage.getItem(id)))
const i = JSON.parse(localStorage.getItem(id)).findIndex(x => x.time === editVal.time)

const data={
  date:editVal.date,
  time: editVal.time,
  text:html
}
// info[i]=data;
setinfo([...info,info[i]=data])
localStorage.setItem(id, JSON.stringify(info));
setedit(false)
setaddNote(false)
}

  return (
    <div className="notesContain">
      {/* My Notes section */}
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-[18px]">My Notes</h1>
          <p className="font-normal text-[14px] text-slate-500 mb-4">
            All your notes at a single place. Click on any note to go to
            specific timestamp in the video.
          </p>
        </div>

        {/* Add Note BUtton */}
        <button
          className="addNote"
          onClick={() => {
            setaddNote(!addNote);
            getTime();
          }}
        >
          + Add new note
        </button>
      </div>
      <hr />

      {/* Note Editor */}

      {addNote && (
        <>
          <Editor value={html} onChange={onChange} />
       { edit?  <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded-full"
            onClick={editSave}
          >
            Edit
          </button>:  <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded-full"
            onClick={handleSave}
          >
            Save
          </button>}
        </>
      )}

      {/* Notes */}
      {typeof window === 'undefined' ?"null":localStorage.getItem(id) &&
        JSON.parse(localStorage.getItem(id)).map((item, index) => {
          return (
            <div key={index} className="my-5">
              <h1 className="noteDate">{item.date}</h1>
              <div className="noteTime" onClick={()=>jumpToPoint(item?.time)}>
                Timestamp:{" "}
                <span className="MinSec">
                  {Math.floor(item?.time / 60)}min {Math.floor(item?.time % 60)}
                  sec
                </span>
              </div>
              <div className="noteText"> {item.text}</div>

{/* Delete and Edit Button */}
              <div className="flex gap-3 justify-end">
                <button className="noteBtn" onClick={()=>handleDelete(item.time)}>Delete note</button>
                <button className="noteBtn" onClick={()=>handleEdit(item)}>Edit note</button>
              </div>
            </div>
          );
        })}
      <div></div>
    </div>
  );
};

export default Notes;
