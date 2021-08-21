<template>
    <div class="about">
        <div class="site-content">
            <div class="content-warp">
                <div class="about-site about-info">
                   关于博客：
                    <div class="info-card">
                        <p>个人博客第一版</p>
                    </div>
                </div>

                <div class="about-me about-info">
                    给我留言：
                   <div class="info-card">
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="ruleForm.email" placeholder="请输入您邮箱（方便我回复）"></el-input>
                        </el-form-item>
                        <el-form-item label="留言" prop="message">
                          <el-input v-model="ruleForm.message"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="submitForm('ruleForm')" plain>发送</el-button>
                          <el-button @click="resetForm('ruleForm')" plain>重置</el-button>
                        </el-form-item>
                      </el-form>
                   </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import sectionTitle from '@/components/section-title'
     import {endMessage} from '../api'
    export default {
        name: "About",
        data() {
          let checkEmail = (rule, value,callback) =>{//验证邮箱
            const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(this.ruleForm.email != '' && !regEmail.test(this.ruleForm.email)) {
              callback(new Error('请输入有效的邮箱'));
            }else{
              callback();//必须加
            }
          }
          return {
            list: [],
            ruleForm: {
              email:'',
              message:''
            },
            rules: {
              email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
                {validator: checkEmail, trigger: "blur"}]
            }
          }
        },
        components: {
            // Quote,
            sectionTitle
        },
      watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
          this.init()
        }
      },
        methods: {
          init(){
              this.ruleForm={}
          },
          sendMessage(){
              endMessage(this.ruleForm).then(response => {
                this.ruleForm = response.data.message
                this.open('发送成功')
                this.init()
              })
          },
          open(mess) {
            const h = this.$createElement;
            this.$notify({
              title: '提示',
              message: h('i', { style: 'color: teal'}, mess),
              duration:800,
              position:"top-left",
              offset:100
            });
            document.documentElement.scrollTop = 500
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.sendMessage()
              } else {
                console.log('error submit!!');
                this.open('发送失败')
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        },
        mounted() {
          this.init()
        }
    }
</script>
<style scoped lang="less">
    .about {
        padding-top: 40px;
    }

    .content-warp {
        margin-top: 80px;

        .about-info {
            margin: 30px 0;

            span {
                color: red;
                margin-right: 10px;
            }

            .info-card {
                min-height: 100px;
                padding: 20px;
                border-radius: 3px;
                margin: 30px 0 50px 0;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                p{
                    line-height: 1.7rem;
                }
            }
        }
        .contactForm{
            width: 100%;
            padding: 20px;
            .form-item{
                align-items: center;
                display: flex;
                &:not(:last-child){
                    margin-bottom: 20px;
                }
                label{
                  width: 80px;
                }
                .v{
                    min-height: 40px;
                    line-height: 20px;
                    border-radius: 3px;
                    padding: 2px 10px;
                    outline:none;
                    border: 1px solid #8fd0cc;
                    width: 100%;
                    resize: vertical;
                }
                button{
                    width: 100px;
                    height: 40px;
                    border-radius: 3px;
                    outline:0;
                    border-style: none;
                    cursor: pointer;
                    background-color: #409eff;
                    color: white;
                    &:hover{
                        opacity: 0.8;
                    }
                }
            }
        }
    }

    /*******/
    @media (max-width: 800px) {
        .content-warp {
            margin-top: 0;
        }
    }
</style>
