<template>
  <div class="FLcardIndex">
    <!-- 横版卡片 -->
    <div
      v-if="item.view_type == 'category_group' && item.body.is_expand"
      style="margin-top: 20rem; font-weight: 700"
    >
      <!-- @touchend="clickshadow(item)" -->
      <div
        class="combox"
        v-for="(itm, index) of item.body.product_list"
        :key="index"
        @click="clickshadow(itm)"
      >
        <!-- @touchstart="clickshadow(itm)" -->
      
        <!-- <lazy-component> -->
        <img v-lazy="itm.puzzle_url" />

        <div class="comtext">
          <div>{{ itm.name }}</div>
          <div><span>￥</span> {{ itm.market_price }}</div>
        </div>
        <!-- {{ itm }} -->
      </div>
    </div>

    <!-- 小图标卡片 -->
    <div
      class="rowbox"
      v-if="item.view_type == 'category_group' && !item.body.is_expand"

      
    >
      <div
        class="rowboxitem"
        v-for="(itx, index) of item.body.items"
        :key="index"

        @click="itemgotoSearch(itx.product_name)"
      >
        <!-- <lazy-component> -->

        <img :src="itx.img_url" alt="" />
        <!-- </lazy-component> -->
        <div class="text">{{ itx.product_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
// import { Lazyload } from "vant";

// Vue.use(Lazyload);

// // 注册时可以配置额外的选项
// Vue.use(Lazyload, {
//   lazyComponent: true,
// });

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      shadowdb: false,
    };
  },
  methods: {
    clickshadow(db) {
  
      console.log(db.product_id);

      this.$router.push({
        path: "/ShopBuy",
        query: { id: db.product_id },
      });
      
    },

    itemgotoSearch(Sear) {
      this.$router.push({
        path: "/search",
        query: { text: Sear },
      });
    },
  },
  created() {
    // console.log(this.item.body.product_list
    // );
    // console.log(123123123123123);
  },
};
</script>

<style lang="less" scoped>
// 横版卡片样式
.combox {
  height: 72rem;
  font-size: 14rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: normal;
  background-color: #f8f8f8;
  margin: 10rem 0;
  padding: 0 5rem;
  border-radius: 8px;

  box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);
  .comtext {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    height: 100%;
  }
  img {
    width: 72rem;
    height: 72rem;
  }
}

// 方块卡片样式

.rowbox {
  //   display: flex;
  //   flex-flow: wrap;
  display: grid;
  place-items: center; /* 居中对齐 */
  //   justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  .rowboxitem {
    box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);
    border-radius: 8px;

    width: 72rem;
    height: 72rem;
    background-color: #f8f8f8;

    margin: 10rem 0rem;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;

    .text {
      font-weight: normal;
      width: 60rem;
      text-align: center;
      font-size: 12rem;
      overflow: hidden; /* 隐藏溢出的内容 */
      white-space: nowrap; /* 保持文本在一行内 */
      text-overflow: ellipsis; /* 用省略号表示被隐藏的文本 */
    }
    img {
      width: 50rem;
      height: 50rem;
    }
  }
}
.clicks {
  box-shadow: none;
}
</style>