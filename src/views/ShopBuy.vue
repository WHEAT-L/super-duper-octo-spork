<template>
  <div class="buybigbox">
    <!-- <div v-for="item in buyAllObj.data.data" :key="item"></div> -->

    <!-- 购物车弹出层 -->
    <van-popup :style="{ height: '70%' }" v-model="show1" position="bottom" round close-icon="close" class="popupbox">
      <!-- 信息 -->
      <div class="information">
        <van-image :src="buyAllObj?.goods_info[it2]?.image_share" class="imgs">
        </van-image>
        <div class="right">
          <div style="color: #ff701f">
            <span>￥</span><span style="font-size: 25rem">{{ printset }}</span>
          </div>

          <div class="title">
            {{ buyAllObj?.product_info.name }}
            {{ buy_option1[it1]?.name }}
            {{ buy_option2[it2]?.name }}
          </div>
        </div>
      </div>
      <!-- 地区 -->
      <div class="lochbox" @click="locshow = true">
        <span> <span class="iconfont icon-dingwei"></span>{{ loc }} </span>
        <span class="iconfont icon-qianwang"></span>
      </div>
      <!-- 规格选择 -->
      <div>
        <div>
          <div class="title">{{ buyAllObj?.buy_option[0]?.name }}</div>
          <div class="buy_option">
            <div v-for="(item, index) in buy_option1" :key="item?.prop_value_id" @click="it1 = index" class="popitem"
              :class="{ act: index == it1 }">
              {{ item?.name }}
            </div>
          </div>

          <div class="title">{{ buyAllObj?.buy_option[1]?.name }}</div>
          <div class="buy_option">
            <div v-for="(item, index2) in buy_option2" :key="item?.prop_value_id" @click="it2 = index2" class="popitem"
              :class="{ act: index2 == it2 }">
              {{ item?.name }}
            </div>
          </div>

          <!-- 数量 -->
          <div class="numbox">
            <div class="title">数量</div>
            <van-stepper v-model="num" integer min="1" />
          </div>
        </div>

        <van-goods-action>
          <van-goods-action-button type="warning" text="加入购物车" @click="addgouwuche" />
          <!-- <van-goods-action-button type="danger" text="立即购买" /> -->
        </van-goods-action>
      </div>
    </van-popup>

    <!-- 地区弹出层 -->

    <!-- 地址选择 -->

    <van-popup v-model="locshow" title round class="popup-loc" style="width: 90vw">
      <van-area title="选择地区" :area-list="areaList" @cancel="locshow = false" @confirm="locOut" />
    </van-popup>


    <!-- 骨架屏 -->
    <van-skeleton title :row="30" animate :loading="skeleton" />

    <!-- 主体内容 -->
    <template v-if="!skeleton">
      <!-- 轮播图 -->
      <div>
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item width="100vw" v-for="(image, index) in buyAllObj?.goods_share_datas.gallery_view"
            :key="index">
            <van-image :src="image.img_url" style="width: 100vw" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 商品信息盒子 -->
      <div class="goods_info">
        <div class="goodsT1">
          <!-- 价格 -->
          <div class="price">
            <span>￥</span><span style="font-size: 25rem">{{ printset }}</span>
          </div>
          <!-- 优惠 -->
          <div class="discount">
            <div class="left">
              预计得到{{ (buyAllObj?.goods_info[0]?.price * 0.1).toFixed(0) }}米金
            </div>
            <div class="right">更多优惠></div>
          </div>
          <!-- 商品名字 -->
          <div class="name">{{ buyAllObj?.product_info.name }}</div>
          <!--介绍 -->
          <ol class="sell">
            <li v-for="(pod, index) of buyAllObj?.product_info.sell_point_desc" :key="index">
              <span class="text"></span>
              {{ pod }}
            </li>
          </ol>

          <!-- top -->
          <!-- <div>
          <div
            v-for="(item, index) in buyAllObj?.goods_tpl_datas[0].sections"
            :key="index"
          >
            <div v-if="view_type == 'rank_list'">
              {{ item.name }}
            </div>
          </div>
        </div> -->
        </div>

        <!-- 商品参数 -->
        <div class="goodsT2" v-if="buyAllObj?.goods_info[0].class_parameters.list">
          <div v-for="(item, index) of buyAllObj?.goods_info[0].class_parameters
            .list" :key="index">
            <div v-if="item.is_page_show" class="items">
              <van-image lazy-load :src="item.icon" class="icon"></van-image>

              <div class="title">{{ item.top_title }}</div>
              <div class="text">{{ item.value }}</div>
            </div>
          </div>
        </div>

        <!-- 选择型号 -->
        <div class="goodsT3">
          <div class="box1">
            <span>已选</span>
            <div class="items1" @click="show1 = true">
              <div class="title" style="font-size: 13rem">
                {{ buyAllObj?.product_info.name }}
                {{ buy_option1[it1]?.name }}
                {{ buy_option2[it2]?.name }}
                <div style="color: #ff701f">可选增值服务</div>
              </div>

              <div class="imgbox">
                <div v-for="(imgss, index) of buyAllObj?.goods_info?.slice(0, 4)" :key="index">
                  <van-image :src="imgss.image_share" class="img"></van-image>
                </div>
                <div class="imgtext">
                  <span style="margin: 0">共{{ buy_option2?.length }}种</span>
                  <span style="margin: 0">颜色可选</span>
                </div>
              </div>
            </div>

            <span class="iconfont icon-qianwang"></span>
          </div>

          <!-- 选地区 -->
          <div class="box2">
            <span>地区</span>
            <div class="items2" @click="locshow = true" style="font-size: 13rem">
              <div><span class="iconfont icon-dingwei"></span> {{ loc }}</div>

              <div v-if="loc != `请选择地区`">
                <span style="
                  color: #ff701f;
                  transform: translateX(-10rem);
                  margin-right: 5rem;
                ">有现货</span>
                <span style="font-size: 10rem"><span class="iconfont icon-jinggao"
                    style="font-size: 10rem"></span>今天23点前付款，预计{{ dates }}发货</span>
              </div>
            </div>
            <span class="iconfont icon-qianwang"></span>
          </div>
          <!-- <div class="box3">
          <span>服务</span>
          <div class="items3"></div>
        </div> -->
        </div>
      </div>

      <!-- 底部购物栏 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />

        <van-goods-action-button type="warning" text="加入购物车" @click="show1 = true" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>

    </template>
  </div>
</template>
























<script>
import { getbuyitem } from "../api/index";
import { areaList } from "@vant/area-data";

import { Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      areaList,

      // 所有信息数组
      buyAllObj: null,
      //   图片数组
      imgArr: null,

      // 商品款式数据
      buy_option1: [null],
      buy_option2: [null],
      // 数量
      num: 1,

      it1: 0,
      it2: 0,
      // 选项数组
      itemArr: [null, null],

      // 地区数据
      loc: `请选择地区`,
      locshow: false,
      dates: ``,

      // 弹出层
      show1: false,

      // 骨架屏
      skeleton: true,
    };
  },
  computed: {
    printset() {
      let stt = this?.buy_option1[this.it1]?.price.replace(/\D/g, "");

      // 将结果转换为数值
      if (Number(stt) == 0) {
        return 2999;
      } else {
        return Number(stt);
      }
    },

    Token() {
      return this.$store.state.Tokens;
    },
  },

  methods: {
    ...mapMutations(["gouwuchepush"]),
    // 选择地区
    locOut(e) {
      this.loc = e
        .map((it) => {
          return it.name;
        })
        .join("  ");
      this.locshow = false;
      this.formatTimestampToDate();
    },

    // 转换时间戳
    formatTimestampToDate() {
      const date = new Date(Date.now());
      console.log(date);

      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，所以加1
      const day = (date.getDate() + 1).toString().padStart(2, "0");
      // 返回格式为 "XX月XX日"
      this.dates = `${month}月${day}日`;
    },

    setItemArrs() {
      console.log("xinxi", this.buyAllObj?.buy_option);

      // this.buyAllObj?.buy_option.forEach((item, index) => {
      //   item.list.forEach((item2, index2) => {
      //     if (index2 == this.it1) {
      //       this.itemArr[0] == item2[this.it1];
      //     } else if (index2 == this.it2 && index == 2) {
      //       this.itemArr[1] == item[this.it2];
      //     }
      //   });
      // });

      console.log(this.itemArr);
    },

    // 加入购物车成功
    addgouwuche() {
      if (this.Token) {
        console.log("添加购物车", this.itemArr);

        let shop = {
          specification: `${this.buyAllObj?.product_info.name}${this.buy_option1[this.it1]?.name
            }${this.buy_option2[this.it2]?.name}`,
          imgs: this.buyAllObj?.goods_info[this.it2]?.image_share,
          price: +this.printset,
          name: this.buyAllObj?.product_info.name,
          shipments: false,
          qianshou: 'gouwuche',
          id: this.$route.query.id,
          check: false,
          // ddid: `${Date.now()}${this.$route.query.id}`,
          num: this.num,
        };

        this.gouwuchepush(shop);

        console.log(shop);
        this.num = 1;
        this.show1 = false;
        Toast("添加购物车成功");
      } else {
        Toast("请先登录");
        this.$router.push({
          path: "/LoGin", // 使用正确的 key: value 格式
          query: {
            target: this.$route.fullPath, // 假设 to 是当前组件的属性
          },
        }); // 移除多余的逗号
      }
    },
  },
  created() {
    this.skeleton = true
    getbuyitem(this.$route.query.id).then((res) => {
      console.log(res);

      this.buyAllObj = res.data.data;

      this.buy_option1 = res.data.data.buy_option[0].list;
      this.buy_option2 = res.data.data.buy_option[1].list;

      console.log("款式", this.buy_option1, this.buy_option2);


      this.skeleton = false
      // this.setItemArrs();
    });
  },
};
</script>




































<style lang="less" scoped>
// 整体组件盒子
.buybigbox {
  width: 100vw;

  background-color: #f5f5f5;

  padding-bottom: 30rem
}

// 第一个信息框

.goods_info {
  width: 100vw;
  display: flex;
  //   justify-content: space-between;
  flex-flow: column;
  align-items: center;
  margin: 10rem 0;
  //   padding: 0 10px;

  padding-bottom: 20rem;

  .goodsT1 {
    width: 345rem;
    // margin: 20rem 0;
    border-radius: 8rem;
    background-color: white;

    padding: 20rem 10rem;

    .price {
      display: flex;
      align-items: center;
      color: #ff591f;
    }

    .discount {
      background-color: #fff3f0;
      padding: 10rem;
      display: flex;
      align-items: center;
      font-size: 10rem;
      color: #ff591f;
      border-radius: 5rem;

      justify-content: space-between;

      .left {}
    }

    .name {
      font-weight: 700;
      margin: 15rem 0;
    }

    .sell {
      font-size: 12rem;

      li {
        margin: 10rem 0;
      }
    }
  }

  .goodsT2 {
    width: 345rem;
    margin: 10rem 0;
    border-radius: 8rem;
    background-color: white;

    padding: 20rem 10rem;

    display: flex;

    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
      /* 隐藏滚动条 */
    }

    .items {
      width: 73rem;
      height: 60rem;
      font-size: 14rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: column;

      margin: 0 10rem;

      .icon {
        width: 20rem;
        height: 20rem;
      }

      .text {
        width: 73rem;
        text-align: center;

        font-size: 14rem;
        color: #afafaf;

        white-space: nowrap;
        /* 保持文本在一行显示 */
        overflow: hidden;
        /* 隐藏溢出的文本 */
        text-overflow: ellipsis;
        /* 用省略号表示溢出的文本 */
      }
    }
  }

  .goodsT3 {
    width: 345rem;
    // margin: 20rem 0;
    border-radius: 8rem;
    background-color: white;

    padding: 20rem 10rem;

    .box1,
    .box2,
    .box3 {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10rem;

      span {
        // margin-right: 10rem;
      }

      .items1 {
        width: 70vw;
      }

      .items2 {
        height: 30rem;
        width: 70vw;
      }
    }
  }
}

// 选择款式弹出层

.popupbox {
  box-sizing: border-box;
  padding: 15rem;
  padding-bottom: 55rem;

  .imgs {
    width: 20vw;
    height: 20vw;
    background-color: #f5f5f5;
    border-radius: 5rem;
  }

  .information {
    position: sticky;
    top: 15rem;
    left: 15rem;
    background-color: white;
    padding-bottom: 20rem;

    display: flex;

    .right {
      padding-left: 20rem;
      display: flex;
      justify-content: space-evenly;
      flex-flow: column;

      .title {
        font-size: 13rem;
      }
    }
  }

  // 地区
  .lochbox {
    width: 100%;
    background-color: #f8f8f8;
    padding: 10rem;
    margin: 10rem 0;
    margin-top: 20rem;
    font-size: 13rem;
    border-radius: 5rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // 款式
  .title {
    margin: 5rem 0;
  }

  .buy_option {
    display: flex;
    flex-flow: wrap;
    margin-bottom: 20rem;

    .popitem {
      font-size: 11rem;

      padding: 8rem 12rem;
      border-radius: 15rem;
      background-color: #f8f8f8;
      margin: 5rem 10rem;
    }

    .act {
      border: 1px solid #ff591f;
      color: #ff591f;
      background-color: #fff2eb;
      box-sizing: border-box;
    }
  }

  // 数量
  .numbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20rem 0;

    .num {
      display: flex;
      align-items: center;
      justify-content: space-between;

      height: 40rem;
      border-radius: 5rem;
      background-color: #f8f8f8;

      margin-top: 20rem;
    }
  }
}

// 预览图片样式

.imgbox {
  display: flex;
  width: 80vw;

  .img {
    width: 40rem;
    height: 40rem;
    margin: 0 5rem;
    border-radius: 5rem;
    background-color: #f8f8f8;
  }

  .imgtext {
    width: 60rem;
    height: 40px;
    font-size: 12rem;
    // border: 1px solid;
    color: #808080;
    background-color: #f8f8f8;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    border-radius: 5rem;
  }
}
</style>