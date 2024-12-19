<template>
  <div class="searchbigbox" style="width: 100vw">
    <!-- 搜索框 -->
    <div class="Search" style="z-index: 2">
      <div class="topSearch">
        <van-icon name="arrow-left" class="back-icon"
          @click="$router.go(-1); Searchtext = null; searchArr = ''; searchResult = []" />
        <input type="text" v-model="Searchtext" @keyup.enter="searchenter" @input="seaechinput" placeholder="搜索商品名称"
          class="search-input" />

        <van-icon name="cross" class="del-icon" v-show="Searchtext" @click="deltext" />

        <van-icon name="search" class="search-icon" @click="searchenter" />
      </div>
    </div>

    <!-- 搜索 提示 -->

    <div class="search-result" v-if="searchResult.length && !searcclassifytext?.length" style="z-index: 2">
      <div class="search-result-item" v-for="(item, index) in searchResult" :key="index"
        @click="searchTextPadding(item.title)">
        <van-icon name="search" style="margin-right: 10rem" />
        {{ item.title }}
      </div>
    </div>

    <div v-if="!searchResult.length && searchTips"
      style="width: 100vw; text-align: center; color: #afafaf; padding: 20rem 0">
      --- 没有搜到东西哦！---
    </div>

    <!-- 搜索结果 -->
    <div class="search-ent-box" v-if="searchArr?.length">
      <!-- 搜索结果推荐搜索-->
      <div class="search-ent" v-if="searcclassifytext?.length">
        <div v-for="(item, index) in searcclassifytext" :key="index" class="search-ent-item"
          @click="searchTextPadding(item.class_name)">
          <van-image :src="item.class_icon" class="img" width="80rem" height="80rem" />

          <div class="text">{{ item.class_name }}</div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div class="search-ent-bigitem" style="z-index: -1">
        <div class="itemItem" v-for="(item, index) in searchArr" :key="index" @click="gotobuy(item.body.product_id)">
          <!-- 大图 -->
          <van-image :src="item.body.image" width="150rem" height="150rem" style="margin: 10rem 0"></van-image>

          <!-- 文字 -->
          <div class="textb">
            <div class="title">{{ item.body.name }}</div>
            <div class="desc" v-html="item.body.desc"></div>
            <div class="desc-box" v-if="item.body.class_parameters?.list.length">
              <div class="flexbox" v-for="(it, idx) of item.body.class_parameters?.list" :key="idx">
                <span style="font-size: 11rem">{{ it.name }}</span>
                <span style="font-size: 11rem; color: #afafaf">{{
                  it.bottom_title
                }}</span>
              </div>
            </div>
            <div class="price">
              <span style="font-size: 20rem; color: #ff6700; margin: 0 2rem"><span style="font-size: 16rem">￥</span>{{
                item.body.price
              }}<span style="font-size: 16rem">起</span></span>
              <span style="
                  font-size: 12rem;
                  text-decoration: line-through;
                  color: #afafaf;
                "><span style="font-size: 10rem; text-decoration: none">￥</span>
                {{ item.body.market_price }}
              </span>
              <van-image v-for="(img, imgdx) of item.body.sale_label?.activity_label" :key="imgdx" :src="img.img_url"
                height="12rem" style="margin: 0 2rem">
              </van-image>
            </div>
            <div class="satisfaction">
              <span>{{ item.body.comments_total }}条评价</span> <span> 99%满意度 </span>
            </div>
          </div>
        </div>

        <div style="width: 100vw; text-align: center; color: #afafaf; padding: 20rem 0"> ----- 没有更多了哦 ---- </div>


      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="history" v-if="searchHistory.length && !searchArr?.length">
      <div class="titlers"><span>搜索历史</span> <van-icon name="delete-o" @click="searchHistory = []" /></div>

      <div class="search-history" >
        <div v-for="(item, index) of searchHistory" :key="index" @click="searchTextPadding(item)">{{ item }}</div>


      </div>

    </div>

    <!-- 推荐搜索 -->
    <div class="recommend" v-if="!searchArr?.length">
      <div class="titlers"><span>搜索发现</span></div>
      <div>
        <div class="recommend-item">
          <div v-for="(items, index) of hotSearchArr" :key="index" @click="searchTextPadding(items.desc)">{{ items.desc
            }}</div>

        </div>


      </div>

    </div>
  </div>
</template>










<script>
import _ from "lodash";
// import { Toast } from "vant";
import { getSearchSuggestion, getSearchOutcome, getHotSearch } from "@/api/index";
import { Toast } from 'vant';

export default {
  data() {
    return {
      // 搜索框
      Searchtext: "",
      // 搜索历史
      searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
      //   // 搜索提示关键词
      searchResult: [],
      //   // 搜索提示
      searchTips: false,
      //   // 搜索关键字
      searcclassifytext: null,
      //   // 搜索结果
      searchArr: "",

      // 热门搜索
      hotSearchArr: [],

      //   防抖函数
      searchpromptLoda: null,
    };
  },

  methods: {
    // 清空搜索

    deltext() {
      this.Searchtext = ""

      this.seaechinput()

      this.searchArr = ''

    },


    // 搜索建议
    searchTextPadding(textkey) {
      this.Searchtext = textkey;
      this.searchenter();
    },

    gotobuy(ids) {
      this.$router.push({
        path: "/ShopBuy",
        query: { id: ids },
      });
      console.log(ids);
      // getbuyitem(ids)
    },

    // 触发
    seaechinput() {
      this.searchTips = false;
      if (this.Searchtext) {
        console.log("正在输入");
        this.searchResult = [];
        this.searcclassifytext = null;

        this.searchpromptLoda();
      } else {
        this.searchResult = [];
        this.searchArr = null;
      }
    },

    searchprompt() {
      if (this.Searchtext) {
        console.log("发送请求", this.Searchtext);

        getSearchSuggestion(this.Searchtext)
          .then((resp) => {
            this.searchResult = [];
            // console.log("搜索建议", resp.data.data?.list);

            if (resp.data.data?.list.length) {
              this.searchResult = [...resp.data.data?.list];
              console.log("当前", this.searchResult);
            } else {
              this.searchTips = true;
            }
          })
          .finally(() => {
            //   this.loding = false;
          });
      }

      // }
    },

    // 搜索结果

    searchenter() {
      this.searcclassifytext = null;

      Toast.loading({
        message: '正在搜索',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });

      getSearchOutcome(this.Searchtext).then((res) => {
        console.log("搜索结果", res.data.data.classes);
        // 搜索推荐关键词
        this.searcclassifytext = res.data.data.classes;

        // 搜索结果
        this.searchArr = res.data.data?.list_v2;
        Toast.clear()

        if (!res.data.data.classes) {
          Toast.fail('没有搜索到东西哦，请更换关键词重试！');
        }

      });



      // 数组去重方式
      let arrs = [...this.searchHistory];

      const existingItemIndex = arrs.indexOf(this.Searchtext);
      console.log("下标", existingItemIndex);


      if (existingItemIndex === -1) {
        // 无重复，加入数组
        arrs.push(this.Searchtext);
        console.log('无重复');

      } else {
        console.log('有重复');
        // 提升至第一项
        const [itemToRemove] = arrs.splice(existingItemIndex, 1);

        // 将该元素插入到数组的开头
        arrs.unshift(itemToRemove);

        console.log("提升至第一项", arrs);




      }

      this.searchHistory = arrs;


    },

    // 热门搜索

    hotSearch() {
      getHotSearch().then((res) => {
        console.log("热门搜索", res.data);
        this.hotSearchArr = res.data.data.discover_list;
        // this.searchHistory = res.data.data.list;
      });


    }
  },

  created() {
    this.searchpromptLoda = _.debounce(this.searchprompt, 800);
    // this.fangdougetsong = _.debounce(this.getSearchOutcome, 300);

    this.hotSearch()

    if (this.$route.query.text) {
      this.Searchtext = this.$route.query.text;
      this.searchenter();


    }
  },

  watch: {
    searchHistory(newv) {
      localStorage.setItem("searchHistory", JSON.stringify(newv));


    },
  },
};
</script>







<style lang="less" scoped>
// 大盒样式

.searchbigbox {
  background-color: #f4f4f4;
}

//   顶部搜索框样式
.Search {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: white;

  .topSearch {
    display: flex;
    align-items: center;
    width: 90%;
    background-color: #f2f2f2;
    border-radius: 20px;
    padding: 5px;

    position: relative;

    .back-icon {
      margin-left: 10px;
      font-size: 20px;
      color: #333;
    }

    .del-icon {
      position: absolute;
      right: 45rem;
      top: 8rem;
    }

    .search-input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      margin: 0 10px;
      font-size: 16px;
      color: #333;

      &::placeholder {
        color: #999;
      }
    }

    .search-icon {
      margin-right: 10px;
      font-size: 20px;
      color: #333;
    }
  }

  //   搜索项
}

.search-result {
  position: fixed;
  top: 52rem;
  left: 0;

  .search-result-item {
    width: 100vw;
    display: flex;
    align-items: center;

    height: 40rem;
    border-bottom: 1px solid #afafaf;
    background-color: rgb(250, 250, 250);

    padding: 0 20rem;

    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    /* 隐藏溢出的文本 */
    text-overflow: ellipsis;
    /* 显示省略号 */
  }
}

// 搜索结果推荐

.search-ent {
  width: 100vw;

  display: flex;
  align-items: center;
  overflow-x: scroll;

  scrollbar-width: none;
  /* 隐藏滚动条（Firefox） */
  -ms-overflow-style: none;
  /* 隐藏滚动条（IE/Edge） */
  margin: 15rem 0;

  .search-ent-item {
    width: 110rem;
    height: 115rem;
    margin: 0 5rem;
    background-color: white;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;

    border-radius: 5rem;

    .text {
      width: 100%;
      text-align: center;
      white-space: nowrap;
      /* 防止文本换行 */
      overflow: hidden;
      /* 隐藏溢出的文本 */
      text-overflow: ellipsis;
      /* 显示省略号 */
    }
  }
}

// 搜索结果

.search-ent-bigitem {
  background-color: white;

  border-bottom: 1px solid rgb(160, 159, 159);

  .itemItem {
    display: flex;

    border-bottom: 1px solid rgb(245, 245, 245);
    padding: 10rem 0;

    .textb {
      width: 60vw;
      display: flex;
      flex-flow: column;
      justify-content: space-around;

      .title {
        font-size: 18rem;
        margin: 5rem 0;
      }

      .desc {
        width: 60vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        /* 显示的行数 */
        overflow: hidden;
        font-size: 12rem;
        color: #5c5c5c;
      }

      .desc-box {
        display: flex;
        margin: 12rem 0;

        .flexbox {
          padding: 0 2rem;
          width: 70rem;
          display: flex;
          flex-flow: column;
          align-items: center;
          border-right: 1px solid #ebebeb;
          margin: 5rem 0;

          span {
            width: 70rem;
            text-align: center;
            white-space: nowrap;
            /* 防止文本换行 */
            overflow: hidden;
            /* 隐藏溢出的文本 */
            text-overflow: ellipsis;
            /* 显示省略号 */
            margin: 2rem 0;
          }
        }
      }

      .satisfaction {
        color: #afafaf;
        font-size: 12rem;
      }
    }
  }
}

// 推荐搜索

.recommend-item {
  padding: 20rem;
  display: flex;
  flex-flow: wrap;
  background-color: white;

  //  box-sizing: border-box;
  div {
    width: 50%;
    height: 30rem;
    display: flex;
    align-items: center;
    font-size: 15rem;
  }


}

// 标题样式
.titlers {
  font-size: 17rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: 10rem;
  width: 100vw;
  background-color: white;
  box-sizing: border-box;
}

// 搜索历史


.search-history {
  display: flex;
  padding: 10rem 20rem;

  flex-flow: wrap;
  background-color: white;

  div {
    padding: 10rem 15rem;
    margin-right: 5rem;
    margin-bottom: 10rem;
    border-radius: 20rem;
    background-color: #ebebeb;

    font-size: 15rem;
  }




}
</style>