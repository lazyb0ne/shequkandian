"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    newsItem: {
      type: Object,
      default: function(e) {
        return {};
      }
    }
  },
  methods: {
    click() {
      this.$emit("click");
    },
    close(e) {
      e.stopPropagation();
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.newsItem.title),
    b: $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 ? 1 : "",
    c: $props.newsItem.image_list || $props.newsItem.thumbnail_pic_s
  }, $props.newsItem.image_list || $props.newsItem.thumbnail_pic_s ? common_vendor.e({
    d: $props.newsItem.thumbnail_pic_s
  }, $props.newsItem.thumbnail_pic_s ? {
    e: $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 ? 1 : "",
    f: $props.newsItem.thumbnail_pic_s
  } : {}, {
    g: $props.newsItem.image_list
  }, $props.newsItem.image_list ? {
    h: common_vendor.f($props.newsItem.image_list, (source, i, i0) => {
      return {
        a: source.url,
        b: i
      };
    })
  } : {}, {
    i: $props.newsItem.article_type === 2 ? 1 : "",
    j: $props.newsItem.article_type === 1 ? 1 : ""
  }) : {}, {
    k: $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 ? $props.newsItem.article_type === 2 ? "row" : "row-reverse" : "column",
    l: common_vendor.t($props.newsItem.author_name),
    m: $props.newsItem.comment_count
  }, $props.newsItem.comment_count ? {
    n: common_vendor.t($props.newsItem.comment_count)
  } : {}, {
    o: common_vendor.t($props.newsItem.date),
    p: common_vendor.o((...args) => $options.close && $options.close(...args)),
    q: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0db08723"], ["__file", "/Users/lazybone/lazybone.work/git/shequkandian/pages/news/news-item.nvue"]]);
wx.createComponent(Component);
