import React, {useState} from 'react';
//import React from 'react';
import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';

function App() {
    const [tasks, setTasks] = useState([
        {
            text: 'Learn something',
            isComplete: false,
            priority: 1
        },
        {
            text: 'Walk the dog',
            isComplete: false,
            priority: 3
        },
        {
            text: 'Eat lunch',
            isComplete: false,
            priority: 2
        },
    ]);
    
    //const [storage, setTasks] = useState();
    
    const renderTasks = () => {
        //tasks.sort((a, b) => a.priority > b.priority).map((task, index) => 
        //return [].concat(tasks).sort((a, b) => a.priority > b.priority).map((task, index) => 
        return tasks.map((task, index) => 
            <Task 
                key={index} 
                index={index} 
                task={task} 
                completeTask={completeTask}
                removeTask={removeTask}
            />             
        );
    }
    
    const addTask = (text) => {
        const newTasks = [...tasks, {text}];
        setTasks(newTasks);
    }
    
    const completeTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].isComplete = true;
        setTasks(newTasks);
    }
    
    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    
    return (
        <div className="app">
            <div className="task-list">
                <TaskForm addTask={addTask} />
                {renderTasks()}
            </div>
        </div>
    )
}

export default App;