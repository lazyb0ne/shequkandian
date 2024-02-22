"use strict";
const common_vendor = require("../../common/vendor.js");
const common_htmlParser = require("../../common/html-parser.js");
const FAIL_CONTENT = "<p>获取信息失败1</p>";
const _sfc_main = {
  data() {
    return {
      banner: {},
      content: []
    };
  },
  onShareAppMessage() {
    return {
      title: this.banner.title,
      path: "/pages/detail/detail?query=" + JSON.stringify(this.banner)
    };
  },
  onLoad(event) {
    this.load(event.query);
  },
  methods: {
    load(e) {
      var p = decodeURIComponent(e);
      try {
        this.banner = JSON.parse(p);
      } catch (error) {
        this.banner = JSON.parse(p);
      }
      common_vendor.index.setNavigationBarTitle({
        title: this.banner.title
      });
      this.getDetail();
    },
    getDetail() {
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + this.banner.post_id,
        success: (result) => {
          let content = FAIL_CONTENT;
          if (result.statusCode == 200) {
            content = result.data.content;
          }
          const nodes = common_htmlParser.parseHtml(content);
          this.content = nodes;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.banner.image_url,
    b: common_vendor.t($data.banner.title),
    c: common_vendor.t($data.banner.source),
    d: common_vendor.t($data.banner.datetime),
    e: $data.content
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/lazybone/lazybone.work/git/shequkandian/pages/news/detail.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
