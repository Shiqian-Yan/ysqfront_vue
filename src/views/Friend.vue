<template>
    <div class="friend">
        <div class="site-content-article">
                <div class="friend-header">
                   个人简介：
                </div>
            <!---说明--->
            <div class="statement">
                <quote>
                    <p><span>姓名：</span><span class="myclass">{{myInfo.name}}</span></p>
                    <p><span>出生年份：</span><span class="myclass">{{ myInfo.year }}</span></p>
                    <p><span>家乡：</span><span class="myclass">{{myInfo.home}}</span></p>
                  <p><span>大学：</span><span class="myclass">{{myInfo.college}}</span></p>
                  <p><span>硕士：</span><span class="myclass">{{myInfo.postgraduate}}</span></p>
                  <p><span>专业：</span><span class="myclass">{{myInfo.department}}</span></p>
                  <p><span>工作：</span><span class="myclass">{{myInfo.work}}</span></p>
                  <p><span>微信：</span><span class="myclass">{{myInfo.wecaht}}</span></p>
                  <p><span>QQ：</span><span class="myclass">{{myInfo.qq}}</span></p>
                </quote>
            </div>
            <!----->
            <hr/>
            <div class="friend-list animate">
                <div class="friend-item" v-for="item in list" :key="item.id"><a target="_blank" :href="item.path"><div class="site-name">{{item.siteName}}</div><div class="site-detail">{{item.desc}}</div></a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import Quote from "@/components/quote";
    import {fetchInfo} from '../api'
    export default {
        name: "Friend",
        data(){
          return{
              websiteInfo: {},
              list: [],
              myInfo:{}
          }
        },
        components:{
            Quote,
            sectionTitle
        },
        methods: {
            fetchInfo(){
              fetchInfo().then(response=>{
                 this.myInfo=response.data.data
              })
            },
            getWebSiteInfo(){
                this.$store.dispatch('getSiteInfo').then(data =>{
                    this.websiteInfo = data
                })
            }
        },
        mounted() {
            this.getWebSiteInfo();
            this.fetchInfo();
        }
    }
</script>

<style scoped lang="less">
    .friend{
        padding-top: 40px;
    }
    .myclass{
        float: right;
       //padding-right: 300px;
      text-align: left;
    }
    .friend-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 80px;
        font-weight: 400;
        .title{
            font-size: 20px;
        }
        .apply:hover{
            color: #ff6d6d;
        }
    }
    .statement{
        margin: 30px 0 20px 0;
        a{
            color: #ff6d6d;
        }
        p{
            line-height: 2rem;
        }
    }
    hr{
        margin: 40px 0;
        border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 109, 109, 0.75), rgba(0, 0, 0, 0));
    }
    .friend-list{
        width: 100%;
        .friend-item{
            display: inline-block;
            width: 30%;
            /*height: 100px;*/
            margin: 0 5% 20px 0;
            padding: 10px 30px;
            border: 1px solid #ECECEC;
            border-radius: 3px;
            &:hover{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
            &:nth-of-type(3n){
                margin-right: 0;
            }
            .site-name,.site-detail{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-bottom: 10px;
                line-height: 1.5rem;
            }
            .site-name{
                color: #8fd0cc;
                border-bottom: 1px dotted #ECECEC;
            }
            .site-detail{
                font-size: 13px;
                padding-top: 10px;
            }
        }
    }
    /*******/
    @media (max-width: 800px) {
        .friend-header{
            margin-top: 0;
        }
        .friend-list{
            .friend-item{
                width: 45%;
                &:nth-of-type(2n){
                    margin-right: 0;
                }
                &:nth-of-type(3n){
                    margin-right: 5%;
                }
            }
        }
    }
    @media (max-width: 600px){
        .friend-list{
            .friend-item{
                display: block;
                width: 90%;
                margin: 0 auto 20px auto;
                &:nth-of-type(2n){
                    margin-right: auto;
                }
                &:nth-of-type(3n){
                    margin-right: auto;
                }
            }
        }
    }
</style>
