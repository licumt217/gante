/*
 *格式化车牌
 * 京A123456->京A·123456
 **/
const parseCarNum = (carNum) => {
    if (!carNum && !/^[a-zA-Z0-9\s\u4E00-\u9FA5]$/.test(carNum))
        return carNum
    return carNum.slice(0, 2).concat('·').concat(carNum.slice(2, carNum.length))
}

const parseServicePhone = (phoneNum,parseStr) => {
    if (!phoneNum || isNaN(phoneNum)) return phoneNum
    var parseStr = parseStr || '-'
    return phoneNum.slice(0, 3) + parseStr + phoneNum.slice(3, 6) + parseStr + phoneNum.slice(6)
}

const null2zero = (str) => {
    if (str) return str
    return 0
}

const parseAmountAndDHM = (num, type) => {
    if (!num) return
    if (type == 4) {
        let value = ''
        if (num < 0) {
            value = '-'
            num = -num
        }
        let day = parseInt(num / 1440),
            hour = parseInt((num % 1440) / 60),
            minute = num % 60;
        return value.concat(day == 0 ? '' : ''.concat(day).concat('天')).concat(hour == 0 ? '' : hour + '小时').concat(minute + '分')
    } else {
        return ''.concat(Number(num).toFixed(2)).concat('元')
    }
}
const parseAmountAndHM = (num, type) => {
    if (!num) return
    if (type == 4) {
        let hour = parseInt(num / 60),
            minute = num % 60,
            value = '';
        return value.concat(hour == 0 ? '' : hour + '小时').concat(minute + '分')
    } else {
        return ''.concat(Number(num).toFixed(2)).concat('元')
    }
}
const parseCard = (num) => {
    if (!num || isNaN(num)) return
    let arr = String(num).split(''),
        val = ''
    for (let i = 0, l = arr.length; i < l; i++) {
        val += arr[i]
        if (i > 0 && (i + 1) % 4 === 0) val += ' '
    }
    return String(val)
}
const parseMoney = (money) => {
    if (!money || isNaN(money)) return
    money = Number(money).toFixed(2)
    let val = '',
        arr = money.split('.')[0].split('').reverse()
    if (arr.length < 4) return money
    for (let i = 0, l = arr.length; i < l; i++) {
        val += arr[i]
        if (i > 0 && (i + 1) % 3 === 0) val += ','
    }
    if (val.slice(val.length - 1, val.length) === ',') val = val.slice(0, val.length - 1)
    return val.split('').reverse().join('').concat('.').concat(money.split('.')[1])
}
const parsePhone = (phoneNum) => {
    if (!phoneNum || isNaN(phoneNum)) return "暂无"
    return phoneNum.slice(0, 3) + '-' + phoneNum.slice(3, 7) + '-' + phoneNum.slice(7)
}
const parseIdentity = (type, transType) => {
    if (!transType) transType = 0
    if (!type) return
    let val
    switch (type) {
        case "0":
            val = transType == 0 ? '系统管理员' : '系统管理员'
            break
        case "1":
            val = transType == 0 ? '团队负责人' : '团队'
            break
        case "2":
            val = transType == 0 ? '部门负责人' : '部门'
            break
        case "3":
            val = '员工'
            break
        case "4":
            val = transType == 0 ? '个人' : '个人'
            break
        default:
            val = '0'
    }
    return val;
}
export { parseCarNum, null2zero, parseAmountAndDHM, parseAmountAndHM, parseCard, parseMoney, parsePhone, parseIdentity ,parseServicePhone}