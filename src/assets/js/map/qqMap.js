/**
 * 腾讯地图
 * @returns {Promise<any>}
 */


export default {
    map:null,
    event:null,
    eventListenerArray:[],//存储所有的事件监听器数组
    scaleControl:null,
    /**
     * 初始化地图js文件
     * @returns {Promise<any>}
     */
    init:function () {
        return new Promise((resolve,reject)=>{
            if(typeof qq!=='undefined'){
                resolve()
            }else{
                window.initQqMap=function () {
                    resolve()
                }
                let script=document.createElement('script')
                script.type='text/javascript'
                script.async=true
                script.src='https://map.qq.com/api/js?v=2.exp&key=J4UBZ-TQTWJ-7OHFE-K6W53-5NNVO-EBFNY&libraries=place&callback=initQqMap'
                script.onerror=reject
                document.head.appendChild(script)


            }
        })
    },//获取地图对象
    getMap:function (id,options) {
        if(this.map) return this.map;

        if(typeof id!=='undefined'){
            this.map=new qq.maps.Map(document.getElementById(id),options||{})
            return this.map;
        }else{
            console.log("初始化腾讯地图缺少domID")
        }

    },

    getLngLat:function (lng,lat) {
        return new qq.maps.LatLng(lat,lng)
    },
    bindEvent:function (eventType,callback) {
        let listener= qq.maps.event.addListener(this.map,eventType,(event)=>{
            this.event=event
            callback(event);
        })
        this.eventListenerArray.push(listener)
        return listener;
    },
    /**
     *
     * 从时间对象中获取当前时间的经纬度对象
     */
    getLngLatFromEvent:function () {
        let returnObj={}
        if(this.event){
            returnObj={
                lng:this.event.latLng.getLng(),
                lat:this.event.latLng.getLat()
            }
        }

        return returnObj
    },
    /**
     * 初始化比例尺控件
     * @param align
     */
    initScaleControl:function (align) {
        let realAlign=qq.maps.ALIGN.BOTTOM_LEFT

        switch (align) {
            case 'lefttop':
                realAlign=qq.maps.ALIGN.TOP_LEFT
                break;
            case 'righttop':
                realAlign=qq.maps.ALIGN.TOP_RIGHT
                break;
            case 'rightbottom':
                realAlign=qq.maps.ALIGN.BOTTOM_RIGHT
                break;


        }

        this.scaleControl=new qq.maps.ScaleControl({
            align: realAlign,
            margin: qq.maps.Size(85, 15),
            map: this.map
        });
    },
    /**
     * 移除比例尺控件
     */
    removeScaleControl:function () {
        this.scaleControl.setMap(null)
    },
    /**
     * 创建自定义覆盖物
     * @param options
     */
    createMarker:function(options){

        let marker=new qq.maps.Marker({
            position:options.center,
            map:options.map||this.map
        })


        let anchor = options.anchor?new qq.maps.Point(options.anchor.x, options.anchor.y):new qq.maps.Point(0, 0);
        let size =   options.size?new qq.maps.Size(options.size.width, options.size.height):new qq.maps.Size(42, 42)
        let origin = options.origin?new qq.maps.Point(options.origin.x, options.origin.y):new qq.maps.Point(0, 0)
        let markerIcon = new qq.maps.MarkerImage(
            options.img,
            size,
            origin,
            anchor
        );
        marker.setTitle(options.title?options.title:'')
        marker.setIcon(markerIcon);
        marker.setDraggable(Boolean(options.isDragble))

        if(options.clickedImg){
            //标记Marker点击事件
            qq.maps.event.addListener(marker, 'click',()=>{
                let clickedMarkerIcon = new qq.maps.MarkerImage(
                    options.clickedImg,
                    size,
                    origin,
                    anchor
                );

                if(this.activeMarker && marker!==this.activeMarker){
                    this.activeMarker.setIcon(markerIcon)
                    this.activeMarker.setZIndex(0)
                }
                this.activeMarker=marker
                this.activeMarker.setIcon(clickedMarkerIcon)
                this.activeMarker.setZIndex(1)
            });
        }




    },




}
