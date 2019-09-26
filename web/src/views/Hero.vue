<template>
  <div>
    <div class="top-bar bg-dark2 p-2 d-flex ai-center text-white">
      <img src="../assets/logo.png" alt srcset height="30" />
      <div class="flex-1 px-3">
        <span class="text-white fs-lg mr-2">刀塔自走棋</span>
        <span class="fs-md">英雄攻略</span>
      </div>
      <div @click='$router.push("/")'>
        <span>更多英雄 &gt;</span>
      </div>
    </div>
    <div>{{model.name}}</div>
  </div>
</template>

<script>
export default {
    name: 'hero',
    props: {
        id: {
            type: String,
            required: true
        }
    },

    data() {
      return {
        model: null
      }
    },

    methods: {
      async fetchHero(){
        const res = await this.$http.get(`hero/${this.id}`);
        this.model = res.data;
      }
    },

    created() {
      this.fetchHero();
    },
};
</script>

<style lang='scss'>
.top-bar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>  