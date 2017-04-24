<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-earth"></div>
      <div class="aside left"></div>
      <div class="aside right"></div>
      <div class="login-box">
        <img class="title" src="../../assets/img/login/loginTitle2.png" alt="">
        <div class="con">
          <div class="row b">
            <img class="user" src="../../assets/img/login/userLogin.png" alt="">
            <input type="text" v-model="userName" placeholder="输入账号" @blur="onValid(1)" @keydown="onReset(1)">
          </div>
          <div class="row c">{{tips1}}</div>
          <div class="row b">
            <img class="password" src="../../assets/img/login/pawLogin.png" alt="">
            <input type="password" v-model="passWord" placeholder="输入密码" @blur="onValid(2)" @keydown="onReset(2)" @keyup.enter="onSubmit">
          </div>
          <div class="row c">{{tips2}}</div>
          <div class="row d" @click="onSubmit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .login {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 19.2rem;
    min-height: 9.5rem;
    background: url(../../assets/img/login/dot.jpg) #0D152F;
    color: #05bde6;
    .login-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 19.2rem;
      height: 9.5rem;
      z-index: 12;
      margin-top: -4.75rem;
      margin-left: -9.6rem;
      background: url(../../assets/img/login/loginBg31.png) no-repeat center center;
      background-size: 98% 95%;
      overflow: hidden;
      .login-earth {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4rem;
        margin-top: -4rem;
        width: 8rem;
        height: 8rem;
        background: url(../../assets/img/login/earth2.png) no-repeat center center;
        background-size: 100% auto;
        animation: earth 30s linear infinite;
      }
      .aside {
        width: 0.71rem;
        height: 4.5rem;
        position: absolute;
        top: 2.2rem;
        &.left {
          background: url(../../assets/img/login/loginLeft.png) no-repeat center center;
          background-size: 100% auto;
          left: 0.5rem;
        }
        &.right {
          background: url(../../assets/img/login/loginRight.png) no-repeat center center;
          background-size: 100% auto;
          right: 0.5rem;
        }
      }
      .login-box {
        width: 6.4rem;
        height: 3.35rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -3.2rem;
        margin-top: -1.7rem;
        background: url(../../assets/img/login/loginCenterImg.png) no-repeat center center;
        background-size: auto 100%;
        .title {
          width: 100%;
          height: auto;
          position: absolute;
          top: -1rem;
          left: 0;
        }
        .con {
          width: 3.4rem;
          height: 2.5rem;
          margin-top: 0.75rem;
          margin-left: 1.5rem;
          .row {
            height: 0.2rem;
            text-align: left;
            &.b {
              height: 0.4rem;
              line-height: 0.4rem;
              border-bottom: 1px solid #047FAC;
              img {
                width: 0.36rem;
                height: auto;
                vertical-align: middle;
              }
              input {
                font-size: 0.15rem;
                padding: 0;
                width: 2.8rem;
                height: 100%;
                outline: none;
                border: 0;
                color: inherit;
                background: none;
                &::-webkit-input-placeholder {
                  color: #31cefe;
                }
                &:-moz-placeholder {
                  /* Mozilla Firefox 4 to 18 */
                  color: #31cefe;
                  opacity: 1;
                }
                &::-moz-placeholder {
                  /* Mozilla Firefox 19+ */
                  color: #31cefe;
                  opacity: 1;
                }
                &:-ms-input-placeholder {
                  /* Internet Explorer 10+ */
                  color: #31cefe;
                }
              }
            }
            &.c {
              color: #DE5347;
            }
            &.d {
              height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;
              border-radius: 0.08rem;
              border: 1px solid #00b4eb;
              background: rgba(0, 180, 235, 0.5);
              cursor: pointer;
              margin-top: 0.15rem;
              color: #fff;
              font-size: 0.16rem;
              &:hover {
                text-shadow: 0 0 10px #fff;
              }
            }
          }
        }
      }
    }
  }

  @keyframes earth {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

</style>
<script>
  // import {
  //     loginDataSourceInfo
  // } from '../../assets/js/queryData'
  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        tips1: '',
        tips2: '',
      }
    },
    methods: {
      onValid(n) {
        const reg = /[`~!@#$%^&*()_+<>?:"{},，。、【】·‘’“”；./;'[\] ]/im;
        let userName = this.userName;
        let password = this.passWord;
        if (n === 1) {
          if (!userName) {
            this.tips1 = '账号不能为空';
          } else if (userName.length < 6) {
            this.tips1 = '账号长度不能小于6位字符';
          } else if (userName.length > 15) {
            this.tips1 = '账号长度不能大于15位字符';
          }
        } else {
          if (!password) {
            this.tips2 = '密码不能为空'
          } else if (password.length < 6) {
            this.tips2 = '密码长度不能小于6位字符'
          } else if (reg.test(userName) || reg.test(password)) {
            this.tips2 = '账号密码不能输入非法字符'
          }
        }
      },
      onReset(n) {
        n === 1 ? this.tips1 = '' : this.tips2 = '';
      },
      onSubmit() {
        if (this.tips1 === '' && this.tips2 === '') {
          // loginDataSourceInfo(this.userName, this.passWord).then(res => {
          //     let {
          //         code,
          //         data,
          //         msg
          //     } = res;
          //     if (code === 200) {
          //         this.$store.commit('USER_INFO', data);
          //         window.sessionStorage.userInfo = JSON.stringify(data);
          //         this.$router.push({
          //             path: '/main'
          //         });
          //     } else {
          //         this.$message.error(msg);
          //     }
          // })
        }
      }
    }
  }

</script>
