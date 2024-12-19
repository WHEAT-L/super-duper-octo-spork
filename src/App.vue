<template>
  <div class="about">
    <!-- 路由出口 -->
    <keep-alive  exclude="MiJiaoGouWuChe">
      <router-view :key="$route.fullPath" />
    </keep-alive>

    <!-- 底部栏 -->
    <van-tabbar v-model="active" placeholder v-if="$route.meta.show != false">
      <van-tabbar-item class="table-icon" replace to="/">
        <span>米蕉首页</span>
        <template #icon="">
          <i :class="`iconfont icon-shouye `"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item class="table-icon" replace to="/fenlei">
        <span>分类</span>
        <template #icon=""> <i :class="`iconfont icon-fenlei`"></i> </template>
      </van-tabbar-item>

      <van-tabbar-item class="table-icon" replace to="/miquan">
        <span>圈子</span>
        <template #icon="">
          <i :class="`iconfont icon-quanzi  `"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="table-icon" replace to="/gouwuche">
        <span>购物车</span>
        <template #icon="">
          <i :class="`iconfont icon-gouwuche  `"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="table-icon" replace to="/wode">
        <span>我的</span>
        <template #icon=""> <i :class="`iconfont icon-wode  `"></i> </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      active: Number(localStorage.getItem("indexactive")) || 0,
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  
  computed: {
    Token() {
      return this.$store.state.Tokens;
    },

    users() {
      return this.$store.state.uese;
    },

    userinfo() {
      return this.$store.state.userInfo;
    },

    gouwuche() {
      return this.$store.state.gouwuche;
    },
  },
  methods: {
    ...mapMutations(["getGouwuche","setAPaymentPassword"]),
  },

  created() {
    console.log(JSON.parse(localStorage.getItem(`${this.$store.state.Tokens}`)));

    // this.setAPaymentPassword()
    // this.serveinit()
    this.getGouwuche(JSON.parse(localStorage.getItem(`${this.$store.state.Tokens}`)) ||[]);
  },

  watch: {
    active() {
      localStorage.setItem("indexactive", this.active);
      // console.log(this.active);
    },
    Token(newv) {
      console.log("打印", newv);

      localStorage.setItem("Token", newv);
    },

    userinfo(newV){
      localStorage.setItem('userInfo', JSON.stringify(newV))
    },

    users(newv) {
      console.log("打印", newv);

      localStorage.setItem("uese", JSON.stringify(newv));
    },

    gouwuche(newv) {
      localStorage.setItem(`${this.Token}`, JSON.stringify(newv));
    },
  },
};
</script>

<style lang="less" scoped>
table-icon {
  font-size: 20px;
}
</style>