import {useEffect, useState} from 'react';
import {collection, addDoc, Timestamp, doc, getDoc, updateDoc} from 'firebase/firestore'
import db from '../connectDataB';
import '/Users/dizzioga/firebase-todolist/src/styles/editTask.css'


function EditTaskForm(props){
    
    const [title, setTitle] = useState('')
    
    //hide form if id===null
    if(!props.id) return null;
    
    const handleSubmit = (e) => {
        e.preventDefault();

    updateDoc(doc(db, 'tasks', props.id), {title: title})
        .then(r => console.log(r))
        .catch(err => console.log(err));
        
        props.onCancel();
    }

    //get task data from firestorm
    
    useEffect(() => {
        getDoc(doc(db, 'tasks', props.id)).then(doc => {
            setTitle(doc.data().title);
        });
    }, [])
        
    return(
        <form>
            <div className=''>
                <input 
                    type="text" 
                    value={title} 
                    placeholder='Edit your task'
                    onChange={e => setTitle(e.target.value)}
                    className=''
                />
                <button type="submit" className = '' onClick={handleSubmit}>Save</button>
                <button type='submit' className = ''  onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default EditTaskForm;