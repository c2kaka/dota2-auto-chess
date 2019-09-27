<template>
  <div>
    <div class="top-bar bg-dark2 p-2 d-flex ai-center text-white">
      <img src="../assets/logo.png" alt srcset height="30" />
      <div class="flex-1 px-3">
        <span class="text-white fs-lg mr-2">刀塔自走棋</span>
        <span class="fs-md">英雄攻略</span>
      </div>
      <div @click="$router.push('/')">
        <span>更多英雄 &gt;</span>
      </div>
    </div>

    <div class="hero-body">
      <div class="hero-imagebox">
        <img
          src="//static.ilongyuan.cn/official_website/dev/061505990815617159089580025.png"
          class="hero-image"
        />
      </div>

      <div class="hero-info p-3 h-100">
        <div class="hero-summary p-2">
          <h2 class="my-3">{{model.name}}({{model.title}})</h2>

          <div class="scores d-flex ai-center fs-mid my-2" v-if="model.scores">
            <span>花费</span>
            <span class="badge bg-primary">{{model.scores.cost}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-red">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>

          <div class="hero-type d-flex jc-between">
            <div>种族:神族</div>
            <div>职业:战士</div>
          </div>
        </div>

        <div class="hero-stats p-2">
          <div class="stat-detail py-2">
            <div class="stat-type">生命值</div>
            <div class="stat-number-box">
              <div class="stat-number" :style="`width:${650/4333*100}%`">650</div>
            </div>
          </div>
          <div class="stat-detail py-2">
            <div class="stat-type">攻击力</div>
            <div class="stat-number-box">
              <div class="stat-number" :style="`width:${50/500*100}%`">50</div>
            </div>
          </div>
          <div class="stat-detail py-2">
            <div class="stat-type">护甲</div>
            <div class="stat-number-box">
              <div class="stat-number" :style="`width:${5/15*100}%`">5</div>
            </div>
          </div>
          <div class="stat-detail py-2">
            <div class="stat-type">攻击速度</div>
            <div class="stat-number-box">
              <div class="stat-number" :style="`width:${1.5/4.5*100}%`">1.5</div>
            </div>
          </div>
          <div class="stat-detail py-2">
            <div class="stat-type">攻击范围</div>
            <div class="stat-number-box">
              <div class="stat-number" :style="`width:${1/8*100}%`">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero",
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
    async fetchHero() {
      const res = await this.$http.get(`hero/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    this.fetchHero();
  }
};
</script>

<style lang='scss'>
.top-bar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.hero-body {
  .hero-imagebox {
    height: 30vh;
    text-align: center;
    background: linear-gradient(rgba(111, 70, 53, 0.6), rgba(111, 70, 53, 1));
    .hero-image {
      height: auto;
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .hero-info {
    .hero-summary {
      border-bottom: 1px solid grey;
      .scores {
        .badge {
          margin: 0 0.25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          vertical-align: middle;
        }
      }
    }

    .hero-stats {
      .stat-detail {
        display: flex;
        justify-content: space-between; 
        .stat-type{
          width: 6rem;
        }
        .stat-number-box{
          color: #95644b;
          font-size: 0.9rem;
          flex: 1;
          background: #281510;
          .stat-number{
            background: linear-gradient(90deg,#f4ab65,#f7bc81);
            padding-left: 0.3rem;
            width: 33%;
          }
        }
      }
    }
  }
}
</style>  