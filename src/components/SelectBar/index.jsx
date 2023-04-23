import react, { useState, useEffect, useRef } from "react"
import { v4 as uuid } from 'uuid'

import { tori2Color, ter2Region, } from '../../scripts'

function SelctBar({ className, defaultValue, itemList, selectedColor, onClick }) {
    const [selected, setSelected] = useState('gg') // default value

    const onLocalClick = item => e => {
        setSelected(item)
        onClick(item)(e)
    }

    return (
        <div 
            className={`w-full flex flex-row flex-wrap gap-x-12 gap-y-8 ${className}`}
        >
            { itemList.map(i => {
                const isSelected = i === selected && true
                return (
                    <button 
                        className="px-8 py-2 text-md border border-1 rounded-4"
                        style={{
                            color: isSelected ? selectedColor : 'black',
                            fontWeight: isSelected ? 'bold' : 'normal',
                            borderColor: isSelected ? selectedColor : 'black'
                        }}
                        onClick={onLocalClick(i)}
                        key={uuid()}
                    >
                        {ter2Region[i]}
                    </button>
                )
            })}
        </div>
    )
}

export default SelctBar