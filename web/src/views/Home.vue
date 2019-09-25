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
        <div class="p-2 fs-lg" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>

          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import ListCard from "../components/ListCard";
export default {
  name: "home",

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

      newsCategories: [
        {
          name: "热门",
          newsList: new Array(5).fill({
            categoryName: "热门",
            title: "关于甜蜜特别活动延迟开放的公告",
            date: "09/24"
          })
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({
            categoryName: "新闻",
            title: "关于甜蜜特别活动延迟开放的公告",
            date: "09/24"
          })
        },
        {
          name: "公告",
          newsList: new Array(5).fill({
            categoryName: "公告",
            title: "关于甜蜜特别活动延迟开放的公告",
            date: "09/24"
          })
        },
        {
          name: "活动",
          newsList: new Array(5).fill({
            categoryName: "活动",
            title: "关于甜蜜特别活动延迟开放的公告",
            date: "09/24"
          })
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({
            categoryName: "赛事",
            title: "关于甜蜜特别活动延迟开放的公告",
            date: "09/24"
          })
        }
      ]
    };
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="scss">
@import "../assets/iconfont/iconfont.css";

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