<template>
  <div class="login">
      <h1>专属登录</h1>
      <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="rules" class="lgform">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="loginForm.user" placeholder="请输入用户名" clearable class="user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="loginForm.pwd" placeholder="请输入密码" show-password class="user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="middle" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div>
        <img src="@/assets/img/c1.gif" alt="SpongeBob1" class="interes1">
        <img src="@/assets/img/c2.gif" alt="SpongeBob2" class="interes2">
      </div>
  </div>
</template>

<script>
import {useToLogin} from '../../network/useToLogin.js';
export default {
  name: 'Login',
  data(){
    return {
      loginForm: {
        user: '',
        pwd: ''
      },
      rules: {//超坑！！！prop这个要和v-model里面的那个属性名一样！！！！
        user: [
          { required: true, message: '不输用户名不准进~', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message:'不输密码不准进~', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {//这里是表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user = this.loginForm.user;
            let pwd = this.$md5(this.loginForm.pwd)
            useToLogin(user, pwd)
            .then(res => {
              if(res.status){
                this.$message({
                  message: res.msg,
                  type: "success",
                  showClose: true
                });
                sessionStorage.setItem("username", this.loginForm.user);
                sessionStorage.setItem("token", res.token);
                this.$router.push('/admin/myhome')
              }
              else{
                this.$message({
                  message: res.msg,
                  type: "error",
                  showClose: true
                })
              }
            })
          } else {
            return false;
          }
    });
  }
}
}
</script>

<style>
  .login {
    position: relative;
  }
  .login h1 {
    position: absolute;
    display: inline-block;
    top: 50px;
    left: 50%;
    transform: translateX(-20%);
    color: var(--my-color);
  }
  .lgform {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .user {
    width: 300px;
  }
  .login-btn {
    width: 300px;
    font-weight: 700;
    background-color: var(--my-color);
    color: #fff;
  }
  .interes1 {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 380px;
    left: 670px;
  }
  .interes2 {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 380px;
    left: 770px;
  }
</style>