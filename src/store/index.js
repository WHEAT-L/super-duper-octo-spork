
import { Toast } from 'vant'
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({







  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || [],

    Tokens: localStorage.getItem('Token') || null,

    uese: JSON.parse(localStorage.getItem('uese')) || {},

    gouwuche: [],

    priceAll: 0,


    // 支付密码
    payPassword: null,




  },
  getters: {
    // 待付款
    pendingPayment(state) {
      return state.gouwuche.filter(item => item.qianshou == 'fukuan')
    },

    // 待收货
    toBeReceived(state) {
      return state.gouwuche.filter(item => item.qianshou == 'shouhuo')
    },

    // 在购物车中
    toBeSubmitted(state) {
      return state.gouwuche.filter(item => item.qianshou == 'gouwuche')
    }



  },
  mutations: {

    // 服务器初始化

    // serveinit(state) {
    //   // 获取用户信息
    //   axios.get(`http://localhost:3000/users`)
    //     .then(response => {
    //       console.log("用户信息：", response.data);
    //       localStorage.setItem('userInfo', JSON.stringify(response.data))
    //       state.userInfo = response.data
    //       response.data.forEach(e => {
    //         if (e.gouwuche) {
    //           localStorage.setItem(`${e.token}`, JSON.stringify(e.gouwuche))
    //         }
    //       })

    //     })
    //     .catch(error => {
    //       console.error('Error fetching user:', error);
    //     });


    // },

    // 退出和切换账号
    handoff(state, itobj) {

      Toast.loading({
        message: '正在切换账号...',
        forbidClick: true,
      });


      setTimeout(() => {
        state.Tokens = itobj.token || null;
        
        state.uese = itobj;
        console.log("切换账号", itobj);
        console.log("token", state.Tokens, "用户信息", state.uese);

        state.gouwuche = JSON.parse(localStorage.getItem(`${state.Tokens}`) || []);

      }, 2000);

      state.gouwuche = JSON.parse(localStorage.getItem(`${state.Tokens}`) || []);




    },



    getGouwuche(state, val) {
      console.log("获取", val);

      state.gouwuche = val
    },

    pushuserArr(state, userobj) {
      // state.userInfo = userInfo

      console.log(state.userInfo);

      state.userInfo.push({
        usname: userobj.usname,
        uspwd: userobj.uspwd,
        token: `${btoa(userobj.usname)}Mijiao${userobj.uspwd}`,
      });


      state.uese = {
        usname: userobj.usname,
        uspwd: userobj.uspwd,
        token: `${btoa(userobj.usname)}Mijiao${userobj.uspwd}`,
      }

      state.Tokens = userobj.token
      console.log("token", state.Tokens);


      state.gouwuche = JSON.parse(localStorage.getItem(`${state.Tokens}`)) || []

      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))




      // json服务器创建用户
      // axios.post('http://localhost:3000/users', {
      //   id: `${btoa(userobj.usname)}Mijiao${userobj.uspwd}`,
      //   usname: userobj.usname,
      //   uspwd: userobj.uspwd,
      //   token: `${btoa(userobj.usname)}Mijiao${userobj.uspwd}`,
      // })
      //   .then(response => {
      //     console.log("添加成功", response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error creating user:', error);
      //   });


    },


    login(state, userstr) {


      let tk = `${btoa(userstr.usname)}Mijiao${userstr.uspwd}`;
      const found = state.userInfo.find((e) => e.token == tk);


      state.uese = found

      state.Tokens = found.token
      console.log("token", state.Tokens);


      state.gouwuche = JSON.parse(localStorage.getItem(`${state.Tokens}`)) || []




    },


    gouwuchepush(state, shopobj) {


      // console.log(shopobj);

      let arrs = [...state.gouwuche];
      // console.log("app", item);
      // 查重
      const existingItemIndex = arrs.findIndex((Sps) => Sps.id === shopobj.id && Sps.specification
        == shopobj.specification);

      if (existingItemIndex === -1) {
        arrs.push(shopobj);
        console.log('无重复');

      } else {
        console.log('有重复');

        arrs[existingItemIndex].num += Number(shopobj.num);
      }

      state.gouwuche = arrs;


      // json服务器加入购物车
      // axios.post(`http://localhost:3000/users/${state.Tokens}`, { 'gouwuche': arrs },
      // )
      //   .then(response => {
      //     console.log("添加购物车成功", response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error creating user:', error);
      //   });
      // console.log("购物车", state.gouwuche);

      // console.log('Token', state.Token);

      // axios.patch(`http://localhost:3000/users/${state.Tokens}`, { gouwuche: arrs })
      //   .then(response => {
      //     console.log("更新购物车成功", response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error updating cart:', error);
      //   });

    },


    itemcheck(state, shopobj) {
      console.log("勾选", shopobj);

      state.gouwuche = state.gouwuche.map(item => {
        return item.specification == shopobj.ids ? { ...item, check: !item.check } : item
      })


    },

    chengbox(state, chkbox) {
      console.log("选中", chkbox);

      state.gouwuche = state.gouwuche.map((item) => {
        return { ...item, check: chkbox.includes(item.specification) }
      }
      )


      let all = []
      let sum = 0
      all = state.gouwuche.filter((item) => {
        return chkbox.includes(item.specification)
      }
      )
      all.forEach(item => {
        if (item.num > 1) {

          sum += item.num * item.price
        } else {
          sum += item.price
        }

      })


      state.priceAll = sum
      console.log("全部", all, "总和", sum);



      // state.gouwuche = state.gouwuche.map((item) => {
      //   return chkbox.forEach(element => {
      //     if (element == item?.specification) {
      //       console.log("item", item);
      //       return { ...item, check: true }

      //     } else {
      //       console.log("否");

      //       return { ...item, check: false }
      //     }

      //   });
      // })
    },


    // cancelchk(state, chkbol) {
    //   state.gouwuche = state.gouwuche.map((item) => {
    //     return { ...item, check: chkbol }
    //   })
    // },



    // 删除项
    delitem(state, arrs) {

      state.gouwuche = state.gouwuche.filter((item) => {
        return item.specification != arrs.idx
      })



      let all = []
      let sum = 0
      all = state.gouwuche.filter((item) => {
        return arrs.arr.includes(item.specification)
      }
      )
      all.forEach(item => {
        if (item.num > 1) {

          sum += item.num * item.price
        } else {
          sum += item.price
        }

      })
      state.priceAll = sum
      console.log("全部", all, "总和", sum);


    },

    // 设置密码
    setAPaymentPassword(state, psw) {



      state.userInfo = state.userInfo.map(item => {

        if (item.token == state.Tokens) {

          return { ...item, payPassword: psw }
        } else {

          return item
        }
      })

      const found = state.userInfo.find((e) => e.token == state.Tokens);
      state.uese = found



    },


    // 设置地址
    setloch(state, locObj) {

      state.userInfo = state.userInfo.map(item => {

        if (item.token == state.Tokens) {

          if(item.loch){

            return { ...item, loch: [...item.loch, locObj] }
          }else{
            return { ...item, loch: [locObj] }
          }
        } else {

          return item
        }
      })

      const found = state.userInfo.find((e) => e.token == state.Tokens);
      state.uese = found


    }




  },
  actions: {
  },
  modules: {
  }
})
