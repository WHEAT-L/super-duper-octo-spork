<template>
  <div class="loginbck">
    <div class="login">
      <div style="font-weight: 700; font-size: 30rem">米蕉账户登录</div>
      <div class="img">
        <img src="../assets/img/logo2.png" />
      </div>

      <div class="imputbox">
        <input
          v-model="usname"
          type="text"
          class="input-field"
          :placeholder="placeholder.usname"
        />
        <input
          v-model="uspwd1"
          type="password"
          class="input-field"
          :placeholder="placeholder.pwd"
        />
        <input
          v-model="uspwd2"
          type="password"
          class="input-field"
          :class="{ zhuce: zhuce }"
          :placeholder="placeholder.zhuce"
          ref="zhuce"
        />
      </div>

      <div class="btnbox">
        <button class="bt1" @click="login" :class="{ btnal: zhuce }">
          登录
        </button>
        <button @click="zhucemtd" class="bt2" :class="{ btnal: !zhuce }">
          {{ placeholder.zhuce }}
        </button>
      </div>
      <div>让每个人都能享受科技的乐趣</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { Toast } from "vant";
export default {
  data() {
    return {
      zhuce: true,
      placeholder: {
        usname: "请输入用户名",
        pwd: "请输入密码",
        zhuce: "注册",
      },

      //   输入框
      usname: "",
      uspwd1: "",
      uspwd2: "",

      ueseinfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    };
  },
  computed: {
    Token() {
      return this.$store.state.uese;
    },
  },
  methods: {
    ...mapMutations[("pushuserArr", "login")],

    login() {
      if (this.ueseinfo) {
        if (!this.zhuce) {
          this.placeholder = {
            usname: "请输入用户名",
            pwd: "请输入密码",
            zhuce: "注册",
          };
          this.usname = "";
          this.uspwd1 = "";
          this.uspwd2 = "";

          this.zhuce = !this.zhuce;
        } else {
          let ssd = true;
          if (this.ueseinfo) {
            let ttr = this.ueseinfo.find((e) => e.usname == this.usname);
            
            if (ttr) {
              ssd = ttr.uspwd == this.uspwd1;
            } else {
              ssd = false;
            }

          } else {
            ssd = false;
          }

          if (ssd) {
            // this.ueseinfo
            this.$store.commit("login", {
              usname: this.usname,
              uspwd: this.uspwd1,
            });

            console.log(this.Token);

            // if (this.Token) {
            Toast(`登录成功!欢迎您${this.Token.usname}`);
            this.$router.replace(this.$route.query.target);

            this.usname = "";
            this.uspwd1 = "";
            this.uspwd2 = "";
            // } else {
            // }
            // console.log(found, tk);

            console.log("登录事件触发");
          } else {
            Toast("账号或密码错误");
          }
        }
      } else {
        Toast("暂无账号，请先注册");
      }
    },
    zhucemtd() {
      const regex = /^[A-Za-z0-9]+$/;

      if (this.zhuce) {
        this.placeholder = {
          usname: "请输入用户名注册",
          pwd: "请输入密码注册",
          zhuce: "确认密码并注册登录",
        };
        this.usname = "";
        this.uspwd1 = "";
        this.uspwd2 = "";
        this.zhuce = !this.zhuce;
      } else {
        if (regex.test(this.usname)) {
          if (this.usname && this.uspwd1 && this.uspwd2) {
            if (this.uspwd1 === this.uspwd2) {
              let ssd = true;
              if (this.ueseinfo) {
                ssd = this.ueseinfo.find((e) => e.usname == this.usname);
                console.log("数组", this.ueseinfo);
              } else {
                ssd = false;
              }

              if (ssd) {
                Toast("该账号已存在");
              } else {
                this.$store.commit("pushuserArr", {
                  usname: this.usname,
                  uspwd: this.uspwd1,
                });

                console.log(`${btoa(this.usname)}Mijiao${this.uspwd1}`);

                (this.ueseinfo =
                  JSON.parse(localStorage.getItem("userInfo")) || null),
                  Toast("账号注册成功!请登录！");

                this.zhuce = !this.zhuce;
                this.placeholder = {
                  usname: "请输入用户名",
                  pwd: "请输入密码",
                  zhuce: "注册",
                };

                // this.usname = "";
                // this.uspwd1 = "";
                this.uspwd2 = "";
                console.log(
                  "注册事件触发",
                  this.usname,
                  this.uspwd1,
                  this.uspwd2
                );
              }
            } else {
              Toast("两次密码不一致");
            }
          }
        } else {
          Toast("账号或者密码中只能包含数字和字母");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.loginbck {
  color: aliceblue;

  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: space-evenly;
  background: url("@/assets/img/logbck2.png") center center no-repeat;
  background-size: auto 100vh;
}

.login {
  height: 100vh;
  width: 100vw;

  background-color: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  backdrop-filter: blur(2px); /* 背景模糊效果 */

  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: space-evenly;

  .img {
    width: 60rem;
    height: 60rem;
    background-color: rgba(255, 255, 255, 0.1); /* 半透明背景 */
    overflow: hidden;
    border-radius: 20rem;
    img {
      transform: translate(-15rem, -14rem);

      height: 90rem;
      width: 90rem;
    }
  }
}

// 登录框
.input-field {
  width: 50vw;
  padding: 15px 20px; /* 内边距 */
  margin: 10px 0; /* 外边距 */
  border: none; /* 无边框 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景颜色 */
  color: #000000; /* 文本颜色 */
  font-size: 16px; /* 字体大小 */
  outline: none; /* 去除焦点时的轮廓线 */
  border-radius: 25px; /* 圆角边框 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  transition: all 0.3s ease; /* 平滑过渡效果 */

  transform: translate(0);

  &:focus {
    background-color: rgba(255, 255, 255, 1); /* 聚焦时背景颜色 */
    width: 60vw;
  }

  &::placeholder {
    color: #5f5f5f; /* 占位符文本颜色 */
  }

  margin: 10rem;
}

.btnbox {
  width: 70vw;
  height: 50rem;
  display: flex;
  button {
    height: 50rem;
    flex-grow: 1;
    border: none;
    background-color: rgba(255, 255, 255, 0.2); /* 半透明背景 */
    backdrop-filter: blur(2px); /* 背景模糊效果 */

    transition: all 0.5s ease;
  }
  .bt1 {
    width: 52rem;
    border-radius: 25rem 0 0 25rem;
  }
  .bt2 {
    width: 52rem;
    overflow: hidden;
    white-space: nowrap;

    border-radius: 0 25rem 25rem 0;
  }

  .btnal {
    flex-grow: 8;
    overflow: hidden;
    white-space: nowrap;
    background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
    color: #5f5f5f;
  }
}

.imputbox {
  width: 80vw;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.zhuce {
  transform: translateX(-200%);
}
</style>