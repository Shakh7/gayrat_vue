<template>
  {{ this.$route.params }}
    <div class="d-flex flex-column flex-lg-row">
        <!--begin::Content-->
        <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
            <!--begin::Form-->
            <form class="form" action="#" id="kt_subscriptions_create_new">
                <Clients :quote="{}"></Clients>
            </form>
            <!--end::Form-->
        </div>
        <!--end::Content-->

        <!--begin::Sidebar-->
        <div
                class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 order-1 order-lg-2"
        >
            <AddSummary></AddSummary>
        </div>
        <!--end::Sidebar-->
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Clients from "@/components/quotes/Clients.vue";
import AddSummary from "@/components/quotes/Summary.vue";
import axios from "axios";

export default defineComponent({
    name: "kt-add-subscription",
    components: {
        AddSummary,
        Clients,
    },
    methods: {
        async getQuoteById(quoteId) {
            let response = await axios.get('http://127.0.0.1:8000/api/leads/1/')
        }
    },
    mounted() {
        const value: string = this.$route.params.id.toString();
        if (/^\d+$/.test(value)) {
            console.log(`${value} is a number`);
        } else {
            console.log(`${value} contains letters or characters`);
        }
    }
});
</script>
