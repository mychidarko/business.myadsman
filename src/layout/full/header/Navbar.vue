<template>
	<header class="gridx">
		<vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar" text-color="rgba(100, 100, 100, 0.7)" active-text-color="rgba(0, 0, 0, 0.6)">
      
      <div slot="title" class="themelogo">
        <span style="width: 5px !important;"></span>
        <span class="logo-text" v-if="title">{{ title }}</span>
      </div>
      <!---
      Mobile toggle
      --> 
      <div slot="title">
        <div class="hiddenDesktop cursor-pointer nav-text" @click.stop="activeSidebar"><vs-icon icon="menu"></vs-icon></div>
      </div>
      
      <vs-spacer></vs-spacer>
      
      <vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark nav-text" href="#"><vs-icon icon="notifications"></vs-icon></a>
        <vs-dropdown-menu class="topbar-dd">
          <vs-dropdown-item>Action</vs-dropdown-item>
          <vs-dropdown-item>Another Action</vs-dropdown-item>
          <vs-dropdown-item>Something</vs-dropdown-item>
          <vs-dropdown-item>Here</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
      
      <vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark nav-text" href="#"><vs-icon icon="mode_comment"></vs-icon></a>
        <vs-dropdown-menu class="topbar-dd">
          <vs-dropdown-item>Action</vs-dropdown-item>
          <vs-dropdown-item>Another Action</vs-dropdown-item>
          <vs-dropdown-item>Something</vs-dropdown-item>
          <vs-dropdown-item>Here</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
      
      <vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3">
        <a class="text-white-dark nav-text user-image" href="#"><img src="@/assets/images/users/me.jpg" alt="User"/></a>
        <vs-dropdown-menu class="topbar-dd">          
            <vs-dropdown-item to="/profile"><vs-icon icon="person_outline" class="mr-1"></vs-icon> My Profile</vs-dropdown-item>
            <vs-dropdown-item><vs-icon icon="sentiment_very_satisfied" class="mr-1"></vs-icon> My Balance</vs-dropdown-item>
            <vs-dropdown-item><vs-icon icon="mail_outline" class="mr-1"></vs-icon> Inbox</vs-dropdown-item>
            <hr class="mb-1" />
            <vs-dropdown-item to="/settings"><vs-icon icon="settings" class="mr-1"></vs-icon> Account Setting</vs-dropdown-item>
            <hr class="mb-1" />
            <vs-dropdown-item v-on:click="handleLogout"><vs-icon icon="lock" class="mr-1"></vs-icon> Logout</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar>
	</header>

</template>

<script>
import { LOGOUT } from "@/store/actions.type";

export default {
	name : 'Navbar',
  props: {
    topbarColor: {
        type: String,
        default: "#cecfdd",
    },
    title: {
          type: String,
    },
    logo: {
        type: String
    }
  },
  data: () => ({
    indexActive: 0,
    showToggle: false
  }),
  methods: {
    activeSidebar() {
      this.$store.commit('IS_SIDEBAR_ACTIVE', true);
    },
    handleLogout: function() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "Login" }))
    }
  }
}
</script>

<style scoped>
.logo-text, .nav-text {
  color: rgba(49, 49, 49, 0.7) !important;
}
</style>
