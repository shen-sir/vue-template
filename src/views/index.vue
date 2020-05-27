<template >
  <div>
    <topBar></topBar>
    <router-view></router-view>
  </div>
</template>
<script>
import topBar from "@components/topBar/index.vue";
export default {
  data() {
    return {};
  },
  components: {
    topBar
  },
};
</script>

