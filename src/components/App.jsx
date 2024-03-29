import React, {useState} from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Task from './Task';
import datetime from '../logic/datetime';
import useLocalStorageState from '../hooks/useLocalStorageState';
import './App.css';

const App = () => {
    const defaultValues = {
        form: {
            text: '',
            priority: 1,
            deadline: datetime.getDate(1),
            edit: false
        },
        filters: {
            sort_by: 'priority',
            visible_tasks: 'all'
        },
        tasks: [     
            {
                index: 0,
                text: 'Learn something',
                isComplete: false,
                priority: 3,
                deadline: datetime.getDate(7)
            },{
                index: 1,
                text: 'Walk the dog',
                isComplete: false,
                priority: 3,
                deadline: datetime.getDate()
            },{
                index: 2,
                text: 'Return VHS tapes',
                isComplete: false,
                priority: 2,
                deadline: datetime.getDate(2)
            },{
                index: 3,
                text: 'Purchase a new basketball',
                isComplete: false,
                priority: 1,
                deadline: datetime.getDate(5)
            },{
                index: 4,
                text: 'Eat lunch',
                isComplete: true,
                priority: 1,
                deadline: datetime.getDate()
            },
        ]
    };
    
    const [tasks, setTasks] = useLocalStorageState('tasks', JSON.stringify(defaultValues.tasks));
    const [filters, setFilters] = useLocalStorageState('filters', JSON.stringify(defaultValues.filters));
    const [formValues, setFormValues] = useState(defaultValues.form);
    const taskData = JSON.parse(tasks);
    const filterData = JSON.parse(filters);
    
    const filterTasks = () => {
        let sortedTasks = [...taskData];
        if (filterData.sort_by === 'deadline') {
            sortedTasks = sortedTasks.sort((a, b) => {
                const diff = new Date(a.deadline) - new Date(b.deadline);
                return diff ? diff : b.priority - a.priority;
            });
        }
        else {
            sortedTasks = sortedTasks.sort((a, b) => {
                const diff = b.priority - a.priority;
                return diff ? diff : new Date(a.deadline) - new Date(b.deadline);
            });
        }
        const filteredTasks = sortedTasks.filter((task) => !((filterData.visible_tasks === 'completed' && !task.isComplete) || (filterData.visible_tasks === 'active' && task.isComplete)));
        return filteredTasks;
    }
    
    const renderTasks = () => {
        const filteredTasks = filterTasks().map(task => 
            <Task 
                key={task.index} 
                task={task} 
                completeTask={completeTask}
                prepareEdit={prepareEdit} 
                removeTask={removeTask} 
            />
        );
        const taskCount = <div key="task-count" className="task-count">Showing {filteredTasks.length} out of {taskData.length} tasks.</div>;
        filteredTasks.unshift(taskCount);
        return filteredTasks;
    }
    
    const addTask = () => {
        const newTasks = [...taskData, {
            index: taskData.length,
            text: formValues.text,
            isComplete: false,
            priority: formValues.priority,
            deadline: datetime.convertDate(formValues.deadline)
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
        data[filter] = value;
        setFilters(JSON.stringify(data));
    } 
    
    return (
        <div className="app">
            <div className="app-content">
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
            </div>
        </div>
    )
}

export default App;