import {useState} from 'react'
import CreateTaskForm from './todolist-components/createTaskForm';
import TaskList from './todolist-components/TaskList';
import EditTaskForm from './todolist-components/EditTaskForm'
import './App.css'

function App(){

    const [editTaskId, setEditTaskId] = useState(null);


    const onEdit = (id) => {
        console.log(id);
        setEditTaskId(id);
    }

    const onEditCancel = () => {
        setEditTaskId(null);
    }

    return (
        <>

        <br />
        <br />
        
            <div className='todolist'>

                <CreateTaskForm />
                
                <TaskList onEdit={onEdit}/>
                
                {editTaskId && <EditTaskForm id={editTaskId} onCancel={onEditCancel}/>}

            </div>
        </>
    );
}
export default App;