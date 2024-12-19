<template>
  <!-- 顶部搜索框 -->
  <div>
    <div class="inputbox">
      <div class="imgboxbacc">
        <img src="@/assets/img/logo2.png" alt="" />
      </div>
      <div class="input" @click="gotoSearch">
        <span class="iconfont icon-sousuo" style="font-size: 20rem; margin: 20rem"></span>
        <h2 style="
            font-size: 13rem;
            width: 165rem;
            text-align: center;
            color: #afafaf;
          ">
          请输入搜索内容
        </h2>
      </div>
    </div>
    <!-- 骨架屏 -->

    <van-skeleton title :row="20" animate :loading="skeleton" />



    <!-- 选项卡 -->
    <van-tabs v-model="active" animated style="font-size: 20rem" @click="runtabs(tabArr[active].page_id)">
      <van-tab v-for="(tab, index) in tabArr" :title="tab.name" :key="index">



        <!-- 推荐页 -->
        <div v-if="tab.name == '推荐'">
          <div v-for="(item, index) in TuiJian" :key="index">
            <!-- 轮播图 -->
            <van-swipe class="my-swipe" :autoplay="3000" width="100vw" v-if="item.view_type == 'gallery'">
              <van-swipe-item width="100vw" v-for="(image, index) in item.body.items" :key="index">
                <img :src="image.img_url" />
              </van-swipe-item>
            </van-swipe>

            <!-- 小图标 -->
            <div v-if="item.view_type == 'cells_auto_fill'">
              <div v-if="item.stat == 'home_king_kong'" class="TJicon">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <div class="iconbox">
                    <img :src="item.img_url" alt="" />
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="doubleImg">
                  <div v-for="(item, index) in item.body.items" :key="index">
                    <div class="iconbox">
                      <img :src="item.img_url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 双排商品 -->
            <div class="shopcart" v-if="item.view_type == 'list_two_type13'">
              <div class="shopitem" v-for="(shop, index) in item.body.items" :key="index">
                <img :src="shop.img_url" alt="" />
                <div>{{ shop.product_name }}</div>
                <div class="text">{{ shop.product_brief }}</div>
                <div class="price">
                  ￥{{ shop.product_price }}
                  <span style="font-size: 12rem">起</span>
                </div>

                <button class="btns" @click="gotobuy(shop.product_id)">
                  立即购买
                </button>
              </div>
            </div>

            <!-- 更多 -->

            <div v-if="
              item.view_type == 'list_action_title' &&
              item.stat == 'list_action_title'
            ">
              <div class="titlesss" :class="{ no1: item.spm_c == '3542248' }">
                {{ item.body.items[0].action_title }} &gt;
              </div>
            </div>

            <!-- {{item}} -->
          </div>
        </div>

        <!-- 智能页 -->
        <div v-if="tab.name == '智能'">
          <div v-for="(item, index) in TuiJian" :key="index">
            <!-- 轮播图 -->
            <van-swipe class="my-swipe" :autoplay="3000" width="100vw" v-if="item.view_type == 'gallery'">
              <van-swipe-item width="100vw" v-for="(image, index) in item.body.items" :key="index">
                <img :src="image.img_url" />
              </van-swipe-item>
            </van-swipe>

            <!-- 小图标 -->
            <div v-if="item.view_type == 'cells_auto_fill'">
              <div v-if="item.body.h == 152" class="TJicon">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <div class="iconbox">
                    <img :src="item.img_url" alt="" />
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="doubleImg">
                  <div v-for="(item, index) in item.body.items" :key="index">
                    <div class="iconbox">
                      <img :src="item.img_url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 更多 -->

            <div v-if="
              item.view_type == 'list_action_title' &&
              item.stat == 'list_action_title'
            ">
              <div class="titlesss" :class="{ no1: item.spm_c == '3542248' }">
                {{ item.body.items[0].action_title }} &gt;
              </div>
            </div>

            <!-- 三列商品  -->
            <div v-if="item.view_type == 'list_three_type4'" class="ZNitem">
              <div v-for="(ZNitem, index) in item.body.items" :key="index" class="ZNitembox"
                @click="gotobuy(ZNitem.product_id)">
                <img :src="ZNitem.img_url" alt="" />
                <div class="title">{{ ZNitem.product_name }}</div>
                <div class="text">{{ ZNitem.product_brief }}</div>
                <div class="price">
                  ￥{{ ZNitem.product_price }}
                  <span style="font-size: 12rem">起</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 电视页 -->
        <div v-if="tab.name == '电视'">
          <div v-for="(item, index) in TuiJian" :key="index">
            <!-- 小图标 -->
            <div v-if="item.view_type == 'cells_auto_fill'">
              <div v-if="item.body.h == 152" class="TJicon">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <div class="iconbox">
                    <img :src="item.img_url" alt="" />
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="doubleImg">
                  <div v-for="(item, index) in item.body.items" :key="index">
                    <div class="iconbox">
                      <img :src="item.img_url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 双排商品 -->
            <div class="shopcart" style="padding: 10rem 0; margin: 0; background-color: #ffae99"
              v-if="item.view_type == 'list_two_type14'">
              <div class="shopitem" v-for="(shop, index) in item.body.items" :key="index"
                style="background-color: white" @click="gotobuy(shop.product_id)">
                <img :src="shop.img_url" alt="" />
                <div>{{ shop.product_name }}</div>
                <div class="text">{{ shop.product_brief }}</div>
                <div class="price">
                  ￥{{ shop.product_price }}
                  <span style="font-size: 12rem">起</span>
                </div>

                <button class="btns">立即购买</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 家电页 -->
        <div v-if="tab.name == '家电'" style="background-color: #e34039">
          <div v-for="(item, index) in TuiJian" :key="index">
            <!-- 小图标 -->
            <div v-if="item.view_type == 'cells_auto_fill'">
              <div v-if="item.stat == 'home_king_kong'" class="TJicon">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <div class="iconbox">
                    <img :src="item.img_url" alt="" />
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="doubleImg">
                  <div v-for="(item, index) in item.body.items" :key="index">
                    <div class="iconbox" style="margin: 0; padding: 0">
                      <img :src="item.img_url" alt="" />

                      <h2 style="
                          margin: 0;
                          background-color: #e34039;
                          text-align: center;
                          color: white;
                          width: 100vw;
                          padding: 30rem 0;
                        ">
                        活动已结束!榜单暂未出炉!
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 笔记本页 -->
        <div v-if="tab.name == '笔记本'">
          <div v-for="(item, index) in TuiJian" :key="index">
            <!-- 小图标 -->
            <div v-if="item.view_type == 'cells_auto_fill'">
              <div v-if="
                (item.body.w == 720 && item.block_id == '3578875') ||
                item.block_id == '3578876' ||
                item.block_id == '3578877'
              " class="TJicon">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <div class="iconbox">
                    <img :src="item.img_url" alt="" style="width: 50vw" />
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="doubleImg">
                  <div v-for="(item, index) in item.body.items" :key="index">
                    <div class="iconbox" style="margin: 0; padding: 0">
                      <img :src="item.img_url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 大屏商品图 -->

            <div v-if="item.view_type == 'list_one_type14'" class="bigshopcart">
              <div v-for="(BJBitem, index) in item.body.items" :key="index" class="BJBitems">
                <div class="BJBbox" style="background-color: white">
                  <img :src="BJBitem.img_url" alt="" />
                  <div class="BJBtext">
                    <div class="BJBtext1">
                      <div>{{ BJBitem.product_name }}</div>
                      <div>{{ BJBitem.product_brief }}</div>
                    </div>
                    <div class="BJBtext2">
                      <div class="price">
                        ￥{{ BJBitem.product_price }}
                        <span style="font-size: 12rem">起</span>
                      </div>
                      <button class="btns">暂时无货</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getindex } from "@/api/index";
export default {
  data() {
    return {
      active: 0,
      // 选项卡数组
      tabArr: null,
      //   推荐页数组
      TuiJian: null,

      // 骨架屏
      skeleton: true,
    };
  },
  methods: {
    // 前往搜索
    gotoSearch() {
      this.$router.push({
        path: "/search",
      });
    },

    // 切换选项卡方法
    runtabs(idx) {
      console.log(idx);

      getindex(idx).then((res) => {
        this.skeleton = true
        this.TuiJian = null
        if (res.data.data.data.sections) {
          this.TuiJian = res.data.data.data.sections;
          console.log("切换视图", this.TuiJian);
          this.skeleton = false
        }

        console.log(res.data.data.data);
      });
    },


    // 前往商品详情
    gotobuy(ids) {
      this.$router.push({
        path: "/ShopBuy",
        query: { id: ids },
      });
      console.log(ids);

      // getbuyitem(ids)
    },
  },
  created() {
    this.skeleton = true
    getindex(0).then((res) => {
      this.tabArr = res.data.data.tabs;

      if (res.data.data.data.sections) {
        this.TuiJian = res.data.data.data.sections;
        // console.log("轮播图数据", this.TuiJian);
      }
      this.skeleton = false
      // console.log(res.data.data);
    });
  },
};
</script>

<style lang="less" scoped>
// 搜索栏
.inputbox {
  width: 100vw;
  height: 50rem;
  background-color: #ffffff;
  // padding: 10rem 20rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid rgba(197, 197, 197, 0.1);

  .imgboxbacc {
    overflow: hidden;
    width: 60px;
    height: 30px;
    margin-right: 10rem;
    position: relative;

    img {
      position: absolute;
      top: -33rem;
      left: -22rem;
      width: 100rem;
      height: 100rem;
    }
  }

  .input {
    width: 275rem;
    height: 30rem;
    display: flex;
    align-items: center;

    background-color: #f7f7f7;
    border-radius: 15rem;
  }
}

// 轮播图样式
.my-swipe .van-swipe-item {
  // width: 100vw;

  // text-align: center;

  img {
    width: 375rem;
    height: 187.5rem;
  }
}

// 小组件样式

.TJicon {
  display: flex;

  .iconbox {
    img {
      width: 20vw;
    }
  }
}

// 双排商品样式
.shopcart {
  display: flex;
  margin-bottom: 20rem;

  // overflow: hidden;
  justify-content: space-evenly;

  .shopitem {
    // border: 1px solid #eeeeee;
    box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);

    border-radius: 5rem;
    width: 180rem;
    overflow: hidden;

    display: flex;
    align-items: center;
    flex-flow: column;
    font-size: 15rem;

    .text {
      width: 150rem;
      overflow: hidden;
      /* 隐藏溢出的内容 */
      white-space: nowrap;
      /* 保持文本在一行显示 */
      text-overflow: ellipsis;
      /* 用省略号表示溢出的内容 */
      color: #afafaf;
      font-size: 12rem;
      margin: 10rem 0;
      text-align: center;
    }

    .price {
      color: red;
    }

    img {
      margin-bottom: 10rem;
      width: 187.5rem;
      height: 150rem;
    }

    .btns {
      width: 100rem;
      height: 30rem;
      margin: 10rem 0;
      color: white;
      background-color: #ea625b;
      border-radius: 5rem;
      border: none;
    }
  }
}

// 底部展示样式

.doubleImg {
  img {
    width: 100vw;
  }
}

// 更多
.titlesss {
  width: 100vw;
  height: 30rem;
  line-height: 30rem;
  text-align: center;
  padding: 10rem 0;
  margin: 10rem 0;
  border-radius: 5rem;
  box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);
  font-size: 16rem;
}

.no1 {
  color: #b3b3b3;

  font-size: 12rem;
  padding: 0 0;

  margin: 0 0;
  box-shadow: none;
}

// 智能

// 三列商品样式

.ZNitem {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;

  .ZNitembox {
    // border: 1px solid #eeeeee;
    box-shadow: 0px 0px 6px 1px rgba(183, 183, 183, 0.3);

    border-radius: 5rem;
    width: 120rem;
    overflow: hidden;

    display: flex;
    align-items: center;
    flex-flow: column;
    font-size: 15rem;

    margin: 10rem 0;
    padding-bottom: 20rem;

    .title {
      width: 100rem;
      text-align: center;
      overflow: hidden;
      /* 隐藏溢出的内容 */
      white-space: nowrap;
      /* 保持文本在一行显示 */
      text-overflow: ellipsis;
      /* 用省略号表示溢出的内容 */
    }

    .text {
      width: 100rem;
      overflow: hidden;
      /* 隐藏溢出的内容 */
      white-space: nowrap;
      /* 保持文本在一行显示 */
      text-overflow: ellipsis;
      /* 用省略号表示溢出的内容 */
      color: #afafaf;
      font-size: 12rem;
      margin: 10rem 0;
      text-align: center;
    }

    .price {
      color: red;
    }

    img {
      margin-bottom: 10rem;
      width: 120rem;
      height: 120rem;
    }

    .btns {
      width: 100rem;
      height: 30rem;
      margin: 10rem 0;
      color: white;
      background-color: #ea625b;
      border-radius: 5rem;
      border: none;
    }
  }
}

// 笔记本大屏样式
.BJBitems {
  img {
    width: 100%;
  }

  padding: 5rem;
  background-color: #4878a6;

  .BJBtext {
    font-size: 16rem;
    background-color: white;
    width: 345rem;
    height: 60rem;
    display: flex;
    justify-content: space-between;
    padding: 10rem;

    .BJBbox {
      margin: 0;
      padding: 0;
      font-size: 0;
    }

    .BJBtext1 {
      width: 50.3vw;
      display: flex;
      flex-flow: column;
      justify-content: space-evenly;

      div:nth-of-type(2) {
        font-size: 13rem;
        color: #afafaf;
      }
    }

    .BJBtext2 {
      width: 30.3vw;
      height: 60rem;
      display: flex;
      flex-flow: column;
      justify-content: space-evenly;

      .price {
        color: red;
        font-size: 14rem;
      }

      .btns {
        width: 100rem;
        height: 30rem;

        color: white;
        background-color: #ea625b;
        border-radius: 5rem;
        border: none;
      }
    }
  }
}
</style>