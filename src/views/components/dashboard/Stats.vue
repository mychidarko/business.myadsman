<template>
    <vs-row>
        <vs-col vs-lg="3" vs-xs="12"  v-for="(data, index) in dataList" :key="index">
            <vs-card>
                <h4 class="mb-1">{{ data.label }}</h4>
                <span>{{ data.title }}</span>
                <div v-if="data.percentage">
                    <div v-if="data.percentage < 30">
                        <vs-progress :percent="data.percentage" color="danger">primary</vs-progress>
                    </div>
                    <div v-else-if="data.percentage >= 30 && data.percentage < 50">
                        <vs-progress :percent="data.percentage" color="warning">primary</vs-progress>
                    </div>
                    <div v-else>
                        <vs-progress :percent="data.percentage" color="success">primary</vs-progress>
                    </div>
                </div>
                <div v-else>
                    <br>
                </div>
                <br>
                <router-link :to="`${data.moreUrl}`">{{ data.moreText }}</router-link>
            </vs-card>
        </vs-col>
    </vs-row>
</template>

<script>
export default {
    name: "Stats",
    data() {
        return {
            dataList: [
                {
                    label: 122,
                    title: "Total Ads",
                    percentage: null,
                    moreUrl: "/ads/manage/all",
                    moreText: "View ads"
                },
                {
                    label: "622,326",
                    title: "Total Ad Reach",
                    percentage: null,
                    moreUrl: "/ads/manage/insights/reach",
                    moreText: "Learn more"
                },
                {
                    label: "123,552",
                    title: "Total Ad Interactions",
                    percentage: null,
                    moreUrl: "/ads/manage/insights/interactions",
                    moreText: "Learn more"
                },
                {
                    label: "30%",
                    title: "Ad Growth",
                    percentage: 30,
                    moreUrl: "/ads/manage/insights/growth",
                    moreText: "Learn more"
                }
            ]
        }
    },
}
</script>
