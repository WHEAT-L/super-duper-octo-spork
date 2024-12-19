<template>
  <div class="gouwuchebox">
    <div class="title">
      <div>
        购物车 <span style="font-size: 14px">({{ gouwuche.length }})</span>
      </div>
      <div class="sousuo">
        <input type="text" placeholder="搜索购物车商品" class="search-input" v-model="search" @input="performSearch" />
        <span class="search-icon">🔍</span>
        <!-- 搜索图标 -->
      </div>
    </div>


    <!-- 弹出结算界面 -->

    <van-popup v-model="subShow" @click-overlay="submitYes" position="top" :style="{ height: '50%' }" round>

      <!-- 需要提交的商品 -->
      <div class="submitYourProduct">
        <div v-for="(item, index) in submitArr" :key="index">
          <van-card :num="item.num" :price="item.price" :desc="item?.specification" :title="item.name"
            :thumb="item.imgs" style="width: 100vw;" />
        </div>

      </div>
      <div style="width: 100vw; font-size: 15rem; text-align: center; ">
        请输入支付密码
      </div>
      <van-password-input :value="PayPassword" :focused="payShow" @focus="payShow = true" :mask="false" :length="6" />

      <van-number-keyboard v-model="payent" :show="payShow" @blur="payShow = false" @input="payentinput" />




    </van-popup>

    <!-- 弹出地址设置界面 -->
    <van-popup v-model="locShow" position="bottom" :style="{ height: '70%' }" round>

      <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" ref="addressEdit" />

    </van-popup>





    <!-- 设置密码 -->

    <van-popup v-model="showKeyboard" @click-overlay="submitYes" position="bottom" :style="{ height: '50%' }" round>
      <div style="width: 100vw; font-size: 30rem; text-align: center; margin-top: 20rem; margin-bottom: 10rem;">
        请设置六位支付密码
      </div>
      <van-password-input :value="PayPassword" :focused="showKeyboard" @focus="showKeyboard = true" :mask="false"
        :length="6" />
      <!-- 数字键盘 -->
      <van-number-keyboard v-model="PayPassword" :show="showKeyboard" @blur="showKeyboard = false"
        @input="PayPasswordinput" @hide="setpsw" />
    </van-popup>







    <!-- 购物车 -->
    <div>
      <!-- {{ gouwuche }} -->
      <van-checkbox-group v-model="result" ref="checkboxGroup" @change="allclick" style="padding-bottom: 50rem">
        <div v-for="item in showArr" :key="item?.specification" class="swcell"
          style="width: 100vw; display: flex; align-items: center">
          <van-swipe-cell style="width: 100vw">
            <div class="swcall">
              <van-checkbox v-model="item.check" :name="item?.specification"
                style="display: inline-block; margin-left: 10rem"></van-checkbox>

              <van-card :class="{ actv: item.check }" :num="item.num" :price="item.price" :desc="item?.specification"
                :title="item.name" class="goods-card" :thumb="item.imgs" style="width: 91vw; margin: 0" />
            </div>

            <template #right>
              <van-button square type="danger" text="删除" style="height: 100%"
                @click="delitem({ idx: item.specification, arr: result })" />
            </template>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
    </div>

    <!-- 底部结算 -->
    <van-submit-bar style="bottom: 50rem" :price="priceall * 100" button-text="提交订单" @submit="submitclick">
      <van-checkbox v-model="alck" @click="cancel">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>














<script>
import { Toast } from "vant";
import { mapMutations } from "vuex";
import { areaList } from '@vant/area-data';


export default {
  name: "MiJiaoGouWuChe",


  data() {
    return {
      checked: true,

      areaList,
      // 勾选商品
      result: [],
      search: "",
      alck: false,

      showArr: [],

      // 待提交的订单

      submitArr: null,
      subShow: false,

      // 输入支付密码弹窗
      payShow: false,
      payent: '',

      // 设置密码弹窗
      showKeyboard: false,
      PayPassword: '',


      // 设置地址弹窗
      locShow: false,


    };
  },

  methods: {
    ...mapMutations(["itemcheck", "chengbox", "cancelchk", "delitem", "setAPaymentPassword", "setloch"]),

    itemclick(obj) {
      this.itemcheck(obj);
      if (this.allcheck) {
        this.alck = true;
      }
    },

    allclick() {
      console.log("复选框变化");
      this.chengbox(this.result);

      this.alck = this.allcheck;
    },

    performSearch() {
      if (this.search) {
        this.showArr = this.gouwuche.filter((item) =>
          item.specification.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.showArr = this.gouwuche; // 如果没有搜索词，显示所有数据
      }

      console.log(this.showArr);
    },

    cancel() {
      console.log(123123123);

      if (this.allcheck) {
        this.$refs.checkboxGroup.toggleAll(false);
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },

    // 提交订单点击
    submitclick() {
      console.log("提交订单");
      if (this.result.length) {
        if (this.uesrs.payPassword) {
          // console.log("已设置支付密码", this.uesrs.payPassword);
          if (!this.uesrs.loch) {
            Toast("请先至少设置一个地址");
            this.locShow = true


          } else {
            this.submitArr = this.showArr.filter((it) => this.result.includes(it.specification));
            this.subShow = true;
          }

        } else {
          Toast("请先设置支付密码");
          this.showKeyboard = true

        }


        // console.log(this.submitArr);


      } else {
        Toast("请先选择商品");
      }


    },

    // 确认提交订单

    submitYes() {
      console.log("购物车状态变更");
      this.submitArr = null
    },

    // 输入设置密码键盘事件
    PayPasswordinput() {

      if (this.PayPassword.length >= 5) {
        // this.setAPaymentPassword(this.PayPassword)
        this.showKeyboard = false
        this.PayPassword = ''
      }
    },
    // 设置密码
    setpsw() {
      console.log("设置密码", this.PayPassword);
      this.setAPaymentPassword(this.PayPassword)


      this.showKeyboard = false
      this.PayPassword = ''
    },

    // 设置地址
    onSave(content) {
      //  let loc = this.$refs.addressEdit.setAddressDetail()
      console.log("保存地址", content);
      let ssr = {
        name: content.name,
        tel: content.tel,
        city: `${content.province} ${content.city} ${content.county}`,
        Longcity: content.addressDetail,
        YZcode: content.postalCode,
        areaCode: content.areaCode
      }
      // console.log(ssr);
      this.setloch(ssr)
      Toast("地址设置成功")
      this.locShow = false

    },



    // 输入密码时触发
    payentinput() {
      console.log("输入密码", this.payent);

    },

  },

  computed: {

    uesrs() {
      return this.$store.state.uese;
    },

    gouwuche() {
      return this.$store.getters.toBeSubmitted;
    },

    allcheck() {
      return this.$store.getters.toBeSubmitted.every((it) => it.check);
    },

    priceall() {
      return this.$store.state.priceAll;
    },
  },

  created() {
    // this.itemcheck({ chk: true, ids: "123" });

    this.$nextTick(() => {
      this.showArr = this.gouwuche;
    });

  },
  watch: {
    gouwuche(newv) {
      this.showArr = newv;
    },
  },
};
</script>














<style lang="less" scoped>
/* 标题 */
.title {
  width: 100vw;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

/* 搜索框 */
.sousuo {
  display: flex;
  align-items: center;
  position: relative;
  /* 用于绝对定位图标 */

  .search-input {
    padding: 10px 40px;
    /* 内边距，右边留出空间给图标 */
    border: 1px solid #ddd;
    /* 边框 */
    border-radius: 20px;
    /* 圆角边框 */
    background-color: #fff;
    /* 背景颜色 */
    color: #333;
    /* 文本颜色 */
    font-size: 14px;
    /* 字体大小 */
    outline: none;
    /* 去除焦点时的轮廓线 */
    transition: all 0.3s ease;
    /* 平滑过渡效果 */

    &:focus {
      border-color: #4b9cdb;
      /* 聚焦时边框颜色 */
    }

    &::placeholder {
      color: #ccc;
      /* 占位符文本颜色 */
    }
  }

  .search-icon {
    position: absolute;
    /* 绝对定位图标 */
    right: 10px;
    /* 图标距离右边的距离 */
    color: #999;
    /* 图标颜色 */
    font-size: 18px;
    /* 图标大小 */
  }
}

.swcall {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
}

// 结算弹窗
.submitYourProduct {
  width: 100vw;
  height: 35vh;
  overflow-y: scroll;
  display: flex;
  flex-flow: column;
  align-items: center;


}
</style>