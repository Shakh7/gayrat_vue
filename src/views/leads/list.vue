<template>

    <div class="mb-10">
        <STable :headers="table_headers" :api_url="table_url">
            <template v-slot:created_at="props">
                <span>{{ props.row.created_at.slice(0, 10) }}</span>
            </template>
        </STable>
    </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import STable, {type Thead} from "@/components/table/STable.vue"

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
            },
            {
                label: "Created Date",
                value: "created_at",
                align: "center",
                search_type: 'date'
            },
            {
                label: "Client",
                value: "client",
                align: "center",
            },
            {
                label: "Price",
                value: "price",
                align: "center",
            },
        ];
        let table_url = 'leads'

        return {
            getAssetPath,
            table_headers: table_headers,
            table_url: table_url
        };
    },
})

</script>