"use strict";
const common_vendor = require("./vendor.js");
function getLocal(key) {
  key = key + common_vendor.hooks().format("YYYYMMDD-HH");
  const cachedData = common_vendor.index.getStorageSync(key);
  if (cachedData) {
    console.info("getLocal ok");
    return Object.values(cachedData);
  } else {
    console.info("getLocal null");
    return null;
  }
}
function setLocal(key, value) {
  key = key + common_vendor.hooks().format("YYYYMMDD-HH");
  common_vendor.index.setStorageSync(key, value);
  console.info("local set ok");
}
const Lazy = {
  sortHashToString(hash) {
    const keys = Object.keys(hash).sort();
    const result = keys.map((key) => `${key}=${hash[key]}`).join("&");
    return result;
  },
  clearLocalData() {
    const keys = common_vendor.index.getStorageInfoSync().keys;
    keys.forEach((key) => {
      common_vendor.index.removeStorageSync(key);
    });
    console.log("clearLocalData() ok");
  },
  test() {
    console.log("test");
    Lazy.clearLocalData();
  }
};
const LazyData = {
  kindKey() {
    return ["top", "guonei", "guoji", "yule", "tiyu", "junshi", "keji", "caijing", "youxi", "qiche", "jiankang"];
  },
  kindValue() {
    return ["推荐", "国内", "国际", "娱乐", "体育", "军事", "科技", "财经", "游戏", "汽车", "健康"];
  }
};
const Lazy$1 = { Lazy, LazyData };
exports.Lazy = Lazy$1;
exports.getLocal = getLocal;
exports.setLocal = setLocal;
