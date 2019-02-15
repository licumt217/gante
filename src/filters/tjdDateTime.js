/**
 * 格式化日期
 * @param val 后台返回的日期，目前支持yyyymmddhhmmss、毫秒、秒格式
 * @param format 前端显示的格式，目前支持'YMDHMS','YMD','HMS','YMDHM'
 * @returns {*}
 */
const datetime = (val,format='YMDHMS') => {
    let typeArray=[//暂时根据值的长度来
        14,//yyyyMMDDHHMMSS格式
        13,//毫秒
        10//秒
    ];
    let formatArray=[
        'YMDHMS',
        'YMD',
        'HMS',
        'YMDHM'
    ]
    val=String(val)
    format=format.toUpperCase()
    let errorMsg='日期格式错误';
    let formatErrorMsg='日期过滤器参数错误';
    let theDate=null;

    if(!val){
        return errorMsg;
    }else{
        let length=val.length;
        if(typeArray.includes(length)){

            let key=typeArray.findIndex(item=>{
                return item===length;
            });
            let value=typeArray[key];
            if(value===14){

                let y=val.substring(0,4);
                let m=val.substring(4,6);
                let d=val.substring(6,8);

                let hh=val.substring(8,10);
                let mm=val.substring(10,12);
                let ss=val.substring(12,14);
                theDate=new Date(y+'/'+m+'/'+d+" "+hh+":"+mm+":"+ss)
            }else if(value===13){
                theDate=new Date(Number(val))
            }else if(value===10){
                theDate=new Date(val*1000)
            }
            if(formatArray.includes(format)){
                let key=formatArray.findIndex(item=>{
                    return item===format;
                });
                let value=typeArray[key];
                let y = theDate.getFullYear();
                let m = theDate.getMonth()+1;
                let d = theDate.getDate();
                let hour = theDate.getHours();
                let min = theDate.getMinutes();
                let sec = theDate.getSeconds();
                let dateSplit='.',timeSplit=':'
                let returnStr='';
                switch(format){
                    case 'YMDHMS':
                        returnStr= y+dateSplit+(m<10?('0'+m):m)+dateSplit+(d<10?('0'+d):d)+ " "+(hour<10?('0'+hour):hour)+timeSplit+(min<10?('0'+min):min)+timeSplit+(sec<10?('0'+sec):sec);
                        break;
                    case 'YMD':
                        returnStr= y+dateSplit+(m<10?('0'+m):m)+dateSplit+(d<10?('0'+d):d);
                        break;
                    case 'HMS':
                        returnStr= (hour<10?('0'+hour):hour)+timeSplit+(min<10?('0'+min):min)+timeSplit+(sec<10?('0'+sec):sec);
                        break;
                    case 'YMDHM':
                        returnStr= y+dateSplit+(m<10?('0'+m):m)+dateSplit+(d<10?('0'+d):d)+ " "+(hour<10?('0'+hour):hour)+timeSplit+(min<10?('0'+min):min);
                        break;
                    default :
                        returnStr= y+dateSplit+(m<10?('0'+m):m)+dateSplit+(d<10?('0'+d):d)+ " "+(hour<10?('0'+hour):hour)+timeSplit+(min<10?('0'+min):min)+timeSplit+(sec<10?('0'+sec):sec);
                        break;
                }
                return returnStr;



            }else{
                return formatErrorMsg;
            }




            return theDate
        }else{
            return errorMsg;
        }
    }
}

/**
 * 将秒格式的时间转换成X时X分X秒
 */
const tjdSecToDate = (value,type) => {
    value = Number(value)
    let hour = Math.floor(value/3600);
    var min = Math.floor(value/60) % 60;
    var sec = value % 60;
    function fixZero(val){
        if(val<10){
            return '0'+val;
        }else{
            return val;
        }
    }
    if(type && type == '1'){
        return fixZero(hour)+'时'+fixZero(min)+'分'
    }else {
        return fixZero(hour)+'时'+fixZero(min)+'分'+fixZero(sec)+'秒'
    }
}
/**
 * 将时间格式的时间转换成X时X分X秒(时间格式小时可能超过两位，所以总长度可能超过6位)
 */
const transParkTime2Str = (value,type) => {
    if(!value) return;
    var time=value;
    var length = time.length
    var h=time.slice(0,-4);
    var m=time.substr(-4,2);
    var s=time.substr(-2);
    var str;
    if(type && type == '1'){
        str= h+"时"+m+"分";
    }else {
        str= h+"时"+m+"分"+s+"秒";
    }
    return str;
}

/**
 * 将毫秒时间戳格式的时间转换为日期/时间/或日期时间类型字符串
 */
const tjdMilliToDate = (value,type,dateSplit,timeSplit) => {
    if(!value) return
    dateSplit=dateSplit||'.';
    timeSplit=timeSplit||':';
    var date=new Date();
    date.setTime(value);
    function fixZero(val){
        if(val<10){
            return '0'+val;
        }else{
            return val;
        }
    }
    if(type=='date'){
        return date.getFullYear()+dateSplit+fixZero(date.getMonth()+1)+dateSplit+fixZero(date.getDate())
    }else if(type=='time'){
        return fixZero(date.getHours())+timeSplit+fixZero(date.getMinutes())+timeSplit+fixZero(date.getSeconds())
    }else if(type=='datetime'){
        return date.getFullYear()+dateSplit+fixZero(date.getMonth()+1)+dateSplit+fixZero(date.getDate())+" "+
            fixZero(date.getHours())+timeSplit+fixZero(date.getMinutes())+timeSplit+fixZero(date.getSeconds());
    }else if(type=='datetimeNoSec'){
        return date.getFullYear()+dateSplit+fixZero(date.getMonth()+1)+dateSplit+fixZero(date.getDate())+" "+
            fixZero(date.getHours())+timeSplit+fixZero(date.getMinutes())
    }else{
        return date.getFullYear()+dateSplit+fixZero(date.getMonth()+1)+dateSplit+fixZero(date.getDate())
    }
}

export { datetime ,tjdSecToDate,transParkTime2Str,tjdMilliToDate}
