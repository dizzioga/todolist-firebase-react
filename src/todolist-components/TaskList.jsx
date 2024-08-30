import { useState } from 'react'
import {collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import db from '../connectDataB';
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import '/Users/dizzioga/firebase-todolist/src/styles/taskBar.css';


function TaskList(props) {

  const [tasks, setTasks] = useState([]);

  useEffect( () => {
    const tasksColRef = query(collection(db, 'tasks'), orderBy('created', 'asc'));
    onSnapshot(tasksColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
      })));
    });
  }, []);
  
  const onDeleteTask = (id) => {
    deleteDoc(doc(db, 'tasks', id))
    .then(r => console.log(r))
    .catch(err => console.log(err));
  };
    
  const onToggleDone = (id, newStatus) => {

    updateDoc(doc(db, 'tasks', id), {completed: newStatus})
      .then(r => console.log(r))
      .catch(err => console.log(err));
  };

  return (
    <>
      <div>
          <ul className='list'>
            {tasks.map(task => (
              
            <div className='mainDiv'>
              <li key={task.id} class="taskBar">
                
                {task.completed ? <s>{task.title}</s> : task.title}
              
              </li>
                
                  <button className = 'btnTask' onClick={() => props.onEdit(task.id)}>{<BiSolidEdit />}</button>
                  <button className = 'btnTask' onClick={() => onDeleteTask(task.id)}>{<MdDeleteForever />}</button>
                  <button className = 'btnTask' onClick={() => onToggleDone(task.id, !task.completed)}>{<MdFileDownloadDone/>}</button>
                
            </div>
            ))}
            </ul>
      </div>
    </>
  )
}

export default TaskList;