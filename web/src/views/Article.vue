<template>
  <div class="page-article" v-if="model">
    <div class="article-header">
      <div class="d-flex px-2 py-3">
        <div class="iconfont icon-back text-skyblue" @click="$router.push('/')"></div>
        <div class="article-title flex-1 fs-lg text-ellipsis">{{model.title}}</div>
        <div class="fs-xs text-grey1">{{model.createdAt | date}}</div>
      </div>
    </div>

    <div class="article-body px-3 fs-lg" v-html="model.body"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "news-article",

  filters:{
    date(val){
      return dayjs(val).format('YYYY/MM/DD');
    }
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      model: null
    };
  },

  methods: {
    async fetchArticle() {
      const res = await this.$http.get(`article/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    this.fetchArticle();
  }
};
</script>

<style lang='scss'>
.page-article {
  .article-header {
    border-bottom: 1px solid #d4d4d5;
    margin-bottom: 0.6667rem;
    .article-title {
      color: #4394e4;
      font-weight: bold;
    }
  }

  .article-body {
    img {
      max-width: 100%;
      height: auto;
    }

    h2 {
      line-height: 150%;
    }

    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>