import { Button } from "react-bootstrap"
import { Link } from "react-router"

export const HomePage = () => {
    return <div className="d-flex flex-column align-items-center mt-3">
        <h3>Navigations</h3>
        <div className="flex gap-3 mt-3">
            <Link to={"/todo"}><Button variant="success" size="sm">Todo List</Button></Link>
        </div>
    </div>
}