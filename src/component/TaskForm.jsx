import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TaskForm.css';

const TaskForm = ({addTask, handleChange, handleSubmit, formValues}) => {
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                className="input-task-text" 
                maxlength="200" 
                autocomplete="off" 
                value={formValues.text} 
                placeholder="Enter task"
                onChange={(e) => handleChange('text', e.target.value)} 
            />
            <select onChange={(e) => handleChange('priority', parseInt(e.target.value))} value={formValues.priority}>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
            </select>            
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={new Date(formValues.deadline)}
                onChange={(e) => handleChange('deadline', e)} 
            />
            <button className="input-task-button" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default TaskForm;