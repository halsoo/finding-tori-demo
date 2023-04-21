import react from "react";


function SVGWrapper({className, width, heightRatio, containerRef, svgRef, children}) {

    return (
        <div 
            className={`${className}`}
            style={{
                width: width
            }}
            ref={containerRef}
        >
            <div 
                className={`w-full relative`}
                style={{
                    paddingTop: heightRatio
                }}
            >
                <svg
                    className="w-full h-full absolute left-0 top-0"
                    ref={svgRef}
                />
                { children }
            </div>
        </div>
    )
}

export default SVGWrapper