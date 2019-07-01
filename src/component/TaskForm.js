import React, {useState} from 'react';
import './TaskForm.css';

function TaskForm({addTask}) {
    const [value, setValue] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                className="input" 
                value={value} 
                placeholder="Add new task"
                onChange={(e) => setValue(e.target.value)} 
            />
            <select>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
            </select>
        </form>
    )
}

export default TaskForm;