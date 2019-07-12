import React from 'react';
import RadioButton from './RadioButton';
import './TaskFilters.css';

const TaskFilters = ({handleChange, filters}) => {
    return(
        <div className="task-filters">
            <RadioButton 
                group="visible_tasks" 
                label="Show" 
                options={['All', 'Active', 'Completed']} 
                selected={filters.visible_tasks} 
                onClick={handleChange} 
            />             
            <RadioButton 
                group="sort_by" 
                label="Sort by" 
                options={['Deadline', 'Priority']} 
                selected={filters.sort_by} 
                onClick={handleChange} 
            />         
        </div>
    )
}

export default TaskFilters;