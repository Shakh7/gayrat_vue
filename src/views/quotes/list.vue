<template>

    <div class="mb-10">
        <STable :headers="table_headers" :api_url="table_url">
            <template v-slot:id="props">
                <span>{{ props.row.id.toString().slice(0, 8) }}...</span>
            </template>
            <template v-slot:created_at="props">
                <span>{{ props.row.created_at.slice(0, 10) }}</span>
            </template>
            <template v-slot:customer="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.customer.full_name }}
                    </a>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        {{ props.row.customer.email }}
                    </span>
                </div>
            </template>
            <template v-slot:car_make="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.car_model }}
                    </a>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        {{ props.row.car_make + ', ' + props.row.car_year }}
                    </span>
                </div>
            </template>
            <template v-slot:origin="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <h6 class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.origin.city_name }}
                    </h6>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        {{ props.row.origin.state_name + ', ' + props.row.origin.zip_code }}
                    </span>
                </div>
            </template>
            <template v-slot:destination="props">
                <div class="d-flex justify-content-start flex-column text-start">
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                        {{ props.row.destination.city_name }}
                    </a>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">
                        {{ props.row.destination.state_name + ', ' + props.row.destination.zip_code }}
                    </span>
                </div>
            </template>
        </STable>
    </div>

    <ShareQuotesModal :quotes="selected_quotes"/>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import ShareQuotesModal from "@/components/modals/forms/ShareQuotesModal.vue";
import STable, {type Thead} from "@/components/table/STable.vue"

export default defineComponent({
    name: "kt-c",
    components: {
        ShareQuotesModal,
        STable
    },
    data() {
        let table_headers: Thead[] = [
            {
                label: 'ID',
                value: 'id',
                align: 'center',
            },
            {
                label: "Received Date",
                value: "created_at",
                align: "center",
                search_type: 'date'
            },
            {
                label: "Customer",
                value: "customer",
                align: "center",
                width: "150"
            },
            {
                label: "Car",
                value: "car_make",
                align: "center",
                width: "150"
            },
            {
                label: "Origin",
                value: "origin",
                align: "center",
                width: "175"
            },
            {
                label: "Destination",
                value: "destination",
                align: "center",
                width: "175"
            },
            {
                label: "Times Shared",
                value: "times",
                align: "center",
                search_type: 'select',
                select_options: [
                    {
                        label: 'Connected',
                        value: 'true',
                    },
                    {
                        label: 'Not Connected',
                        value: 'false'
                    }
                ]
            },
            {
                label: 'Is Operable',
                value: 'is_operable',
                align: "center",
            },
            {
                label: 'Notes',
                value: 'notes',
                align: "center",
            },
        ];
        let table_url = 'quotes'

        return {
            getAssetPath,
            table_headers: table_headers,
            table_url: table_url
        };
    },
})

</script>