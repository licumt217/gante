/**
 * 车牌号格式化，京A12345格式化为 京A·12345
 * @param carNum
 * @returns {*}
 */
const parseCarNum = (carNum, parseStr) => {
    var str = parseStr || '·';
    if (!carNum && !/^[a-zA-Z0-9\s\u4E00-\u9FA5]$/.test(carNum)) 
        return carNum
    return carNum
        .slice(0, 2)
        .concat(str)
        .concat(carNum.slice(2, carNum.length))
}

export {parseCarNum}