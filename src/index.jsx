import React from "react"
import { v4 as uuid } from 'uuid'
import { createRoot } from "react-dom/client"

import TerPlot from "./components/TerPlot"
import ToriPlot from './components/ToriPlot'

import { tori2Color } from './scripts'

import './styles/index.css'

function App() {
    return (
        <div className="w-[70vw] max-w-[1920px] mx-auto my-48 flex flex-col justify-center items-center gap-y-48">

            <div className="w-full">
                <h1 className="mb-32 text-letter-bold text-4xl font-bold text-center">
                    {`Finding Tori`}
                </h1>

                <div className="text-letter-mid text-lg leading-1.7 flex flex-col gap-y-12">
                    <h2 className="H2">
                        Intro
                    </h2>
                    <p>
                        {`This page is a web demo for the ‘Finding Tori’ paper that shows 2D UMAP visualization of embeddings for 10,798 audio tracks from the <Anthology of Korean Traditional Folksongs>. using a CNN encoder trained by self-supervised learning, without any fine-tuning on labeled annotation.`}
                    </p>
                    <p>
                        {`Move your mouse to check information about each audio track and click on it to be redirected to a link where you can directly listen to the audio. You can also zoom in or zoom out on the visualization using the scroll wheel, or pan by dragging the mouse.`}
                    </p>
                    <p>
                        {`<Although one of the authors annotated the ‘tori’ label for performance evaluation purposes, the potential ambiguity or ongoing debates surrounding the classification of a tori for a specific song suggests that the label may be subject to differing opinions.>`}
                    </p>
                </div>

            </div>

            <div className="w-full text-letter-mid text-lg leading-1.7 flex flex-col gap-y-12">
                <h2 className="H2">
                    Tori
                </h2>

                <div className="ml-8 flex flex-row gap-x-28 flex-wrap">
                    { Object.keys(tori2Color).map(tori => {
                        return (
                            <div 
                                className="flex flex-row items-center gap-x-4"
                                key={uuid()}
                            >
                                <div 
                                    className="w-16 h-16 rounded-half"
                                    style={{
                                        backgroundColor: tori2Color[tori]
                                    }}
                                />
                                <p>{tori === 'false' ? 'none' : tori}</p>
                            </div>
                        )
                    })}
                </div>

                <ToriPlot/>
            </div>

            <div className="w-full text-letter-mid text-lg leading-1.7 flex flex-col gap-y-12">
                <h2 className="H2">
                    Regions
                </h2>
            
                <TerPlot/>
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById('App'));
root.render(<App/>)
