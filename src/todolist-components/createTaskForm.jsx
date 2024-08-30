import {useState} from 'react';
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import db from '../connectDataB';
import '/Users/dizzioga/firebase-todolist/src/styles/inputBar.css'



function CreateTaskForm(){

    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        
        addDoc(collection(db, 'tasks'), {
            title, 
            created: Timestamp.now()
        }).then(r => console.log(r))
          .catch(err => console.log(err));
        
        setTitle('');
    }

    return(
        <div className='container'>
            <form className='form'>    
                <input 
                    type="text" 
                    value={title} 
                    placeholder='Enter your task'
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>Add Task</button> 
             </form>
        </div>
    );
}
export default CreateTaskForm;