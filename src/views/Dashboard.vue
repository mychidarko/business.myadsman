<template>
 <div>
  <States/>
 <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="6" vs-xs="12" code-toggler>
      <vs-card class="cardx">
        <div slot="header">
          <h4>General Ad Analytics</h4>
        </div>
        <div>
          <GeneralAnalytics />
        </div>
      </vs-card>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-sm="6" vs-lg="4" vs-xs="12">
      <vs-card class="cardx">
        <div slot="header">
          <h4>Ads Interest</h4>
        </div>
        <div>
          <SalesIncome />
        </div>
      </vs-card>
    </vs-col>
    <vs-col vs-lg="12">
      <vs-card>
        <div slot="header">
          <h4>Your Top Ads</h4>
        </div>
        <TopAds />
      </vs-card>
    </vs-col>
  </vs-row>
  <!-- <Blogs/> -->
</div>  
</template>

<script>
import GeneralAnalytics from './components/dashboard/GeneralAnalytics.vue';
import SalesIncome from './components/dashboard/SalesIncome.vue';
import TopAds from './components/dashboard/TopAds.vue';
import States from './components/dashboard/States.vue';
// import Blogs from './components/dashboard/Blogs.vue';

export default {
	name: 'Dashboard',
  components: {
    GeneralAnalytics,
    SalesIncome,
    TopAds,
    States,
    // Blogs
  }
}
</script>
