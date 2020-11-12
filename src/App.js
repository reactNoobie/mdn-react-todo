import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name) {
    // console.log('addTask', name);
    const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    // console.log(tasks.find(task => task.id === id));
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    // console.log('editTask ', id, newName);
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  }

  const filterButtons = FILTER_NAMES.map(filterName => (
    <FilterButton
      key={filterName}
      title={filterName}
      setFilter={setFilter}
      isPressed={filterName === filter}
    />
  ));

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task =>
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  );

  // const numberOfTasks = tasks.reduce((accum, task) => {
  //   // console.log('task -> ', task, 'accum -> ', accum);
  //   if (!task.completed) {
  //     return accum + 1;
  //   }
  //   return accum;
  // }, 0);
  const numberOfTasks = taskList.length;
  const taskNoun = numberOfTasks > 1 ? 'tasks' : 'task';

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 id="list-heading">
        {numberOfTasks} {taskNoun} remaining.
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
