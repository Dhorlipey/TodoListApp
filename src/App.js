import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [editedTask, setEditedTask] = useState();
  const [tasklist, setTaskList] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleEditData = (e) => {
    let newData = { ...editedTask, value: e.target.value, edit: editedTask.edit ? true : false }
    setEditedTask(newData)
  };

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
        edit: false
      };

      setTaskList([...tasklist, taskDetails]);
    }
    setTask("")
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id == id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };
  const editClick = () => {
    let filterRecords = [...tasklist].filter(task => task.id !== editedTask.id);
    let updatedObject = [...filterRecords, editedTask];
    setTaskList(updatedObject);
    setEditedTask('');
  }


  return (
    <div className="todo">
      {editedTask && editedTask ?
        <input
          type="text"
          name="text"
          id="text"
          onChange={(e) => handleEditData(e)}
          value={editedTask.value}
        />
        :
        <input
          type="text"
          name="text"
          id="text"
          value={task}
          onChange={(e) => handleChange(e)}
          placeholder="Add task here..."
        />}
      {editedTask && editedTask ?
        <button onClick={editClick}> Save</button> :
        <button className="add-btn" onClick={AddTask}>
          Add
        </button>}
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
              <button className='edit' onClick={(e) => setEditedTask({ ...t, edit: t.edit ? true : false })} >
                edit
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
