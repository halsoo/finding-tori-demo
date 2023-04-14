import React from "react"
import { createRoot } from "react-dom/client"

import PCAPlot from './components/PCAPlot'

import './styles/index.css'

function App() {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="mb-[50px] text-pick-900 text-5xl font-bold">
                {`Finding Tori`}
            </p>

            <PCAPlot/>
        </div>
    )
}

const root = createRoot(document.getElementById('App'));
root.render(<App/>)
