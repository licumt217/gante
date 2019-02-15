<template>
    <div v-title="''">
        <div class="container">
            <div id="map" style="width:100%;height: 900px">

            </div>


        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { util } from 'util';
    import qqMap from '../../assets/js/map/qqMap'
    export default {
        data(){
            return {
                map:null,
                activeMarker:null

            }
        },
        mounted(){
            qqMap.init().then(()=>{

                let center=qqMap.getLngLat( 116.306070,39.982163)

                this.map=qqMap.getMap('map',{
                    center:center,
                    zoom:10,

                })





                for(let i=0;i<400;i++){
                    let lng=116+Math.random()
                    let lat=39.98+Math.random()

                    let options={
                        center:qqMap.getLngLat( lng,lat),
                        img:require('../../assets/images/login/yzm_inactive_bg.png'),
                        clickedImg:require('../../assets/images/login/yzm_active_bg.png')

                    }
                    qqMap.createMarker(options)

                }




            },(data)=>{
                console.log(data)
            })
        },
        methods: {

            init: function () {

            },
        }
    }
</script>
<style lang="less">




</style>


