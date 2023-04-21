const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const makeScaler = (inMin, inMax, outMin, outMax) => (number) => scale(number, inMin, inMax, outMin, outMax)

const hslToHex = (h, s, l) => {
    l /= 100

    const a = s * Math.min(l, 1 - l) / 100

    const f = n => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')   // convert to Hex and prefix "0" if needed
    }

    return `#${f(0)}${f(8)}${f(4)}`
}

const getMinMaxFromObj = (objList, key) => {
    const keyArr = objList.map( obj => obj[key] )
    const max = Math.max(...keyArr)
    const min = Math.min(...keyArr)

    return [min, max]
}

const tori2Color = {
    false: '#adadad', // Misty Rose
    'gyung': '#dd605b', // Electric Blue
    'menari': '#e6a850', // Crimson Red
    'yukja': '#8c9be7', // Golden Yellow
    'others': '#82bd60', // Forest Green
}


export { scale, makeScaler, hslToHex, getMinMaxFromObj, tori2Color }