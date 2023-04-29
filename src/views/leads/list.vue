<template>

    <div class="mb-10">
        <STable name="Leads" :headers="table_headers" :api_url="table_url">
            <template v-slot:quote="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <a class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.quote.id }}
                    </a>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        <span class="text-gray-700">Received at:</span> {{
                        new Date(props.row.quote.created_at).toISOString().slice(0, 10)
                        }}
                    </span>
                </div>
            </template>
            <template v-slot:client="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.client.full_name }}
                    </span>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        {{ props.row.client.email }}
                    </span>
                </div>
            </template>
            <template v-slot:price="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        ${{ props.row.price }}
                    </span>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        Price
                    </span>
                </div>
            </template>
            <template v-slot:created_at="props">
                <div class="d-flex justify-content-start flex-column ">
                    <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ new Date(props.row.created_at).toISOString().slice(0, 10) }}
                    </span>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        Shared date
                    </span>
                </div>
            </template>
        </STable>
    </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import STable, {type Thead} from "@/components/table/STable.vue"
import moment from "moment";

export default defineComponent({
    name: "kt-c",
    components: {
        STable
    },
    data() {
        let table_headers: Thead[] = [
            {
                label: 'Quote ID',
                value: 'quote',
                align: 'center',
                width: '50px'
            },
            {
                label: "Client",
                value: "client",
                align: "center",
                width: '125px'
            },
            {
                label: "Price",
                value: "price",
                align: "center",
                width: '50px'
            },
            {
                label: "Received Date",
                value: "created_at",
                align: "center",
                search_type: 'date'
            },
        ];
        let table_url = 'leads'

        return {
            getAssetPath,
            table_headers: table_headers,
            table_url: table_url
        };
    },
    methods: {
        formatDate(dateStr) {
            const dt = moment.utc(dateStr);
            return dt.format('h:mm a - MMM DD, YYYY');
        }
    }
})

</script>