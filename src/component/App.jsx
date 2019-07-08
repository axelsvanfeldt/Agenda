import React, {useState, useEffect} from 'react';
import Branding from './Branding';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Task from './Task';
import './App.css';

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
    const addDaysToDate = (days) => {
        const date = new Date();
        const newDate = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        return new Date(newDate);
    }
    
    const defaultValues = {
        form: {
            text: '',
            priority: 1,
            deadline: addDaysToDate(1),
            edit: false
        },
        filters: {
            sort_by: 'priority',
            visible_tasks: 'all'
        },
        tasks: [     
            {
                text: 'Learn something',
                isComplete: false,
                priority: 3,
                deadline: addDaysToDate(7)
            },
            {
                text: 'Walk the dog',
                isComplete: false,
                priority: 3,
                deadline: new Date()
            },              
            {
                text: 'Return VHS tapes',
                isComplete: false,
                priority: 2,
                deadline: addDaysToDate(2)
            },
            {
                text: 'Purchase a new basketball',
                isComplete: false,
                priority: 1,
                deadline: addDaysToDate(5)
            },        
            {
                text: 'Eat lunch',
                isComplete: true,
                priority: 1,
                deadline: new Date()
            },
        ]
    };
    
    const [tasks, setTasks] = useStateWithLocalStorage('tasks', JSON.stringify(defaultValues.tasks));
    const [filters, setFilters] = useStateWithLocalStorage('filters', JSON.stringify(defaultValues.filters));
    const [formValues, setFormValues] = useState(defaultValues.form);
    const taskData = JSON.parse(tasks);
    const filterData = JSON.parse(filters);
    
    const renderTasks = () => {
        let sortedTasks = filterData.sort_by === 'deadline' ? taskData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) : taskData.sort((a, b) => b.priority - a.priority);
        sortedTasks = sortedTasks.map((task, index) => {
            task.overdue = new Date(task.deadline) <= new Date() ? true : false;
            if ((filterData.visible_tasks === 'completed' && !task.isComplete) || (filterData.visible_tasks === 'active' && task.isComplete)) return false;
            return (
                <Task 
                    key={index} 
                    index={index} 
                    task={task} 
                    completeTask={completeTask}
                    prepareEdit={prepareEdit} 
                    removeTask={removeTask} 
                />
            )
        });
        return sortedTasks;
    }
    
    const addTask = () => {
        const newTasks = [...taskData, {
            text: formValues.text,
            isComplete: false,
            priority: formValues.priority,
            deadline: formValues.deadline
        }];
        setTasks(JSON.stringify(newTasks));
    }
    
    const completeTask = index => {
        const newTasks = [...taskData];
        newTasks[index].isComplete = newTasks[index].isComplete ? false : true;
        setTasks(JSON.stringify(newTasks));
    }
    
    const removeTask = index => {
        const newTasks = [...taskData];
        newTasks.splice(index, 1);
        setTasks(JSON.stringify(newTasks));
    }
    
    const editTask = () => {
        console.log("edit");
        const newTasks = [...taskData];
        newTasks[formValues.edit] = {
            text: formValues.text,
            isComplete: newTasks[formValues.edit].isComplete,
            priority: formValues.priority,
            deadline: formValues.deadline
        };
        setTasks(JSON.stringify(newTasks));
    }
    
    const prepareEdit = index => {
        setFormValues({
            text: taskData[index].text,
            priority: taskData[index].priority,
            deadline: taskData[index].deadline,
            edit: index
        });
    }    
    
    const handleFormSubmit = e => {
        console.log(formValues.edit);
        e.preventDefault();
        if (!formValues.text) return;
        formValues.edit ? editTask() : addTask();
        setFormValues(defaultValues.form);
    }
    
    const handleFormChange = (input, value) => {
        const data = {
            text: formValues.text,
            priority: formValues.priority,
            deadline: formValues.deadline,
            edit: formValues.edit
        }
        data[input] = value;
        setFormValues(data);
    }
    
    const handleFilterChange = (filter, value) => {
        const data = {
            sort_by: filterData.sort_by,
            visible_tasks: filterData.visible_tasks
        };
        //value = filter === 'sort_by' ? value : JSON.parse(value);
        data[filter] = value;
        setFilters(JSON.stringify(data));
    } 
    
    return (
        <div className="app">
            <div className="app-content">
                <Branding />
                <TaskForm 
                    addTask={addTask} 
                    handleChange={handleFormChange} 
                    handleSubmit={handleFormSubmit} 
                    formValues={formValues} 
                />
                <TaskList 
                    renderTasks={renderTasks} 
                    handleFilterChange={handleFilterChange} 
                    filters={filterData} 
                />
                <a href="https://codeant.se" target="_blank">codeant.se</a>
            </div>
        </div>
    )
}

export default App;