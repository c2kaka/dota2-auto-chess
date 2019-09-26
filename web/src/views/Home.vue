<template>
  <div>
    <div>
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide>
          <img src="../assets/images/1.jpg" class="w-100" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/2.jpg" class="w-100" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/3.jpg" class="w-100" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/4.jpg" class="w-100" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/5.jpg" class="w-100" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination pagination-home" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of swiper -->
    <m-list-card title="新闻资讯" icon="news" :categories="newsCategories">
      <template #items="{category}">
        <router-link
          tag="div"
          :to='`article/${news._id}`'
          class="p-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark1 text-ellipsis pr-2">{{news.title}}</span>

          <span class="fs-sm text-grey1">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of newsList -->
    <m-list-card title="英雄列表" icon="hero" :categories="heroCategories">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.3rem">
          <router-link
            tag="div"
            :to='`hero/${hero._id}`'
            class="p-2 fs-sm text-center"
            style="width:25%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100 bor-rad" alt />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import ListCard from "../components/ListCard";
import dayjs from "dayjs";
export default {
  name: "home",

  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },

  components: {
    "m-list-card": ListCard
  },

  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true
      },
      swiperSlides: [1, 2, 3, 4, 5],

      newsCategories: [],

      heroCategories: []
    };
  },
  methods: {
    async fecthNewsList() {
      const res = await this.$http.get("news/list");
      this.newsCategories = res.data;
    },

    async fecthHeroList() {
      const res = await this.$http.get("heroes/list");
      this.heroCategories = res.data;
    }
  },
  created() {
    this.fecthNewsList();
    this.fecthHeroList();
  }
};
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_1434562_7360rhuzczr.css');
.swiper-pagination-bullets {
  .swiper-pagination-bullet {
    background: white;
    opacity: 1;

    &.swiper-pagination-bullet-active {
      background: blue;
    }
  }
}
</style>