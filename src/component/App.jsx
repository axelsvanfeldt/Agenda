import React, {useState, useEffect} from 'react';
import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';

const useStateWithLocalStorage = (key, defaultVal) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || defaultVal
    );

    useEffect(() => {
        localStorage.setItem(key, value);
    });

    return [value, setValue];
}

const App = () => {
    const [tasks, setTasks] = useStateWithLocalStorage('tasks', 
        JSON.stringify([
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
        ])
    );
    
    const taskObjects = JSON.parse(tasks);
    
    const renderTasks = () => {
        taskObjects.sort((a, b) => b.priority - a.priority);
        return taskObjects.map((task, index) => (
            <Task 
                key={index} 
                index={index} 
                task={task} 
                completeTask={completeTask}
                removeTask={removeTask}
            />             
        ));
    }
    
    const addTask = (data) => {
        const newTasks = [...taskObjects, {
            text: data.text,
            isComplete: false,
            priority: data.priority
        }];
        setTasks(JSON.stringify(newTasks));
    }
    
    const completeTask = index => {
        const newTasks = [...taskObjects];
        newTasks[index].isComplete = true;
        setTasks(JSON.stringify(newTasks));
    }
    
    const removeTask = index => {
        const newTasks = [...taskObjects];
        newTasks.splice(index, 1);
        setTasks(JSON.stringify(newTasks));
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