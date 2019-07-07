import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TaskForm.css';

const TaskForm = ({addTask, handleChange, handleSubmit, formValues}) => {
    return(
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => handleChange('priority', parseInt(e.target.value))} value={formValues.priority}>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
            </select>
            <input
                type="text" 
                id="input-task-text" 
                value={formValues.text} 
                placeholder="Add new task"
                onChange={(e) => handleChange('text', e.target.value)} 
            />
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={new Date(formValues.deadline)}
                onChange={(e) => handleChange('deadline', e)} 
            />
            <button id="input-task-button" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default TaskForm;