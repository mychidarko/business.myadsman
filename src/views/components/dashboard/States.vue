<template>
    <vs-row>
        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">122</h4>
                <span>Total Ads</span>
                <vs-progress :percent="70" color="primary">primary</vs-progress>
            </vs-card>
        </vs-col>
        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">622,326</h4>
                <span>Total Ad Reach</span>
                <vs-progress :percent="10" color="danger">primary</vs-progress>
            </vs-card>
        </vs-col>
        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">123,552</h4>
                <span>Total Ad Interactions</span>
                <vs-progress :percent="50" color="success">primary</vs-progress>
            </vs-card>
        </vs-col>
        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">30%</h4>
                <span>Ad Growth</span>
                <vs-progress :percent="30" color="warning">primary</vs-progress>
            </vs-card>
        </vs-col>
    </vs-row>    
</template>
<script>
export default {
    name: "States"
}
</script>