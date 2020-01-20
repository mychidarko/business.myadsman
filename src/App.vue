<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import User from "@/common/storage.user";
import { CHECK_AUTH } from "@/store/actions.type";

export default {
    name: 'app',
    mounted: function() {
      if (User.get()) {
        this.$store.dispatch(CHECK_AUTH);
      }
    }
}
</script>