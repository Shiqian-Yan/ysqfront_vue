<template>
    <div class="home">
        <banner isHome="true" :src="banner.imageUrl"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                    <quote v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</quote>
                    <quote v-else-if="category">分类 {{category}} 相关文章</quote>
                <quote v-else>{{description}}</quote>
            </div>
        </div>
         <div class="site-content1">
          <el-carousel :interval="3000" height="200px" direction="vertical">
            <el-carousel-item class="feature-item" v-for="item in classData" :key="item.id" style="border-radius: 15px">
              <Feature :data="item"></Feature>
            </el-carousel-item>
          </el-carousel>
           <div class="item">
             <Tag></Tag>
           </div>
         </div>
      <div class="site-content animate">
            <!--文章列表-->
            <main  class="site-main">
                <template v-for="item in list">
                    <post :post="item" :key="item.id"></post> <!--父子组件？-->
                </template>
            </main>
        <div class="page">
          <div v-if="hideSlogan">
              <el-pagination
                  :current-page="page"
                  :page-size="limit"
                  :total="total"
                  style="padding: 30px 0; text-align: center;"
                  layout="total, prev, pager, next, jumper"
                  @current-change="fetchListName"
              />
          </div>
          <div v-else>
            <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center;"
                layout="total, prev, pager, next, jumper"
                @current-change="fetchList"
            />
          </div>
        </div>
       </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Feature from '@/components/feature'
    import sectionTitle from '@/components/section-title'
    import Tag from '@/components/tag'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import HeaderSearch from '@/components/header-search'
    import {getUserName, getAllClass, getClassByName, getClassBySearch, fetchBanner, fetchList} from '../api'
    export default {
        name: 'Home',
        props: ['cate', 'words'],
        data() {
            return {
              list:null,//查询之后接口返回集合
              page:1,//当前页
              limit:5,//每页记录数
              total:0,//总记录数
              total1:0,
              blogQuery:{},//条件封装对象
              description: '',
              classData: null,
              show:false,
              cat:'',
              banner:{}
            }
        },
        components: {
            Banner,
            Feature,
            sectionTitle,
            Post,
            SmallIco,
            Quote,
            HeaderSearch,
            Tag
        },

      computed: {
            searchWords() {
                return this.$route.params.words
            },
            category() {
                return this.$route.params.cate
            },
            hideSlogan() {
                return this.$route.params.cate || this.searchWords
            },
            description() {
              return this.description
            }
        },
      watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
          this.fetchListName()
          this.getAllClass()
        }
      },
        methods: {
          getBanner(){
            fetchBanner().then(response=>{
              this.banner = response.data.data
            })
          },
          getDescription(){
            getUserName().then(response=>{
                 this.description=response.data.user.description
            })
          },
          getAllClass(){
            getAllClass().then(response=>{
                this.classData = response.data.data
              console.log(this.classData)
            })
          },
          fetchList(page=1) {
            this.page = page
            fetchList(this.page,this.limit,this.blogQuery).then(response => {
              //response接口返回的数据
              this.list = response.data.rows
              this.total = response.data.total
              console.log(this.list)
              console.log(this.total)
            }).catch(err => {
              console.log(err)
            })
          },
          fetchListName(page=1) {
            this.page = page
            if(this.$route.params&&this.$route.params.cate) {
              this.show=true
              const cate =this.$route.params.cate
              console.log(cate)
              getClassByName(cate, this.page, this.limit).then(response => {
                //response接口返回的数据
                this.list = response.data.rows
                this.total = response.data.total
                console.log(this.list)
                console.log(this.total)

              }).catch(err => {
                console.log(err)
              })
            }else if(this.$route.params&&this.$route.params.words) {
              this.show = true
              const word = this.$route.params.words
              getClassBySearch(word, this.page, this.limit).then(response => {
                //response接口返回的数据
                this.list = response.data.rows
                this.total = response.data.total
                console.log(this.list)
                console.log(this.total)

              }).catch(err => {
                console.log(err)
              })
            }
            else{
              this.fetchList()
            }
          }

        },
        mounted() {
            this.fetchListName()
            this.getAllClass()
            this.getDescription()
            this.getBanner()
        }

    }
</script>
<style scoped lang="less">
.item {
  z-index: 1;
  position: relative;
  width: 83%;
  margin-top: 50px;
  margin-bottom: 30px;
}
.art-item {
  margin-bottom: 30px;
  position: relative;
}

.art-item .star {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}

img.tag {
  width: 16px;
  height: 16px;
}

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }
    .page{

      width: 60%;
    }
    .site-main {
        padding-top: 30px;

        &.search {
            padding-top: 0;
        }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }
    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }
        .item{
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {

            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }

        }
      .site-content1 {
          display: none;
      }
    }

    /******/
</style>
