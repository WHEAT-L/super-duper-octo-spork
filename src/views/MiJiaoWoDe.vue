<template>
  <div class="WoDemain">
    <!-- 用户信息 -->
    <div class="login" @click="gotologin">
      <div class="userBox">
        <div class="avatarBox">
          <van-image v-if="false"></van-image>
          <div class="avatar">
            <div
              class="iconfont icon-yonghutouxiang"
              style="font-size: 30rem"
            ></div>
          </div>
        </div>

        <div class="usename">{{ ueses.usname }}</div>
      </div>
    </div>

    <!-- 订单 -->
    <div class="orders">
      <div>我的订单</div>

      <div>全部订单</div>
    </div>

    <!-- 订单相关功能 -->
    <div class="orderFunction">
      <div class="od">
        <span class="iconfont icon-dingdandaifukuan"></span>
        <div class="text">待付款</div>
      </div>
      <div class="od">
        <span class="iconfont icon-31daishouhuo"></span>
        <div class="text">待收货</div>
      </div>
      <div class="od">
        <span class="iconfont icon-tuihuanxiu"></span>
        <div class="text">退换货</div>
      </div>
    </div>

    <!-- 小功能 -->

    <div class="gonnengBigBox">
      <div class="gonneng-box">
        <div class="icon">
          <span style="color: #fdcf62" class="iconfont icon-huiyuan"></span>
          <div class="text">会员中心</div>
        </div>
        <div class="icon">
          <span style="color: #51bbe0" class="iconfont icon-wodeyouhui"></span>
          <div class="text">我的优惠</div>
        </div>
        <div class="icon">
          <span
            style="color: #f96c5e"
            class="iconfont icon-fuwuzhongxin"
          ></span>
          <div class="text">服务中心</div>
        </div>
      </div>
      <div class="gonneng-box">
        <div class="icon">
          <span style="color: #ff8b43" class="iconfont icon-liwu"></span>
          <div class="text">礼包码兑换</div>
        </div>
        <div class="icon" @click="gotoSetUp">
          <span style="color: #818c99" class="iconfont icon-shezhi"></span>
          <div class="text">设置</div>
        </div>
        <div class="icon">
          <span style="color: #ffb320" class="iconfont icon-dingwei"></span>
          <div class="text">我的地址</div>
        </div>
      </div>
    </div>



  </div>
</template>
  
















  <script>
export default {
  methods: {
    gotologin() {
      this.$router.push({
        path: "/LoGin", // 使用正确的 key: value 格式
        query: {
          target: this.$route.fullPath, // 假设 to 是当前组件的属性
        },
      }); // 移除多余的逗号
    },


    gotoSetUp() {
      this.$router.push({
        path: "/setup", 
      });
    },
  },
  computed: {
    ueses() {
      return this.$store.state.uese;
    },
  },
};
</script>
  
  <style lang="less" scoped>
.WoDemain {
  background-color: #f5f5f5;
  height: 100vh;
}

//   顶部头像盒子

.login {
  width: 100vw;
  height: 15vh;
  background: url("@/assets/img/loginBackground.png") center center;
  background-size: 100vw 80vh;
  display: flex;

  align-items: flex-end;
  .userBox {
    height: 40rem;
    width: 100vw;

    background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 背景模糊效果 */
    border: 1px solid rgba(167, 167, 167, 0.5);
    border-bottom: none;
    display: flex;
    padding: 0 25rem;
    border-radius: 10rem 10rem 0 0;

    .usename {
      line-height: 40rem;
      padding-left: 20rem;

      margin: 0 auto;
    }

    .avatarBox {
      background-color: aliceblue;
      width: 15vw;
      height: 15vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10vw;
      border: 1px solid #8d8b8b;
      margin-top: -22rem;
    }
  }
}

// 订单

.orders {
  width: 100vw;
  box-sizing: border-box;
  height: 40rem;
  background-color: #8d8b8b;
  display: flex;
  justify-content: space-between;
  padding: 0 20rem;
  align-items: center;
  font-size: 15rem;

  background-color: rgba(255, 255, 255, 0.6); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border: 1px solid rgba(167, 167, 167, 0.5);
  border-top: none;
  border-radius: 0 0 10rem 10rem;
}

// 订单相关功能
.orderFunction {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 90rem;
  // background-color: aquamarine;
  margin: 10rem 0;
  padding: 0 20rem;
  box-sizing: border-box;

  background-color: rgba(255, 255, 255, 0.6); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border: 1px solid rgba(167, 167, 167, 0.5);

  border-radius: 10rem;

  .od {
    width: 80rem;
    height: 80rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    span {
      font-size: 30rem;
      color: #8d8b8b;
    }

    .text {
      font-size: 35;
    }
  }
}

// 其他功能
.gonnengBigBox {
  padding: 10rem 0;
  .gonneng-box {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .icon {
      width: 80rem;
      height: 80rem;

      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-flow: column;
      span {
        font-size: 25rem;
      }
      .text {
        font-size: 16rem;
      }
      margin: 10rem 0;
    }
  }

  background-color: rgba(255, 255, 255, 0.6); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border: 1px solid rgba(167, 167, 167, 0.5);
  margin: 5rem 0;

  border-radius: 10rem;
}
</style>