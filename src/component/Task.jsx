import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt, faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import './Task.css';

const Task = ({task, index, completeTask, prepareEdit, removeTask, togglePriority}) => {
    const getPriorityText = (prio) => {
        if (prio === 1) return "Low";
        else if (prio === 2) return "Medium";
        else if (prio === 3) return "High";
    }
    
    const completeIcon = task.isComplete ? faCheckSquare : faSquare;
    const completeClass = task.isComplete ? 'task task-complete' : 'task';
    const overdueClass = task.overdue ? 'task-overdue' : '';
    
    return(
        <div className={`${completeClass} ${overdueClass}`}>
            <div className="task-complete-icons">
                <FontAwesomeIcon icon={completeIcon} onClick={() => completeTask(index)} />
            </div>
            <div className={`task-priority task-priority-${task.priority}`}>{getPriorityText(task.priority)}</div>
            <div className="task-deadline">{task.deadline.toString().slice(0,10)}</div>
            <div className="task-text">{task.text}</div>
            <div className="task-alter-icons">
                <FontAwesomeIcon icon={faEdit} onClick={() => prepareEdit(index)} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeTask(index)} />
            </div>
        </div>
    )
}

export default Task;