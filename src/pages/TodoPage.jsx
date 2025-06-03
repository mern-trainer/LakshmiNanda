import { useState } from "react"
import { Button, Stack } from "react-bootstrap"

const updateTodos = (todos) => {
    localStorage.setItem("TODO_LIST", JSON.stringify(todos))
}

const getTodos = () => {
    const todos = localStorage.getItem("TODO_LIST")
    return todos ? JSON.parse(todos) : []
}

const TodoPage = () => {

    const [task, setTask] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [todos, setTodos] = useState(getTodos())

    const handleRemoveErrorMessage = () => {
        if (errMessage != "") {
            return setErrMessage("")
        }
    }

    const handleChange = (event) => {
        setTask(event.target.value)
        handleRemoveErrorMessage()
    }

    const handleAddTask = () => {
        if (task == "") {
            return setErrMessage("Task cannot be empty")
        }
        const task_index = todos.findIndex((todo) => todo.task.toLowerCase() == task.toLowerCase())
        if (task_index != -1) {
            return setErrMessage("Task already exists")
        }
        const newTaskObj = {
            id: crypto.randomUUID(),
            task: task,
            is_completed: false
        }
        setTodos([newTaskObj, ...todos])
        updateTodos([newTaskObj,...todos])
        setTask("")
    }

    const handleDeleteTodo = (delete_id) => {
        const newTodos = todos.filter((todo) => todo.id != delete_id);
        setTodos(newTodos)
        updateTodos(newTodos)
    }

    const handleCompleted = (completed_id) => {
        const completedTaskIndex = todos.findIndex((todo) => todo.id == completed_id);
        if (completedTaskIndex == -1) {
            return;
        };
        const mappedTodos = todos.map((todo) => {
            if (todo.id == completed_id) {
                return {...todo, is_completed: !todo.is_completed}
            }
            return todo
        })
        setTodos(mappedTodos)
        updateTodos(mappedTodos)
    }

    return <div className="d-flex justify-content-center mt-2">
        <Stack gap={1} className="mt-2 w-100 px-2" style={{ maxWidth: "500px" }}>
            <label htmlFor="task">Enter Todo:</label>
            <input id="task" placeholder="Example: Buy groceries" onChange={handleChange} value={task} type="text" className="p-2 rounded outline-none border border-2" />
            <span>{errMessage}</span>
            <Button onClick={handleAddTask} variant="secondary">Add Task</Button>

            <Stack gap={2}>

                <h3>Pending Tasks - ({todos.filter(todo => !todo.is_completed).length})</h3>
                {
                    todos.length > 0 ? todos.filter(todo => !todo.is_completed).map((todo) => {
                        return <div key={todo.id} className="border d-flex align-items-center w-100 p-2 justify-content-between border-2 border-secondary rounded">
                            <div>
                                <div>Task: {todo.task}</div>
                                <div>Status: {todo.is_completed ? "Completed" : "Pending"}</div>
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                {!todo.is_completed && <Button onClick={() => handleDeleteTodo(todo.id)} variant="danger" size="sm">Delete</Button>}
                                <Button onClick={() => handleCompleted(todo.id)} variant={todo.is_completed ? "danger" : "success"} size="sm">{todo.is_completed ? "Mark Pending" : "Mark Completed"}</Button>
                            </div>
                        </div>
                    }) : <div className="mt-3 text-center">No tasks added</div>
                }

                <h3>Completed Tasks - ({todos.filter(todo => todo.is_completed).length})</h3>
                {
                    todos.length > 0 ? todos.filter(todo => todo.is_completed).map((todo) => {
                        return <div key={todo.id} className="border d-flex align-items-center w-100 p-2 justify-content-between border-2 border-secondary rounded">
                            <div>
                                <div>Task: {todo.task}</div>
                                <div>Status: {todo.is_completed ? "Completed" : "Pending"}</div>
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                {!todo.is_completed && <Button onClick={() => handleDeleteTodo(todo.id)} variant="danger" size="sm">Delete</Button>}
                                <Button onClick={() => handleCompleted(todo.id)} variant={todo.is_completed ? "danger" : "success"} size="sm">{todo.is_completed ? "Mark Pending" : "Mark Completed"}</Button>
                            </div>
                        </div>
                    }) : <div className="mt-3 text-center">No tasks added</div>
                }
            </Stack>
        </Stack>
    </div>
}

export default TodoPage