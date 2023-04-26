<template>

    <div class="mb-10">
        <STable :headers="table_headers" :api_url="table_url">
            <template v-slot:id="props">
                <span>{{ props.row.id.toString().slice(0, 8) }}...</span>
            </template>
            <template v-slot:created_at="props">
                <span>{{ props.row.created_at.slice(0, 10) }}</span>
            </template>
            <template v-slot:is_operable="props">
                <span class="badge" :class="{
                    'badge-success' : props.row.is_operable,
                    'badge-danger' : !props.row.is_operable
                }">{{ props.row.is_operable ? 'Yes' : 'No' }}</span>
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

            <template v-slot:quote_clients="props">
                <el-dropdown>
                    <span class="badge bg-info me-2">
                        {{ props.row.quote_clients.length }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu v-if="props.row.quote_clients.length > 0" class="min-w-200px py-0">
                            <div class="table-responsive">
                                <table class="table table-sm mb-0">
                                    <thead>
                                    <tr class="bg-info text-light fw-semibold">
                                        <th class="text-start ps-5">Client ({{ props.row.quote_clients.length }})</th>
                                        <th class="text-end pe-5">Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="lead in props.row.quote_clients" :key="lead.client.id">
                                        <th class="text-start ps-5">{{ lead.client.full_name }}</th>
                                        <td class="text-end pe-5">${{ lead.price }}</td>
                                    </tr>
                                    <tr class="bg-light-info">
                                        <th class="text-start ps-5 fw-bold">Total price:</th>
                                        <td colspan="2" class="text-end pe-5 fw-bold">
                                            ${{ props.row.quote_clients.map(l => l.price).reduce((a, b) => a + b, 0) }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </el-dropdown-menu>
                        <el-dropdown-menu v-else class="min-w-200px py-0">
                            <div class="table-responsive">
                                <table class="table table-sm mb-0">
                                    <thead>
                                    <tr class="bg-info text-light fw-semibold">
                                        <th class="text-start ps-5"></th>
                                        <th class="text-end pe-5"></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="py-5">
                                <span class="px-5">This quote has not been shared yet</span>
                            </div>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>

            <template v-slot:notes="props">
                <el-dropdown trigger="hover">
                    <span>
                      {{ props.row.notes.slice(0, 17) }}..
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu class="py-0" style="min-width: 200px; max-width: 200px">
                            <div class="px-5 py-2 bg-info text-light fw-semibold">
                                Customer Notes
                            </div>
                            <div class="p-5">
                                <p class="text-gray-700"><i>{{ props.row.notes }}</i></p>
                                <div class="mt-3 text-end">
                                    {{ props.row.created_at.toString().slice(0, 10) }}
                                </div>
                            </div>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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
                width: "150px"
            },
            {
                label: "Car",
                value: "car_make",
                align: "center",
                width: "150px"
            },
            {
                label: "Origin",
                value: "origin",
                align: "center",
                width: "175px"
            },
            {
                label: "Destination",
                value: "destination",
                align: "center",
                width: "175px"
            },
            {
                label: "Times Shared",
                value: "quote_clients",
                align: "center",
                width: "125px"
            },
            {
                label: 'Is Operable',
                value: 'is_operable',
                align: "center",
                width: "125px"
            },
            {
                label: 'Notes',
                value: 'notes',
                align: "center",
                width: '150px'
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