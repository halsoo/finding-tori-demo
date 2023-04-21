import react from "react";


function Tooltip({ className, assignRef, children }) {

    return (
        <div 
            className={`${className}`}
            ref={assignRef}
        >
            { children }
        </div>
    )
}

Tooltip.Item = ({ className, item, assignRef }) => {
    const { label, desc, unit } = item

    return (
        <p
            className={`${className}`}
            ref={assignRef}
        >
            <span>{label}:&nbsp;</span>
            <span>{desc}</span>
            { unit && (
                <span>&nbsp;{unit}</span>
            )}
        </p>
    )
}

export default Tooltip