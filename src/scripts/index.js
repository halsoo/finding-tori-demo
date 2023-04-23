const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const makeScaler = (inMin, inMax, outMin, outMax) => (number) => scale(number, inMin, inMax, outMin, outMax)

const getMinMaxFromObj = (objList, key) => {
    const keyArr = objList.map( obj => obj[key] )
    const max = Math.max(...keyArr)
    const min = Math.min(...keyArr)

    return [min, max]
}

const tori2Color = {
    false: '#adadad',
    'gyung': '#dd605b', // red
    'menari': '#e6a850', // yellow
    'yukja': '#8c9be7', // blue
    'others': '#82bd60', // green
}

const ter2Region = {
    'gg': 'Gyeonggi-do',
    'gw': 'Gangwon-do',
    'cb': 'Chungcheongbuk-do',
    'cn': 'Chungcheongnam-do',
    'jb': 'Jeollabuk-do',
    'jn': 'Jeollanam-do',
    'gb': 'Gyeongsangbuk-do',
    'gn': 'Gyeonsangnam-do',
    'jj': 'Jeju',
}

const capStr = str => str.substring(0, 1).toUpperCase() + str.substring(1)

const key2Label = key => (
    key === 'ter'
        ? 'region'
    : key == 'det_ter'
        ? 'sub-region'
    : key === 'is_tori'
        ? 'tori'
    : key
)


export { scale, makeScaler, getMinMaxFromObj, tori2Color, ter2Region, capStr, key2Label }