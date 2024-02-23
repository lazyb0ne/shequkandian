"use strict";
const common_vendor = require("./vendor.js");
function getLocal(url, params) {
  let key = url + common_vendor.hooks().format("YYYYMMDD-HH");
  const cachedData = common_vendor.index.getStorageSync(key);
  if (cachedData) {
    console.info("getLocal ok");
    return Object.values(cachedData);
  } else {
    console.info("getLocal null");
    return null;
  }
}
function setLocal(url, value) {
  let key = url + common_vendor.hooks().format("YYYYMMDD-HH");
  common_vendor.index.setStorageSync(key, value);
  console.info("local set ok");
}
const Lazy = {
  method1() {
    console.log("m1");
  },
  method2() {
    console.log("m2");
  },
  method3() {
    console.log("m3");
  },
  // 同一测试方法
  test() {
    console.log("test");
    Lazy.formatTime();
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
