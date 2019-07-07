import React from 'react';
import TaskFilters from './TaskFilters';
import './TaskList.css';

const TaskList = ({renderTasks, handleFilterChange, filters}) => {
    return(
        <div className="task-list">
            <TaskFilters handleChange={handleFilterChange} filters={filters} />
            {renderTasks()}
        </div>
    )
}

export default TaskList;