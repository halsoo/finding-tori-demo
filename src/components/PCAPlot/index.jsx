import react, { useEffect } from "react";
import * as d3 from 'd3'

import { scale, hslToHex } from '../../scripts'
import data from '../../data/PCA.json'

function PCAPlot(className) {
    const getMinMax = (objList, key) => {
        const keyArr = objList.map( obj => obj[key] )
        const max = Math.max(...keyArr)
        const min = Math.min(...keyArr)

        return [min, max]
    }

    const [xCorMin, xCorMax] = getMinMax(data, 'pca_emb_x')
    const [yCorMin, yCorMax] = getMinMax(data, 'pca_emb_y')

    const margin = 30

    const onElemClick = (e, d) => {
        window.open(d.download_link, '_blank')
    }

    useEffect(() => {
        const svg = d3.select('#PCAPlot')
        const svgW = parseInt(svg.style('width'))
        const svgH = parseInt(svg.style('height'))

        svg.style('border', '3px solid black')

        const mainG = svg.append('g')

        const subGs = (
            mainG.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'tag')
                .on('click', onElemClick)
        )

        subGs
        .append('circle')
            .attr('cx', d => scale(d.pca_emb_x, xCorMin, xCorMax, 0 + margin, svgW*10 - margin))
            .attr('cy', d => scale(d.pca_emb_y, yCorMin, yCorMax, 0 + margin, svgH*10 - margin))
            .attr('fill', d => {
                const x = scale(d.pca_emb_x, xCorMin, xCorMax, 0 + margin, svgW*10 - margin)
                const y = scale(d.pca_emb_y, yCorMin, yCorMax, 0 + margin, svgH*10 - margin)

                const h = scale(y, 0 + margin, svgH*10 - margin, 0, 360)
                const s = scale(x, 0 + margin, svgW*10 - margin, 30, 80)
                const l = 50

                return hslToHex(h, s, l)
            })
            .attr('stroke', 'black')
        
        subGs
        .append('text')
            .text(d => d.ter)
            .attr('x', d => scale(d.pca_emb_x, xCorMin, xCorMax, 0 + margin, svgW*10 - margin))
            .attr('y', d => scale(d.pca_emb_y, yCorMin, yCorMax, 0 + margin, svgH*10 - margin))
            .attr('class', 'text-pick-900 font-bold')

        const zoom = d3.zoom()

        zoom.on('zoom', e => {
            const curDelta = e.transform.k;

            subGs
            .selectAll('circle')
            .attr('r', 20/(curDelta * 1.3))
            .attr('stroke-width', 1/curDelta)

            subGs
            .selectAll('text')
            .style('font-size', `calc(30px/${curDelta})`)

            mainG.attr('transform', e.transform)
        })

        svg
        .call(zoom)


        svg
		.call(zoom.translateTo, 0.5 * svgW * 10, 0.5 * svgH * 10)
        .call(zoom.scaleBy, 0.08)

    }, [])

    return (
        <svg
            id="PCAPlot"
            width='70vh'
            height='70vh'
        >
        </svg>
    )
}

export default PCAPlot
