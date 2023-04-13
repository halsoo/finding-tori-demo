import React from "react"
import { createRoot } from "react-dom/client"

import './styles/index.css'

function App() {
    return (
        <div className="text-pick-900 text-5xl font-bold">
            {`Demo`}
        </div>
    )
}

const root = createRoot(document.getElementById('App'));
root.render(<App/>)
