import { useState } from "react"

export const HomePage = () => {
    const [counter, setCounter] = useState(0)
    return <div>
        <div>{counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Inc</button>
    </div>
}