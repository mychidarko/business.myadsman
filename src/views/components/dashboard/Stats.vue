<template>
    <vs-row>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ loading ? "Loading..." : ads }}</h4>
                <span>{{ loading ? "Loading..." : "Total Ads" }}</span>
                <br>
                <br>
                <router-link to="/ads/manage/all">View ads</router-link>
            </vs-card>
        </vs-col>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ loading ? "Loading..." : reach }}</h4>
                <span>{{ loading ? "Loading..." : "Total Ad Reach" }}</span>
                <br>
                <br>
                <router-link to="/ads/manage/insights/reach">Learn more</router-link>
            </vs-card>
        </vs-col>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ loading ? "Loading..." : interactions }}</h4>
                <span>{{ loading ? "Loading..." : "Total Ad Interactions" }}</span>
                <br>
                <br>
                <router-link to="/ads/manage/insights/interactions">Learn more</router-link>
            </vs-card>
        </vs-col>
        <!-- <vs-col vs-lg="3" vs-sm="6" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ loading ? "Loading..." : data.label }}</h4>
                <span>{{ loading ? "Loading..." : "Ad Growth" }}</span>
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
                <router-link to="/ads/manage/insights/growth">Learn more</router-link>
            </vs-card>
        </vs-col> -->
    </vs-row>
</template>

<script>
export default {
    name: "Stats",
    props: ["loading", "ads", "interactions", "reach"]
}
</script>
