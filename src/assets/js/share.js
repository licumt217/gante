import { wxUtil } from './wxUtil'
import { util } from './tjdUtils'

var share = {
    initShare: function () {
        wxUtil.initWxJsAPI().then(function () {
            return new Promise((resolve, reject) => {
                wxUtil.onShareFriends({
                    title: '停车报告',
                    desc: '点我查看您的停车报告',
                    link: util.constants.tcapiWebUrl + 'parkingReport/index',
                    imgUrl: require('../images/parkingReport/shareLogo.png'),
                }).then((data) => {
                    resolve()
                }); wxUtil.onShareFriendsZone({
                    title: '停车报告',
                    link: '',
                    imgUrl: '',
                    link: util.constants.tcapiWebUrl + 'parkingReport/index',
                    imgUrl: require('../images/parkingReport/shareLogo.png'),
                }).then((data) => {
                    resolve()
                }), () => {
                    reject()
                };

            });


        });
    }
}
export { share }