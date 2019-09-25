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
    <m-card title="新闻资讯" icon='news'>
      <div class="nav jc-between p-2 mt-2 fs-md">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <!-- end of card nav -->
      <div class="mt-2">
        <swiper>
          <swiper-slide v-for="n in 5" :key="n">
            <div class="p-2 fs-lg" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>关于甜蜜特别活动延迟开放的公告</span>

              <span>09/25</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script>
import Card from '../components/Card';
export default {
  name: "home",

  components: {
    "m-card": Card,
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
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="scss">
@import '../assets/iconfont/iconfont.css';

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