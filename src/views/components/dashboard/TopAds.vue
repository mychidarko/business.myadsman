<template>
    <div class="table-responsive">    
        <vs-table data="[]">
            <thead>
                <tr>
                    <th class="border-top-0">Ad Name</th>
                    <th class="border-top-0">Product</th>
                    <th class="border-top-0">Support</th>
                    <th class="border-top-0">Reach</th>
                    <th class="border-top-0">Clicks</th>
                    <th class="border-top-0">Shares</th>
                    <th class="border-top-0">type</th>
                    <th class="border-top-0">timeout</th>
                </tr>
            </thead>
            <tbody v-for="ad in topAds" :key="ad.url">
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="mr-2"><vs-avatar color="primary" :text="ad.name" /></div>
                            <div>
                                <h5 class="m-b-0">
                                    <router-link :to="`/ads/manage/${ad.type}/${ad.id}`">{{ ad.name }}</router-link>
                                </h5>
                            </div>
                        </div>
                    </td>
                    <td><a :href="`${ad.productLink}?ref=adsman`" target="_blank">{{ ad.product }}</a></td>
                    <td>{{ ad.support }}</td>
                    <td>
                        <label class="label label-danger">{{ ad.reach }}</label>
                    </td>
                    <td>{{ ad.clicks }}</td>
                    <td>{{ ad.shares }}</td>
                    <td>
                        <h5 class="m-b-0">{{ ad.type }}</h5>
                    </td>
                    <td>{{ ad.timeout }}</td>
                </tr>
            </tbody>
        </vs-table>
    </div>
</template>

<script>
import User from "@/common/storage.user";

export default {
    name: "TopAds",
    data() {
        return {
            topAds: [
                {
                    id: `${(User.get("company")).toLowerCase()}-1`,
                    name: "Click for CASH",
                    product: "Adsman users",
                    productLink: "https://app.myadsman.com",
                    support: "support.c4c@myadsman.com",
                    reach: 856,
                    clicks: 829,
                    shares: 476,
                    type: "normal",
                    timeout: "17:00"
                },
                {
                    id: `${(User.get("company")).toLowerCase()}-2`,
                    name: "Smart Surveys",
                    product: "Adsman business tools",
                    productLink: "https://myadsman.com/business",
                    support: "support.business@myadsman.com",
                    reach: 466,
                    clicks: 460,
                    shares: 378,
                    type: "smart",
                    timeout: "23:00"
                }
            ]
        }
    }
}
</script>

<style scoped>
thead {
    margin-bottom: 100px !important;
}

tr {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
}
</style>
