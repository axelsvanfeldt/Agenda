import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt, faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import './Task.css';

const Task = ({task, completeTask, prepareEdit, removeTask, togglePriority}) => {
    const completeIcon = task.isComplete ? faCheckSquare : faSquare;
    const completeClass = task.isComplete ? 'task task-complete' : 'task';
    const overdueClass = task.overdue ? 'task-overdue' : '';
    const prioText = task.priority === 1 ? 'Low' : task.priority === 2 ? 'Medium' : 'High';
    
    return(
        <div className={`${completeClass} ${overdueClass}`}>
            <div className="task-complete-icons">
                <FontAwesomeIcon icon={completeIcon} onClick={() => completeTask(task.index)} />
            </div>
            <div className={`task-priority task-priority-${task.priority}`}>{prioText}</div>
            <div className="task-deadline">{task.deadline}</div>
            <div className="task-text">{task.text}</div>
            <div className="task-alter-icons">
                <FontAwesomeIcon icon={faEdit} onClick={() => prepareEdit(task.index)} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeTask(task.index)} />
            </div>
        </div>
    )
}

export default Task;