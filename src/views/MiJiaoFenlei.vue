<template>
  <div>
   


    <van-skeleton title :row="30" animate :loading="skeleton"  />

      <div class="inputbox" @click="gotoSearch">
        <div>
          <img src="" alt="" />
        </div>
        <div class="input">
          <span class="iconfont icon-sousuo" style="font-size: 20rem; margin: 20rem"></span>
          <h2 style="
            font-size: 13rem;
            width: 200rem;
            text-align: center;
            color: #afafaf;
          ">
            请输入搜索内容
          </h2>
        </div>
      </div>

      <!-- 主体盒子 -->
      <div class="FenLeibox">
        <!-- 左边菜单栏 -->
        <div class="FLleftbox">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item style="padding: 12px 12px; text-align: center" v-for="fenlei of fenleiList"
              :title="fenlei.category_name" :key="fenlei.block_id" />
          </van-sidebar>
        </div>

        <!-- 右边内容盒子 -->
        <div class="FLrightbox">
          <div class="content">
            
            <FLright :FLrightRes="FLrightRes" v-if="!skeleton"></FLright>

          </div>
        </div>
      </div>

  </div>
</template>

<script>
// import { Notify } from "vant";
import { getfenlei, getfenleirght } from "@/api/index";
import FLright from "@/components/FLright";

export default {
  components: {
    FLright,
  },
  data() {
    return {
      activeKey: 0,
      fenleiList: null,
      skeleton: true,
      FLrightRes: null,
    };
  },
  methods: {
    onChange(index) {
      // Notify({ type: "primary", message: index });
      // console.log(index);

      getfenleirght(this.fenleiList[index].category_id).then((res) => {
        // console.log(res);
        this.FLrightRes = res.data.data[0].category_list;
      });
    },
    gotoSearch() {
      this.$router.push({
        path: "/search",
      });
    },


    
  },
  created() {
    // console.log(getfenlei);
    this.skeleton= true

    getfenlei().then((res) => {
      // console.log(res.data.data);
      this.fenleiList = res.data.data;
      getfenleirght(this.fenleiList[0].category_id).then((res) => {
        // console.log(res);
        this.FLrightRes = res.data.data[0].category_list;

        this.skeleton= false
      });
    });
  },
};
</script>






<style lang="less" scoped>
// 输入框内容
.inputbox {
  width: 100vw;
  height: 50rem;
  background-color: #ffffff;
  // padding: 10rem 20rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid rgba(197, 197, 197, 0.1);

  .input {
    width: 340rem;
    height: 30rem;
    display: flex;
    align-items: center;

    background-color: #f7f7f7;
    border-radius: 15rem;
  }
}

// 自定义左边菜单样式
.van-sidebar {
  width: 80rem;
}

// 菜单盒子
.FenLeibox {
  display: flex;
  justify-content: space-between;
}

// 左边菜单
.FLleftbox {
  height: 85vh;
  background-color: #f7f7f7;
  width: 79rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>