import React from 'react';
import './Task.css';

function Task({task, index, completeTask, removeTask}) {
    return(
        <div className={task.isComplete ? 'task task-complete' : 'task'}>
            <div className={`task-priority task-priority-${task.priority}`}>{task.priority}</div>
            <div>{task.text}</div>
            <div>
                <button onClick={() => completeTask(index)}>Complete</button>
                <button onClick={() => completeTask(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>Remove</button>
            </div>
        </div>
    )
}

export default Task;