import moment from 'moment';

export function getLocal(url, params) {
  // 本地按小时缓存
  let key = url + moment().format('YYYYMMDD-HH');
  const cachedData = uni.getStorageSync(key);
  if (cachedData) {
    // 如果本地缓存中有数据，则直接返回
	console.info("getLocal ok")
	return Object.values(cachedData);
  } else {
	  console.info("getLocal null")
	return null;
  }
}

export function setLocal(url, value) {
	let key = url + moment().format('YYYYMMDD-HH');
	uni.setStorageSync(key, value);
	console.info("local set ok")
}

const Lazy = {
	method1(){
		console.log("m1")
	},
	method2(){
		console.log("m2")
	},
	method3(){
		console.log("m3")
	},
	// 同一测试方法
	test(){
		console.log("test");
		Lazy.formatTime();
	}
}

const LazyData = {
	kindKey(){
		return ['top','guonei','guoji','yule','tiyu','junshi','keji','caijing','youxi','qiche','jiankang']
	},
	kindValue(){
		return ['推荐',	'国内',	'国际',	'娱乐',	'体育',	'军事',	'科技',	'财经',	'游戏',	'汽车',	'健康']				
	}
}

export default {Lazy , LazyData};