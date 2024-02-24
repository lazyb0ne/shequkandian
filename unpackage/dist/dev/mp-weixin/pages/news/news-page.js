"use strict";
const common_vendor = require("../../common/vendor.js");
const common_lazy = require("../../common/lazy.js");
const newsItem = () => "./news-item.js";
const uniLoadMore = () => "../../components/uni-load-more.js";
const noData = () => "../../components/nodata.js";
const _sfc_main = {
  components: {
    uniLoadMore,
    noData,
    newsItem
  },
  props: {
    nid: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      dataList: [],
      navigateFlag: false,
      pulling: false,
      refreshing: false,
      refreshFlag: false,
      refreshText: "",
      isLoading: false,
      loadingText: "加载中...",
      isNoData: false,
      pulling: false,
      angle: 0,
      loadingMoreText: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
      url: ""
    };
  },
  created() {
    console.log("created");
    this.pullTimer = null;
    this.requestParams = {
      type: this.nid,
      // minId: 0,
      pageSize: 30,
      // column: 'id,post_id,title,author_name,cover,published_at,comments_count',
      key: "c872372dfa19a30d63179f1caa9418a4",
      is_filter: 1
    };
    this._isWidescreen = false;
  },
  methods: {
    do_success(data, refresh) {
      console.log("do_success " + refresh);
      console.log(data);
      const data_list = data.map((news) => {
        return {
          uniquekey: news.uniquekey,
          title: news.title,
          date: news.date,
          category: news.category,
          author_name: news.author_name,
          url: news.url,
          thumbnail_pic_s: news.thumbnail_pic_s,
          is_content: news.is_content,
          article_type: 1
        };
      });
      if (refresh) {
        this.dataList = data_list;
        this.requestParams.minId = 0;
      } else {
        this.dataList = this.dataList.concat(data_list);
        this.requestParams.minId = data[data.length - 1].id;
      }
      if (this.dataList.length > 0 && this._isWidescreen && this.dataList.length <= 10) {
        this.goDetail(this.dataList[0]);
      }
    },
    loadData(refresh) {
      if (this.isLoading) {
        return;
      }
      console.log("loadData() " + this.requestParams.type);
      console.log(this.requestParams);
      this.isLoading = true;
      this.isNoData = false;
      this.requestParams.time = (/* @__PURE__ */ new Date()).getTime() + "";
      this.url = "http://v.juhe.cn/toutiao/index";
      var key = this.url + common_lazy.Lazy.Lazy.sortHashToString(this.requestParams);
      var localData = common_lazy.getLocal(key);
      if (localData) {
        console.log("loadData by local");
        this.do_success(localData, refresh);
        this.do_complete(refresh);
      } else {
        console.log("loadData by request");
        common_vendor.index.request({
          url: this.url,
          data: this.requestParams,
          success: (result) => {
            console.log(result);
            const data = result.data.result.data;
            this.isNoData = data.length <= 0;
            var key2 = this.url + common_lazy.Lazy.Lazy.sortHashToString(this.requestParams);
            common_lazy.setLocal(key2, data);
            this.do_success(data, refresh);
          },
          fail: (err) => {
            if (this.dataList.length == 0) {
              this.isNoData = true;
            }
          },
          complete: (e) => {
            this.do_complete(refresh);
          }
        });
      }
    },
    do_complete(refresh) {
      console.log("complete..." + refresh);
      this.isLoading = false;
      if (refresh) {
        this.refreshing = false;
        this.refreshFlag = false;
        this.refreshText = "已刷新";
        if (this.pullTimer) {
          clearTimeout(this.pullTimer);
        }
        this.pullTimer = setTimeout(() => {
          this.pulling = false;
        }, 1e3);
      }
    },
    loadMore(e) {
      console.log("loadMore ...");
      this.loadData(false);
    },
    clear() {
      this.dataList.length = 0;
      this.requestParams.minId = 0;
    },
    goDetail(detail) {
      if (this._isWidescreen) {
        common_vendor.index.$emit("updateDetail", {
          detail: encodeURIComponent(JSON.stringify(detail))
        });
      } else {
        common_vendor.index.navigateTo({
          url: "./detail?query=" + encodeURIComponent(JSON.stringify(detail))
        });
      }
    },
    closeItem(index) {
      {
        common_lazy.Lazy.Lazy.test();
      }
    },
    refreshData() {
      if (this.isLoading) {
        return;
      }
      this.pulling = true;
      this.refreshing = true;
      this.refreshText = "正在刷新...";
      this.loadData(true);
    },
    onrefresh(e) {
      this.refreshData();
    },
    onpullingdown(e) {
      if (this.refreshing) {
        return;
      }
      this.pulling = false;
      if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
        this.refreshFlag = true;
        this.refreshText = "释放立即刷新";
      } else {
        this.refreshFlag = false;
        this.refreshText = "下拉可以刷新";
      }
    },
    newGuid() {
      let s4 = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
      };
      return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
    }
  }
};
if (!Array) {
  const _component_news_item = common_vendor.resolveComponent("news-item");
  const _component_no_data = common_vendor.resolveComponent("no-data");
  (_component_news_item + _component_no_data)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.dataList, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.closeItem(index), item.id),
        b: common_vendor.o(($event) => $options.goDetail(item), item.id),
        c: "8a448673-0-" + i0,
        d: common_vendor.p({
          newsItem: item
        }),
        e: item.id
      };
    }),
    b: $data.isLoading || $data.dataList.length > 4
  }, $data.isLoading || $data.dataList.length > 4 ? {
    c: common_vendor.t($data.loadingText)
  } : {}, {
    d: common_vendor.o(($event) => $options.loadMore()),
    e: $data.isNoData
  }, $data.isNoData ? {
    f: common_vendor.o($options.loadMore)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a448673"], ["__file", "/Users/lazybone/lazybone.work/git/shequkandian/pages/news/news-page.nvue"]]);
wx.createComponent(Component);
