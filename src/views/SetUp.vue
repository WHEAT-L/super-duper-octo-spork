<template>
  <div class="SetUpbox">
    <div class="switchAccounts-box">
      <div class="title items">切换账号</div>

      <div
        class="items"
        v-for="(it, index) of uesesitem"
        :key="index"
        @click="han(it)"
      >
        <span v-if="it.token == tokens" class="current">当前账号</span> @{{
          it.usname
        }}.163.com
      </div>
    </div>

    <div class="exit" @click="han({})">退出登录</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["handoff"]),

    han(its) {
      this.handoff(its);

      setTimeout(() => {
        this.$router.replace({
          path: "/", // 使用正确的 key: value 格式
        }); // 移除多余的逗号
      }, 2500);
    },
  },

  computed: {
    uesesitem() {
      return this.$store.state.userInfo;
    },

    tokens() {
      return this.$store.state.Tokens;
    },
  },
};
</script>

<style lang="less" scoped>
.SetUpbox {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20rem;
  box-sizing: border-box;

  .switchAccounts-box {
    width: 100%;
    height: 60vh;
    border-radius: 15rem;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0.6); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 背景模糊效果 */
    border: 1px solid rgba(167, 167, 167, 0.5);

    overflow-y: scroll; /* 允许垂直滚动 */
    scrollbar-width: none; /* 针对Firefox隐藏滚动条 */
    -ms-overflow-style: none; /* 针对IE和Edge隐藏滚动条 */

    margin-bottom: 20rem;
    .items {
      width: 100%;
      height: 40rem;
      border-bottom: 1px solid #ccc;
      text-align: center;
      color: cornflowerblue;
      display: flex;
      align-items: center;
      justify-content: center;

      position: relative;
    }

    .title {
      font-weight: 700;
      color: black;
      position: sticky;
      top: 0;
    }
  }

  .exit {
    width: 100%;
    font-size: 18rem;

    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(255, 255, 255, 0.6); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 背景模糊效果 */
    border: 1px solid rgba(167, 167, 167, 0.5);

    border-radius: 15rem;
    color: rgb(250, 56, 56);
    font-weight: 700;
  }

  .current {
    font-size: 12rem;
    padding: 8rem;
    border-radius: 20rem;
    border: 1px solid red;
    color: rgb(250, 56, 56);

    margin-right: 20rem;

    position: absolute;
    top: 50%;
    left: 5rem;

    transform: translateY(-50%);
  }
}


</style>