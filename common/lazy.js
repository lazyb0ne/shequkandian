import moment from 'moment';

export function getLocal(key) {
  // 本地按小时缓存
  key = key + moment().format('YYYYMMDD-HH');
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

export function setLocal(key, value) {
	key = key + moment().format('YYYYMMDD-HH');
	uni.setStorageSync(key, value);
	console.info("local set ok")
}

const Lazy = {
	
	sortHashToString(hash){
		const keys = Object.keys(hash).sort();  
		const result = keys.map(key => `${key}=${hash[key]}`).join('&');
		return result;
	},
	clearLocalData(){
		// 获取所有本地缓存的键列表
		const keys = uni.getStorageInfoSync().keys;
		// 遍历所有键，并逐个清除对应的本地缓存数据
		keys.forEach(key => {
		  uni.removeStorageSync(key);
		});
		console.log("clearLocalData() ok")
	},
	test(){
		console.log("test");
		Lazy.clearLocalData();
	},
	
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