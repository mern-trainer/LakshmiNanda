import { useState } from "react"
import { Button, Stack } from "react-bootstrap"

const TodoPage = () => {

    const [task, setTask] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [todos, setTodos] = useState([])

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
        setTask("")
    }

    const handleDeleteTodo = (delete_id) => {
        const newTodos = todos.filter((todo) => todo.id != delete_id);
        setTodos(newTodos)
    }

    return <div className="d-flex justify-content-center mt-2">
        <Stack gap={1} className="mt-2 w-100 px-2" style={{ maxWidth: "500px" }}>
            <label htmlFor="task">Enter Todo:</label>
            <input id="task" placeholder="Example: Buy groceries" onChange={handleChange} value={task} type="text" className="p-2 rounded outline-none border border-2" />
            <span>{errMessage}</span>
            <Button onClick={handleAddTask} variant="secondary">Add Task</Button>

            <Stack gap={2}>
                {
                    todos.length > 0 ? todos.map((todo) => {
                        return <div key={todo.id} className="border d-flex align-items-center w-100 p-2 justify-content-between border-2 border-secondary rounded">
                            <div>
                                <div>Task: {todo.task}</div>
                                <div>Status: {todo.is_completed ? "Completed" : "Pending"}</div>
                            </div>
                            <div>
                                <Button onClick={() => handleDeleteTodo(todo.id)} variant="danger" size="sm">Delete</Button>
                            </div>
                        </div>
                    }) : <div className="text-center mt-3">No Tasks Available</div>
                }
            </Stack>
        </Stack>
    </div>
}

export default TodoPage