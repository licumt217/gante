
<template>
    <div v-title="''">

        <div id="container">
        </div>
    </div>
</template>

<script>

export default {
    data() {

    },
    mounted() {
        this.init()
        document.querySelector("#container").style.height = `${window.innerHeight * 1}px`;
    },
    methods: {
        init: function() {
            var ary = [
                {
                    "lng": "120.493223",
                    "lat": "36.157961",
                    "parkName": "青岛市中国海洋大学崂山校区停车场"
                },
                {
                    "lng": "120.435769",
                    "lat": "36.135651",
                    "parkName": "青岛建工集团电子商务产业园"
                },
                {
                    "lng": "120.466656",
                    "lat": "36.100921",
                    "parkName": "青岛市国际发展中心停车场"
                },
                {
                    "lng": "120.444892",
                    "lat": "36.107583",
                    "parkName": "青岛市同安路商业街停车场"
                },
                {
                    "lng": "120.433053",
                    "lat": "36.071562",
                    "parkName": "青岛市中国海洋大学浮山校区停车场"
                },
                {
                    "lng": "120.450342",
                    "lat": "36.109762",
                    "parkName": "青岛中船重工科技大厦"
                },
                {
                    "lng": "120.436062",
                    "lat": "36.120861",
                    "parkName": "青岛市多悦酒店停车场"
                },
                {
                    "lng": "120.472279",
                    "lat": "36.094896",
                    "parkName": "青岛市弄海园二期停车场"
                },
                {
                    "lng": "120.435592",
                    "lat": "36.109067",
                    "parkName": "青岛市鹏利南华乐活城停车场"
                },
                {
                    "lng": "120.465251",
                    "lat": "36.091688",
                    "parkName": "青岛市金地公寓停车场"
                },
                {
                    "lng": "120.469174",
                    "lat": "36.095755",
                    "parkName": "青岛市麒麟皇冠大酒店停车场"
                },
                {
                    "lng": "120.469334",
                    "lat": "36.095091",
                    "parkName": "青岛弄海园商业广场"
                },
                {
                    "lng": "120.433628",
                    "lat": "36.118518",
                    "parkName": "青岛市北村农贸市场停车场"
                },
                {
                    "lng": "120.417218",
                    "lat": "36.071176",
                    "parkName": "青岛大学"
                },
                {
                    "lng": "120.446362",
                    "lat": "36.086489",
                    "parkName": "青岛海林山庄"
                },
                {
                    "lng": "120.455804",
                    "lat": "36.102193",
                    "parkName": "青岛市青医附院东院停车场"
                },
                {
                    "lng": "120.440777",
                    "lat": "36.10572",
                    "parkName": "青岛市同安路妇幼保健医院停车场"
                },
                {
                    "lng": "120.505241",
                    "lat": "36.171672",
                    "parkName": "青岛特锐德总部停车场"
                },
                {
                    "lng": "120.454577",
                    "lat": "36.111109",
                    "parkName": "青岛同安锦街"
                },
                {
                    "lng": "120.455277",
                    "lat": "36.105809",
                    "parkName": "青岛市大荣中心停车场"
                },
                {
                    "lng": "120.477591",
                    "lat": "36.09821",
                    "parkName": "青岛市索菲亚国际大酒店停车场"
                },
                {
                    "lng": "120.473454",
                    "lat": "36.110576",
                    "parkName": "青岛昌盛财富中心"
                },
                {
                    "lng": "120.471664",
                    "lat": "36.095569",
                    "parkName": "青岛市弄海园一期停车场"
                },
                {
                    "lng": "120.470043",
                    "lat": "36.0978",
                    "parkName": "青岛市海韵东方大厦停车场"
                },
                {
                    "lng": "120.474805",
                    "lat": "36.140951",
                    "parkName": "青岛石老人科技创新园"
                },
                {
                    "lng": "120.484725",
                    "lat": "36.119972",
                    "parkName": "青岛市科技大学崂山校区停车场"
                },
                {
                    "lng": "120.46745",
                    "lat": "36.101188",
                    "parkName": "青岛市金岭广场停车场"
                },
                {
                    "lng": "120.474767",
                    "lat": "36.100119",
                    "parkName": "青岛大剧院停车场"
                },
                {
                    "lng": "120.434098",
                    "lat": "36.113018",
                    "parkName": "青岛市高科园装饰城停车场"
                },
                {
                    "lng": "120.475037",
                    "lat": "36.104266",
                    "parkName": "青岛檀香湾大厦商业网点"
                },
                {
                    "lng": "120.436887",
                    "lat": "36.148754",
                    "parkName": "青岛飞拉力石材市场"
                },
                {
                    "lng": "120.461374",
                    "lat": "36.142839",
                    "parkName": "青岛市崂山区人民政府中韩街道办事处"
                },
            ]
            var map = new AMap.Map("container", {
                resizeEnable: true,
                center: [120.478128, 36.11449],//地图中心点
                zoom: 13, //地图显示的缩放级别
                // layers: [
                //   defaultLayer,//默认图层
                //   traffic//实时交通图层
                // ],
                zoomEnable: true,
                dragEnable: true,
            });
            //  map.setTop(true)

            for (var i = 0; i < ary.length; i++) {
                var marker = new AMap.Marker({ //添加自定义点标记
                    map: map,
                    position: [ary[i].lng, ary[i].lat], //基点位置lng 经度   lat纬度
                    title: ary[i].parkName,
                    content: '<div class="markerPointer"></div>'
                });

                var zindex = 110;
                marker.on('click', function() {
                    var ps = document.getElementsByClassName('parkName');
                    for (var i = 0; i < ps.length; i++) {
                        ps[i].style.display = 'none';
                    }
                    zindex = zindex + 10;
                    this.setzIndex(zindex);
                    this.setContent('<div class="markerPointer"></div><div class="parkName">' + this.G.title + '</div>');
                    marker.setTop(false)

                });
                marker.on("mouseout", function() {
                    this.setzIndex(100);
                    this.setContent('<div class="markerPointer"></div>')
                });


            }



        }
    }
}
</script>



<style lang="less">
@import '../../assets/css/common.less';
#container {
    width: 100%;
}


.parkName {
    padding: 3px 10px;
    background: #f00;
    color: #fff;
    font-size: 14px;
    width: 120px;
    text-align: center;
    border-radius: 3px;
}

.markerPointer{
    height: 25px;
    width: 25px;
    background: url(../../assets/images/parkMap/marker.png);
    background-size: 100% 100%;
}
</style>


