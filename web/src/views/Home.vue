<template>
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
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="scss">
  .swiper-pagination-bullets {
    .swiper-pagination-bullet{
      background: white;
      opacity: 1;

      &.swiper-pagination-bullet-active{
        background: blue;
      }
    }
  }
</style>