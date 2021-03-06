import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchGoods,
  reqLogout
} from "../api/index";
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
} from "./mutation-types";
export default {
  async getAddress({ commit, state }) {
    const geohash = state.latitude + "," + state.longitude;

    const result = await reqAddress(geohash);

    commit(RECEIVE_ADDRESS, { address: result.data });
  },
  async getCategorys({ commit }) {
    const result = await reqCategorys();

    commit(RECEIVE_CATEGORYS, { categorys: result.data });
  },
  async getShops({ commit, state }) {
    const { latitude, longitude } = state;
    const result = await reqShops({ latitude, longitude });
    commit(RECEIVE_SHOPS, { shops: result.data });
  },
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo });
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, { userInfo: result.data });
    }
  },
  async logout({ commit }) {
    const result = await reqLogout();
    if (result.code === 0) {
      commit(RESET_USER_INFO);
    }
  },
  async getShopInfo({ commit }, cb) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const info = result.data;
      info.score = 3.5;
      commit(RECEIVE_INFO, { info });
      cb && cb();
    }
  },
  async getShopRatings({ commit }, cb) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const ratings = result.data;
      commit(RECEIVE_RATINGS, { ratings });
      cb && cb();
    }
  },
  async getShopGoods({ commit }, cb) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, { goods }); // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb();
    }
  },
  updateFoodCount({ commit }, params) {
    let { isAdd, food } = params;
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food });
    } else {
      commit(DECREMENT_FOOD_COUNT, { food });
    }
  },
  clearCart({ commit }) {
    commit(CLEAR_CART);
  },
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + "," + state.longitude;

    let result = await reqSearchGoods(geohash, keyword );

    if (result.code === 0) {
      const searchResult = result.data
      commit(RECEIVE_SEARCH_SHOPS,{searchResult})
    }
  },
};
