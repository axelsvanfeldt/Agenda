import React from 'react';
import TaskFilters from './TaskFilters';
import './TaskList.css';

const TaskList = ({renderTasks, handleFilterChange, filters}) => {
    return(
        <div className="task-list">
            <TaskFilters handleChange={handleFilterChange} filters={filters} />
            {renderTasks()}
            <a href="https://codeant.se" rel="noopener noreferrer" target="_blank">Hosted by codeant.se</a>
        </div>
    )
}

export default TaskList;