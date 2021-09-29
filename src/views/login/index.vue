<template>
  <div class="login">
    <div class="login-header">
      <img src="@/assets/images/sand.png" class="logo" alt="" />
      <h1 class="header-title">风控管理系统</h1>
    </div>
    <div class="login-box">
      <div class="box-left">
        <div class="left-img">
          <img src="@/assets/login_images/login.png" class="img" alt="" />
        </div>
      </div>
      <div class="box-right">
        <div class="right-box" :class="{ err: errLogin }">
          <div class="right-title">用户登录</div>
          <div class="right-main">
            <el-form
              status-icon
              :model="ruleLoginForm"
              :rules="rulesLogin"
              ref="ruleLoginForm"
              class="login-form"
            >
              <el-form-item prop="username">
                <span class="icon">
                  <svg-icon
                    icon-class="shield-user-fill"
                    class="svg"
                  ></svg-icon>
                </span>
                <el-input
                  placeholder="请输入账号"
                  v-model.trim="ruleLoginForm.username"
                  tabindex="1"
                  style="user-select: none;"
                  autocomplete="on"
                  name="username"
                  ref="username"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <span class="icon">
                  <svg-icon
                    icon-class="lock-password-fill"
                    class="svg"
                  ></svg-icon>
                </span>
                <el-input
                  placeholder="请输入密码"
                  v-model.trim="ruleLoginForm.password"
                  name="password"
                  style=" user-select: none;"
                  type="password"
                  tabindex="2"
                  autocomplete="on"
                  ref="password"
                  show-password
                  clearable
                >
                </el-input>
              </el-form-item>
              <div class="identify-item">
                <el-form-item
                  prop="kaptcha"
                  style="display:inline-block;width: 58%;"
                >
                  <span class="icon">
                    <svg-icon
                      icon-class="shield-check-fill"
                      class="svg"
                    ></svg-icon>
                  </span>
                  <el-input
                    placeholder="请输入验证码"
                    style="user-select: none;"
                    v-model.trim="ruleLoginForm.kaptcha"
                    tabindex="3"
                    autocomplete="off"
                    name="kaptcha"
                    maxlength="4"
                    minlength="4"
                    clearable
                    @keyup.enter.native="handleLogin"
                    ref="kaptcha"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  style="display:inline-block;width: 38%;overflow: hidden"
                >
                  <div class="login-code" @click="refreshCode">
                    <!-- <i
                    class="el-icon-loading"
                    style="font-size:20px;text-align:center; color: rgb(0, 0, 0);vertical-align: middle;"
                    v-if="codeoading"
                  ></i> -->
                    <img
                      alt="验证码"
                      :src="`/rs-mgr/kaptcha?${numRandom}`"
                      style="height: 44px;
                  width: 100%;
                  border-style: none;"
                    />
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="right-btn">
            <el-button
              :disabled="disabled"
              :loading="loading"
              type="primary"
              class="btn"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>

            <el-checkbox
              :value="rememberMe"
              @change="rememberMeChange($event)"
              class="checkbox"
              >自动登录</el-checkbox
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFix } from '@/utils/reminder'
export default {
  data() {
    var checkName = (rule, value, callback) => {
      const regOperatorName = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/
      if (regOperatorName.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的用户名'))
    }
    return {
      // eslint-disable-next-line no-undef
      basePath: process.env.VUE_APP_BASE_API,
      // 随机数
      numRandom: '',
      ruleLoginForm: {
        username: 'rsAdmin',
        password: 'asdfQWER1234!',
        kaptcha: ''
      },
      // 表单校验
      rulesLogin: {
        username: [
          {
            required: true,
            trigger: ['blur'],
            message: '请输入用户名'
          },
          {
            min: 5,
            max: 16,
            message: '用户名长度在5-16字符之间',
            trigger: ['blur']
          },
          { validator: checkName, trigger: ['blur'] }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
          },
          {
            min: 6,
            max: 16,
            message: '密码长度在6-16字符之间',
            trigger: ['blur']
          }
        ],
        kaptcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur']
          },
          {
            min: 4,
            max: 4,
            message: '请输入4位验证码',
            trigger: ['blur']
          }
        ]
      },
      // 登录状态
      loading: false,
      // 失败动画
      errLogin: false,
      // 失败时的禁用
      disabled: null,
      // 销毁时间
      timer: null
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(
      `%c © 2021 %c Sand %c`,
      'background:#35495e ;font-size:16px ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ;font-size:16px; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    )
    this.random()
    this.refreshCode()
  },
  mounted() {
    if (this.ruleLoginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.ruleLoginForm.password === '') {
      this.$refs.password.focus()
    } else {
      this.$refs.kaptcha.focus()
    }
  },
  computed: {
    rememberMe() {
      return this.$store.getters.rememberMe
    }
  },
  methods: {
    // 随机数用于请求验证码
    random() {
      this.numRandom = Math.round(Math.random() * 80 + 20)
    },
    // 刷新验证码
    refreshCode() {
      this.random()
    },
    handleLogin() {
      this.$message.closeAll()
      this.disabled = true
      this.timer = setTimeout(() => {
        this.disabled = false
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        window.clearTimeout(this.timer) // 此处的timer即 上文const的 timer
      })
      this.$refs.ruleLoginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          console.log(this.ruleLoginForm)
          await this.$store
            .dispatch('user/login', this.ruleLoginForm)
            .then(result => {
              console.log('🚀', result.data)
              const { retCode, retMsg } = result.data
              this.loading = false

              if (retCode === '000000') {
                //   console.log(meta.status)
                setTimeout(() => {
                  this.$notify({
                    title: this.$store.getters.name + '   欢迎回来~ 👏👏👏 ',
                    // message: '登录' + retMsg + '   ' + timeFix(),
                    message: timeFix(),
                    type: 'success',
                    duration: 10000,
                    offset: 40
                  })
                }, 500)

                this.$router.push('/')

                //   // this.refreshCode()
              } else {
                this.errLogin = true
                setTimeout(() => {
                  this.errLogin = false
                }, 1000)
                this.$notify.error({
                  title: retMsg,
                  message: '请重试...',
                  duration: 6000,
                  offset: 40
                })
                this.ruleLoginForm.kaptcha = ''
                this.refreshCode()
              }
            })
            .catch(() => {
              this.errLogin = true
              setTimeout(() => {
                this.errLogin = false
              }, 1000)
              this.ruleLoginForm.kaptcha = ''
              this.refreshCode()
              this.loading = false
            })
        } else {
          this.errLogin = true
          setTimeout(() => {
            this.errLogin = false
          }, 1000)
          return false
        }
      })
    },
    rememberMeChange(e) {
      this.$store.dispatch('user/rememberMe', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: url('~@/assets/login_images/background.png') center center fixed
    no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .login-header {
    position: absolute;
    top: 1%;
    left: 1%;
    .logo {
      display: inline-block;
      vertical-align: middle;
      width: 80px;
    }
    .header-title {
      display: inline-block;
      vertical-align: middle;
      letter-spacing: 5px;
    }
  }
  .login-box {
    margin: 0 auto;
    width: 850px;
    // overflow: hidden;
    border-radius: 5px;
    -webkit-box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    .box-left {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      // overflow: hidden;
      float: left;
      width: 350px;
      min-height: 500px;
      background-color: rgba(64, 158, 255, 0);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .left-img {
        width: 350px;
        height: 500px;
        vertical-align: middle;
        overflow: hidden;
        .img {
          width: 350px;
          height: 500px;
          vertical-align: middle;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        // border-top-left-radius: 5px;
        // border-bottom-left-radius: 5px;
      }
    }
    .box-right {
      min-height: 500px;
      width: 500px;
      background-color: hsla(0, 0%, 100%, 0.9);
      float: right;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      // color: #fff;
      .right-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        min-height: 500px;
        .right-title {
          color: $base-color-default;
          font-weight: 600;
          font-size: 30px;
          text-align: center;
          letter-spacing: 4px;
        }
        .right-main {
          margin: 0 auto;
          width: 65%;
          // overflow: hidden;
          .icon {
            padding-left: 15px;
            color: #889aa4;
            font-size: 16px;
            line-height: 44px;
            // vertical-align: middle;
            // vertical-align: baseline;
            display: inline-block;
            .svg {
              line-height: 44px;
              // vertical-align: -webkit-baseline-middle;
              vertical-align: middle;
            }
          }
          .identify-item {
            display: flex;
            justify-content: space-between;
          }
          .login-code {
            width: 100%;
            height: 44px;
            cursor: pointer;
            // text-align: center;
            // line-height: 44px;
          }
        }
        .right-btn {
          width: 100%;
          // text-align: center;
          display: flex;
          flex-direction: column;
          .btn {
            height: 44px;
            position: relative;
            top: -24px;
            width: 65%;
            margin: 0 auto;
          }
          .checkbox {
            width: 65%;
            margin: 0 auto;
            vertical-align: middle;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 850px) {
  .login-box {
    width: 100% !important;
    padding: 0 30px !important;
    box-sizing: border-box !important;
    box-shadow: none !important;
  }
  .right-main {
    width: 85% !important;
  }
  .btn {
    width: 85% !important;
  }
  .box-left {
    display: none !important;
  }
  .box-right {
    width: 100% !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }
}
// 输入错误动画
.err {
  // animation-fill-mode: shake;
  animation: shake 1s forwards;
}
@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-15px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(15px, 0, 0);
  }
}

.login-box {
  animation: zoomIn 800ms both;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}
</style>
