import { BrowserRouter, Route, Routes } from "react-router"
import { HomePage } from "./pages/HomePage"
import { Error404 } from "./pages/Error404"
import TodoPage from "./pages/TodoPage"

export const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="" Component={HomePage} />
                <Route path="todo" Component={TodoPage} />
            </Route>
            <Route path="*" Component={Error404} />
        </Routes>
    </BrowserRouter>
}