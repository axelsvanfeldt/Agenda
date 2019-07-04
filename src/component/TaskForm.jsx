import React, {useState} from 'react';
import './TaskForm.css';

function TaskForm({addTask}) {
    const [value, setValue] = useState({
        text: '',
        priority: 1
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.text) return;
        addTask(value);
        setValue('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                className="input" 
                value={value.text} 
                placeholder="Add new task"
                onChange={(e) => {
                    setValue({
                        text: e.target.value,
                        priority: value.priority
                    })
                }} 
            />
            <select onChange={(e) => {
                setValue({
                    text: value.text,
                    priority: e.target.value,
                })
            }}>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
            </select>
        </form>
    )
}

export default TaskForm;