<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="http://prep.tingjiandan.com/wxcontrol/api/getThumbMediaId"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
        <h3>图文消息素材media_id:</h3>
        <input type="text" v-model="media_id" style="width:600px;">
        <br/>
        <br/>
        <h3>总media_id:</h3>

        <p type="text" v-text="id" style="width:600px;margin-left:2em;" v-for="id in mediaIdArray"></p>

        <input type="button" value="上传图文素材" @click="uploadNews">
        <input type="button" value="批量发送" @click="send">
    </div>
</template>
<script>
  export default {
    data () {
      return {
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: [],
        media_id:'',
        mediaIdArray:[],
        thumbMediaIdArray:[]
      }
    },
    methods: {
      //批量发送图文消息
      send(){

//








        $.post('http://prep.tingjiandan.com/wxcontrol/api/batchFetchMaterial',{
          type:'news'
        },data=>{
          if(data.isSuccess==='0'){
//            this.media_id=data.result.media_id;;
//            this.mediaIdArray.push(this.media_id)


            $.post('http://prep.tingjiandan.com/wxcontrol/api/sendImgTextByOpenId',{
              mediaId:data.result.item[1].media_id,
              openIdArray:JSON.stringify(["oyaEAtySVNKe7PvUWTcPWLyNZsSQ",'oyaEAt7TPE-d9Ao5Zz6TO2PQMtd0']),
            },data=>{
              if(data.isSuccess==='0'){
                this.media_id=data.result.media_id;;
                this.mediaIdArray.push(this.media_id)
              }else{
                alert(JSON.stringify(data))
                this.media_id=data.errorMSG
              }
            })
          }else{
//            alert(JSON.stringify(data))
//            this.media_id=data.errorMSG
          }
        })







      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (data, file) {
        alert(JSON.stringify(data))
        if(data.isSuccess==='0'){
            this.thumbMediaIdArray.push(data.result.thumb_media_id)
        }else{
            this.$parent.showTjdModal({
            errorMsg:data.errorMSG
          })
        }

//        alert(JSON.stringify(res))
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      //上传图文消息素材
      uploadNews(thumb_media_id){
        let article={
          articles:[]
        };

        alert(JSON.stringify(this.thumbMediaIdArray))

        for(let i=0;i<this.thumbMediaIdArray.length;i++){
          let mediaId=this.thumbMediaIdArray[i];
          let obj={
            thumb_media_id:mediaId,
            author:'李强'+i,
            title:'停车行业的领头羊分析',
            content_source_url:'http://prep.tingjiandan.com/tcweixin/letter/prePay/payInPark',
            content:"<h1>我是h1</h1><h1>我是h1</h1><h1>我是h1</h1><h1>我是h1</h1><h1>我是h1</h1><h1>我是h1</h1>" +
            "<h1>我是h1</h1><h1>我也是h1</h1><div><p>我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落" +
            "我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段" +
            "落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落" +
            "我是段落我是段落我是段落我是段落我是段落我是段落我是段落我是段落" +
            "</p><a href='http://www.baidu.com'>我是超链接</a></div>",
            digest:'我是描述区域我是描述区域我是描述区域我是描述区域我是描述区域我是描述区域我是描述区域我是描述区域',
            show_cover_pic:1
          }
          article.articles.push(obj);
        }

        alert(JSON.stringify(article))

        $.post('http://prep.tingjiandan.com/wxcontrol/api/uploadNews',{
          article:JSON.stringify(article)
        },data=>{
          if(data.isSuccess==='0'){
            this.media_id=data.result.media_id;;
            this.mediaIdArray.push(this.media_id)
          }else{
            this.media_id=data.errorMSG
          }
        })
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
