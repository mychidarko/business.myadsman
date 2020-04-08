<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Business from "@/common/storage.user";
import { CHECK_AUTH } from "@/store/actions.type";

export default {
    name: 'app',
    mounted: function() {
      if (Business.get()) {
        this.$store.dispatch(CHECK_AUTH);
      }
    }
}
</script>