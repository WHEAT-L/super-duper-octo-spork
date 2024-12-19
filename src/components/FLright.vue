<template>
  <div class="indexBox">
    <div v-for="(item, index) in FLrightRes" :key="index">


      <div
        class="titleImg"
        v-if="item.view_type == 'cells_auto_fill'"
      >
        <img :src="item.body.items[0].img_url" alt="" />
      </div>

      
      <div
        class="combox"
        v-if="item.view_type == 'category_title'"
        style="margin-top: 20rem; font-weight: 700"
      >
        {{ item.body.category_name }}
      </div>



      <FLmerchandiseCard :item="item" v-if="item.view_type == 'category_group'"> </FLmerchandiseCard>
    </div>
  </div>
</template>

<script>
import FLmerchandiseCard from "./FLmerchandiseCard.vue";

export default {
  components: {
    FLmerchandiseCard,
  },

  props: {
    FLrightRes: Array,
  },
  data() {
    return {};
  },
  created() {},
  watch: {
    FLrightRes(newV) {
      console.log(newV[0]);
    },
  },
};
</script>


<style lang="less" scoped>
// 标题图片
.titleImg {
    border-radius: 8rem;
  box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);
  height: 76.5rem;

  img {
  height: 76.5rem;

    width: 100%;
  }
}

.indexBox {
  width: 295rem;
  height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;

  background-color: #fff;
}
</style>