<template>

    <div class="mb-10">
        <STable name="Leads" :headers="table_headers" :api_url="table_url">
            <template v-slot:quote="props">
                <span v-if="props.row.quote">{{ props.row.quote.id }}..</span>
            </template>
            <template v-slot:client="props">
                <span v-if="props.row.client">{{ props.row.client.full_name }}</span>
            </template>
            <template v-slot:created_at="props">
                <span>{{ formatDate(new Date(props.row.created_at)) }}</span>
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