<template>
    <div class="table-responsive">    
        <vs-table data="[]" v-if="!loading">
            <thead>
                <tr>
                    <th class="border-top-0">Ad Name</th>
                    <th class="border-top-0">Product</th>
                    <th class="border-top-0">Support</th>
                    <th class="border-top-0">Reach</th>
                    <th class="border-top-0">Clicks</th>
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
                    <td>
                        <h5 class="m-b-0">{{ ad.type }}</h5>
                    </td>
                    <td>{{ ad.timeout }}</td>
                </tr>
            </tbody>
        </vs-table>
        <div v-else>
            Loading your top ads...
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/common/config';
import Business from '@/common/storage.user';

export default {
    name: "TopAds",
    data: function() {
        return {
            ads: [],
            topAds: [],
            loading: true
        }
    },
    mounted: function() {
        axios.get(`${API_URL}/ads/business/${Business.get("id")}/limit/10`)
			.then((res) => {
				this.ads = res.data;
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});
            });
        
        axios.get(`${API_URL}/ads/business/${Business.get("id")}/limit/10`)
			.then((res) => {
				this.ads = res.data;
				this.loading = false;
			})
			.catch((err) => {
				let errors = String(err).split(" ");
				let errs = "";

				for (let index = 0; index < errors.length; index++) {
					const error = errors[index];
					if (index > 0) {
						errs = `${errs} ${error} `;
					}
				}
				
				this.$vs.notify({
					title: "Error",
					text: errs,
					position: "top-right",
					color: "danger"
				});

				this.loading = false;
            });
        
        // setTimeout(() => {
        //     this.topAds = [
        //         {
        //             id: 1,
        //             name: "Click for CASH",
        //             product: "Adsman users",
        //             productLink: "https://app.myadsman.com",
        //             support: "support.c4c@myadsman.com",
        //             reach: 856,
        //             clicks: 829,
        //             type: "clickable",
        //             timeout: "17:00"
        //         },
        //         {
        //             id: 2,
        //             name: "Smart Surveys",
        //             product: "Adsman business tools",
        //             productLink: "https://myadsman.com/business",
        //             support: "support.business@myadsman.com",
        //             reach: 466,
        //             clicks: 460,
        //             type: "video",
        //             timeout: "23:00"
        //         }
        //     ];
        //     this.loading = false;
        // }, 3000);
    }
}
</script>