<template>

    <div class="card">
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold fs-3 mb-1">Quotes List</span>

                <span class="text-muted mt-1 fw-semobold fs-7"
                >Over 500 new quotes</span
                >
            </h3>
            <div class="card-toolbar">
                <div>
                    <button class="btn btn-sm btn-primary" data-bs-toggle="modal"
                            data-bs-target="#share_quotes_model">
                        Share Quotes
                    </button>
                </div>
            </div>
        </div>

        <div class="card-body py-3 px-6">
            <div class="table-responsive">

                <table class="table align-middle gs-0 gy-4">
                    <thead>
                    <tr class="fw-bold text-muted bg-light align-middle">
                        <th style="max-width: 50px" class="ps-4 py-3 rounded-start">
                            <div class="form-check form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox">
                            </div>
                        </th>
                        <th v-for="(item, index) in headers" :key="index"
                            :class="'text-' + item.align + ' min-w-' + item.width + 'px'"
                            class="py-3"
                        >
                            <select v-if="item.search_type === 'select'"
                                    class="form-select form-select-sm form-select-solid"
                                    :placeholder="item.label"
                            >
                                <option value="" selected>All</option>
                                <option v-for="option in item.select_options" :key="option" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <input v-else-if="item.search_type==='date'"
                                   class="form-control form-control-sm form-control-solid" type="date"
                                   :placeholder="item.label">
                            <input v-else class="form-control form-control-sm form-control-solid" type="text"
                                   :placeholder="item.label">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="d in data" :key="d">
                        <tr>
                            <th style="max-width: 50px" class="ps-4 py-3 rounded-start">
                                <div class="form-check form-check-custom form-check-solid">
                                    <input class="form-check-input" type="checkbox">
                                </div>
                            </th>
                            <th v-for="tr in headers" :class="'text-' + tr.align">
                                <span v-if="d[tr.value]">
                                    <slot :name="tr.value" :row="d" :key="tr.value">
                                        {{ d[tr.value] }}
                                    </slot>
                                </span>
                                <span v-else>
                                    <slot :name="tr.value" :row="d" :key="tr.value">
                                        --
                                    </slot>
                                </span>
                            </th>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ApiService from "@/core/services/ApiService"

export interface Thead {
    label: string,
    value: string,
    align?: 'start' | 'center' | 'end',
    width?: string | '200px',
    search_type?: 'input' | 'select' | 'date',
    select_options?: { value: string; label: string }[];
}

export default defineComponent({
    name: "STable",
    props: {
        headers: {
            type: Array as () => Thead[],
            required: true,
        },
        api_url: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            data: []
        }
    },
    methods: {
        async getData() {
            if (!this.api_url) return
            let response = await ApiService.get(this.api_url)
            if (response.status === 200) {
                this.data = response.data.results
            }
        }
    },
    mounted() {
        this.getData()
    }
})
</script>

<style scoped>

</style>