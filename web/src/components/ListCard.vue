<template>
  <m-card :title="title" :icon="icon">
    <div class="nav jc-between p-2 mt-2 fs-md">
      <div
        class="nav-item"
        :class="{active: active === i}"
        v-for="(category, i) in categories"
        :key="i"
        @click="active = i"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <!-- end of card nav -->
    <div class="mt-2">
      <swiper>
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
import Card from "./Card";
export default {
  name: "m-list-card",
  components: {
    "m-card": Card
  },

  props: {
    title: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    },

    categories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>