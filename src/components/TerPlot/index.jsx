import react, { useState, useEffect, useRef } from "react"
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'

import SelectBar from '../SelectBar'
import SVGWrapper from "../SVGWrapper"
import Tooltip from '../Tooltip'

import { 
    scale, 
    makeScaler, 
    getMinMaxFromObj as getMinMax, 
    tori2Color, 
    ter2Region, 
    capStr, 
    key2Label 
} from '../../scripts'
import data from '../../data/metadata.json'

const terList = ['gg', 'gw', 'cb', 'cn', 'jb', 'jn', 'gb', 'gn', 'jj']
const defaultTer = terList[0]
const selectedColor = tori2Color['gyung']

function TerPlot({ className }) {
    const [curTer, setCurTer] = useState(defaultTer)
    const containerRef = useRef()
    const svgRef = useRef()
    const tooltipRef = useRef({})

    const assignRef = key => el => {
        const elems = tooltipRef.current
        elems[key] = el
    }

    const [xCorMin, xCorMax] = getMinMax(data, 'umap_x')
    const [yCorMin, yCorMax] = getMinMax(data, 'umap_y')

    const margin = 30
    const defaultR = 80
    const focusScale = 1.5

    const onElemClick = (e, d) => {
        window.open(d.download_link, '_blank')
    }

    const onElemOver = (e, d) => {
        const curTarget = d3.select(e.target)
        const curTargetR = curTarget.attr('r')
        curTarget.attr('r', curTargetR * focusScale)

        const tooltipItemKeys = Object.keys(tooltipRef.current)

        tooltipItemKeys.forEach(key => {
            const elem = d3.select(tooltipRef.current[key])

            if(key === 'main') {
                const container = d3.select(containerRef.current)
                const { x: svgX, y: svgY } = container.node().getBoundingClientRect()

                elem
                .classed('hidden', false)
                .style('left', `${e.pageX - svgX + 30}px`)
                .style('top', `${e.pageY - svgY + 30}px`)

                return
            }

            let descVal = d[key]
            descVal = (
                descVal === false
                    ? 'none'
                : descVal === ''
                    ? '?'
                : key === 'ter'
                    ? ter2Region[descVal]
                : key === 'det_ter' || key === 'is_tori'
                    ? capStr(descVal)
                : descVal
            )

            const descElem = d3.select(elem.node().childNodes[1])

            if(descVal === 'none') elem.classed('hidden', true)
            else elem.classed('hidden', false)

            if(key === 'is_tori') descElem.style('font-weight', 'bold')

            descElem.text(descVal)
        })
    }

    const onElemOut = (e, d) => {
        const curTarget = d3.select(e.target)
        const curTargetR = curTarget.attr('r')
        curTarget.attr('r', curTargetR * (1/focusScale) )

        const tooltipElem= tooltipRef.current.main
        d3.select(tooltipElem)
        .classed('hidden', true)
    }

    const onTerSelect = item => e => setCurTer(item)

    useEffect(() => {
        const bgData = data.filter(d => d.ter !== curTer)
        const fgData = data.filter(d => d.ter === curTer)

        const container = d3.select(containerRef.current)
        const { width: svgW, height: svgH } = container.node().getBoundingClientRect()

        const svg = d3.select(svgRef.current)
        svg.style('border', '2px solid black')

        svg.selectAll('*').remove()

        const mainG = svg.append('g')

        const zoom = d3.zoom()
        svg
        .call(zoom)
		.call(zoom.transform, d3.zoomIdentity)

        const bgGs = (
            mainG
            .append('g')
            .selectAll('g')
            .data(bgData)
            .enter()
            .append('g')
            .style('cursor', 'pointer')
            .on('click', onElemClick)
            .on("mouseover", onElemOver)
            .on("mouseout", onElemOut)
        )

        const fgGs = (
            mainG
            .append('g')
            .selectAll('g')
            .data(fgData)
            .enter()
            .append('g')
            .style('cursor', 'pointer')
            .on('click', onElemClick)
            .on("mouseover", onElemOver)
            .on("mouseout", onElemOut)
        )

        const xScaler = makeScaler(xCorMin, xCorMax, 0 + margin, svgW * 10 - margin)
        const yScaler = makeScaler(yCorMin, yCorMax, svgH * 10 - margin, 0 + margin)

        bgGs
        .append('circle')
            .attr('cx', d => xScaler(d.umap_x))
            .attr('cy', d => yScaler(d.umap_y))
            .attr('fill', tori2Color[false])
            .attr('fill-opacity', "40%")

        fgGs
        .append('circle')
            .attr('cx', d => xScaler(d.umap_x))
            .attr('cy', d => yScaler(d.umap_y))
            .attr('fill', selectedColor)

        zoom.on('zoom', e => {
            const curDelta = e.transform.k
            const curR = curDelta < 0.4 ? defaultR : 20/(curDelta * 0.8);

            mainG
            .selectAll('circle')
            .attr('r', curR)

            mainG.attr('transform', e.transform)
        })

        svg
		.call(zoom.translateTo, 0.5 * svgW * 10, 0.5 * svgH * 10)
        .call(zoom.scaleBy, 0.09)

    }, [curTer])

    return (
        <div className="w-[70vw]">

            <SelectBar
                className='mb-12 ml-8'
                defaultValue={defaultTer}
                itemList={terList}
                selectedColor={selectedColor}
                onClick={onTerSelect}
            />
            
            <SVGWrapper
                width='100%'
                heightRatio='55%'
                containerRef={containerRef}
                svgRef={svgRef}
            >
                <Tooltip 
                    className='hidden absolute p-10 bg-grey-light bg-opacity-60'
                    assignRef={assignRef('main')}
                >
                    {[
                        'is_tori',
                        'id',
                        'korean_info',
                        'ter',
                        'det_ter',
                        'singer',
                        'rec_date',
                        'length',
                    ].map(key => {
                        return (
                            <Tooltip.Item
                                item={{
                                    label: key2Label(key),
                                    unit: key === 'length' ? 'sec' : ''
                                }}
                                assignRef={assignRef(key)}
                                key={uuid()}
                            />
                        )
                    })}
                </Tooltip>
            </SVGWrapper>
        </div>
    )
}

export default TerPlot