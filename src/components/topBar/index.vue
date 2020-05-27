<template>
  <div class="top-bar">
    <div class="logo">
      <span>top-bar</span>
    </div>
    <div class="user">
      <span>
        <img src="" >
        {{name}}
      </span>
      <span class="splite-line"></span>
    </div>
  </div>
</template>
<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState('pages/test', ['name']),
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapActions('pages/test', [
      'login'
    ]),
    init(){
      const result = this.login();
    }
  }
}
</script>

<style lang="less">
.top-bar{
  display: flex;
  height: 60px;
  width: 100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 8px 0px rgba(217,229,246,0.5);
  align-items: center;
  justify-content: space-between;
  .logo{
    width: 142px;
    margin-left: 47px;
    span{
      font-size:18px;
      font-weight:bold;
      color: #414B74;
    }
  }
  .user{
    margin-right: 30px;
    display: flex;
    align-items: center;
    .splite-line{
      border-right: 1px solid rgba(216,216,216,1);
      display: inline-block;
      height: 26px;
      margin: 0 20px;
    }
    .log-out{
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: pointer;
      img{
        height: 100%;
      }
    }
  }
}
</style>

