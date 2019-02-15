/**
 * 站长统计代码
 */
import {util} from '../tjdUtils'

//统计按钮点击次数等
window._czc = window._czc || []

//根据是否生产环境加载不同的站长统计代码
let url = 'https://s19.cnzz.com/z_stat.php?id=1262642427&web_id=1262642427'

if (!util.isProdEnv()) {
    url = 'https://s13.cnzz.com/z_stat.php?id=1262642413&web_id=1262642413'
}

util.dynamicLoadJs(url,null,true);
