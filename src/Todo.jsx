import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todo() {
  const [taskList, setTaskList] = useState([]);
  let [newTask, setNewTask] = useState("");
  let [count, setCount] = useState(0);

  let increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  let decreaseCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  let addTask = () => {
    if (newTask !== "") {
      setTaskList((prevTasks) => {
        return [{ task: newTask, id: uuidv4(), isDone: false }, ...prevTasks];
      });
      setNewTask("");
      increaseCount();
    }
  };

  let updatedTask = (event) => {
    setNewTask(event.target.value);
  };

  let deleteTask = (id) => {
    setTaskList((prevList) => {
      return prevList.filter((todo) => todo.id != id);
    });
  };

  let doneTask = (id) => {
    setTaskList((prevList) => {
      let completedTask;
      let list = prevList.filter((todo) => {
        if (todo.id === id) {
          completedTask = { ...todo, isDone: true };
        } else {
          return todo;
        }
      });
      list.push(completedTask);
      return list;
    });
  };

  let undoTask = (id) => {
    setTaskList((prevList) => {
      let uncompletedTask;
      let list = prevList.filter((todo) => {
        if (todo.id === id) {
          uncompletedTask = { ...todo, isDone: false };
        } else {
          return todo;
        }
      });
      list.unshift(uncompletedTask);
      return list;
    });
  };

  let clearAll = () => {
    setTaskList("");
    setCount(0);
  };

  let doneAllTask = () => {
    setTaskList((prevList) =>
      prevList.map((todo) => {
        return { ...todo, isDone: true };
      })
    );
    setCount(0);
  };

  let checkEnter = (event) => {
    if (event.key === "Enter" && event.target.value != "") {
      addTask();
    }
  };

  let inputStyle = {
    height: "1.5rem",
    padding: "0.5rem",
    borderRadius: "14px",
    fontSize: "1.2rem",
    border: "3px solid black",
  };

  let listItemStyle = {
    fontSize: "calc(20px + 0.4vw)",
    display: "flex",
    justifyContent: "space-between",
    margin: "3vh 0",
    alignItems: "center",
  };

  let listBtnStyle = {
    height: "5vh",
    padding: "0 calc(7px + 0.5vw)",
    fontSize: "calc(10px + 0.4vw)",
    backgroundColor: "#fac000",
    border: "3px solid black",
  };

  let updateAllBtnStyle = {
    height: "5vh",
    padding: "0 calc(7px + 0.5vw)",
    fontSize: "calc(10px + 0.4vw)",
    backgroundColor: "#aa0000",
    color: "white",
    margin: "3vh",
  };

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        style={inputStyle}
        value={newTask}
        onChange={updatedTask}
        onKeyDown={checkEnter}
        placeholder="Enter a task"
      />
      <button
        onClick={() => {
          addTask();
        }}
        style={{ margin: "1rem 0 0 1.5rem", border: "3px solid black" }}
      >
        Add task
      </button>
      <br />
      <br />
      <hr />
      <br />
      {taskList.length ? (
        <>
          <h2>Keep Going!</h2>
          <h3>({count} Tasks Left)</h3>
          <ul style={{ padding: "0", marginBottom: "10vh" }}>
            {taskList.map((todo) => (
              <li key={todo.id} style={{listStyleType:"decimal", fontSize:"calc(20px + 0.4vw)"}}>
                <div style={listItemStyle}>
                  &nbsp;<span style={{ width: "calc(30vw)", textAlign: "left" }}>
                    <span
                      style={
                        todo.isDone
                          ? {
                              textDecoration: "line-through",
                              color: "#ffffffaf",
                              textDecorationColor: "black",
                              textDecorationThickness: "calc(2px + 0.10vw)",
                            }
                          : {}
                      }
                    >
                      {todo.task}
                    </span>
                  </span>
                  <button
                    style={listBtnStyle}
                    onClick={() => {
                      deleteTask(todo.id), todo.isDone ? null : decreaseCount();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      ...listBtnStyle,
                      backgroundColor: todo.isDone ? "green" : "#fac000",
                      color: todo.isDone ? "white" : "black",
                    }}
                    onClick={
                      todo.isDone
                        ? () => {
                            undoTask(todo.id), increaseCount();
                          }
                        : () => {
                            doneTask(todo.id), decreaseCount();
                          }
                    }
                  >
                    {todo.isDone ? "Done ✓" : "Mark as Done"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            style={{ ...listBtnStyle, ...updateAllBtnStyle }}
            onClick={clearAll}
          >
            Delete All
          </button>
          <button
            style={{ ...listBtnStyle, ...updateAllBtnStyle }}
            onClick={doneAllTask}
          >
            Mark All as Done
          </button>
        </>
      ) : (
        <h3>No Remaining Task</h3>
      )}
    </>
  );
}
