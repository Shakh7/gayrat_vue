<template>

    <div class="card">
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold fs-3 mb-1">{{ name }} Table</span>

                <span class="text-muted mt-1 fw-semobold fs-7">
                    Over 500 {{ name }}
                </span>
            </h3>
            <div class="card-toolbar">
                <div class="me-5">
                    <slot name="topRight"></slot>
                </div>
                <inline-svg :src="getAssetPath('media/icons/duotune/general/gen019.svg')"></inline-svg>
            </div>
        </div>

        <div class="card-body py-3 px-6">
            <div class="table-responsive">

                <table class="table align-middle gs-0 gy-4">
                    <thead>
                    <tr class="fw-bold text-muted bg-light align-middle">
                        <th style="max-width: 50px" class="ps-4 py-3 rounded-start">
                            <div class="form-check form-check-custom form-check-solid">
                                <input :checked="selected.length === data.length"
                                       @click="selectAll"
                                       class="form-check-input" type="checkbox">
                            </div>
                        </th>
                        <th v-for="(item, index) in headers_computed" :key="index"
                            :class="'text-' + item.align"
                            :style="'max-width: ' + item.width"
                            class="py-3"
                        >
                            <select v-if="item.search_type === 'select'"
                                    v-model="item.search_text"
                                    class="form-select form-select-sm form-select-solid w-50"
                                    :placeholder="item.label" @change="searchChange"
                            >
                                <option value="" selected>All</option>
                                <option v-for="option in item.select_options" :key="option" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <input v-else-if="item.search_type==='date'"
                                   class="form-control form-control-sm form-control-solid w-100" type="date"
                                   :placeholder="item.label"
                                   v-model="item.search_text"
                                   @input="searchChange"
                            >
                            <!--                            <div v-else-if="item.search_type==='date'">-->
                            <!--                                <el-date-picker-->
                            <!--                                        type="date"-->
                            <!--                                        name="eventStartDate"-->
                            <!--                                        class="w-100"-->
                            <!--                                        @change="searchChange"-->
                            <!--                                        v-model="item.search_text"-->
                            <!--                                />-->
                            <!--                            </div>-->
                            <input v-else class="form-control form-control-sm form-control-solid" type="text"
                                   :placeholder="item.label"
                                   @input="searchChange"
                                   v-model="item.search_text"
                            >
                        </th>
                    </tr>
                    </thead>
                    <!-- Loaded and no error occered -->
                    <tbody v-if="!loading && !error.status">
                    <template v-for="d in data" :key="d">
                        <tr>
                            <th style="max-width: 50px" class="ps-4 py-3 rounded-start">
                                <div class="form-check form-check-custom form-check-solid">
                                    <input @click="selectSingle(d)"
                                           :checked="selected.map(i => i.id).includes(d.id)"
                                           class="form-check-input" type="checkbox">
                                </div>
                            </th>
                            <td v-for="tr in headers" :class="'text-' + tr.align">
                                <span v-if="d[tr.value]" class="text-dark">
                                    <slot :name="tr.value" :row="d" :key="tr.value">
                                        {{ d[tr.value] }}
                                    </slot>
                                </span>
                                <span v-else>
                                    <slot :name="tr.value" :row="d" :key="tr.value">
                                        --
                                    </slot>
                                </span>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <th colspan="2">
                            <select v-if="per_page_option" class="form-select form-select-sm w-50"
                                    style="max-width: 75px">
                                <option v-for="option in per_page_option" :key="option.value">{{
                                    option.label
                                    }}
                                </option>
                            </select>
                            <select v-else class="form-select form-select-sm w-50" style="max-width: 75px">
                                <option v-for="option in default_per_page_options" :key="option.value">{{
                                    option.label
                                    }}
                                </option>
                            </select>
                        </th>
                        <td :colspan="headers.length - 1"></td>
                    </tr>
                    </tbody>

                    <!-- Loading and no error occered -->
                    <tbody v-else-if="loading">
                    <tr v-for="i in 2" :key="i + '_sekeleton_row'">
                        <th style="min-width: 50px">
                        </th>
                        <td v-for="td in headers" :key="td.value" class="py-5">
                            <div class="w-75 mx-auto">
                                <skeleton/>
                            </div>
                        </td>
                    </tr>
                    </tbody>

                    <!-- Loaded and error occered -->
                    <tbody v-if="!loading && error.status">
                    <tr>

                        <td :colspan="headers.length + 1">
                            <div class="alert alert-dismissible bg-light-danger
                             d-flex flex-center flex-column py-10 px-10 px-lg-20"
                            >
                                <button type="button"
                                        class=" position-absolute top-0 end-0 m-2 btn btn-icon btn-icon-danger"
                                        data-bs-dismiss="alert"
                                >
                                  <span class="svg-icon svg-icon-1">
                                    <inline-svg src="media/icons/duotune/arrows/arr061.svg"/>
                                  </span>
                                </button>

                                <span class="svg-icon svg-icon-5tx svg-icon-danger mb-5">
                                    <inline-svg src="media/icons/duotune/general/gen044.svg"/>
                                </span>

                                <div class="text-center text-dark">
                                    <h1 class="fw-bolder mb-5">{{ error.title }}</h1>
                                    <div class="separator separator-dashed border-danger opacity-25 mb-5">
                                    </div>

                                    <div class="mb-9">
                                        {{ error.message }}
                                    </div>
                                    <!--                                    <div class="d-flex flex-center flex-wrap">-->
                                    <!--                                        <a href="#" class="btn btn-outline btn-outline-danger btn-active-danger m-2">-->
                                    <!--                                            Cancel-->
                                    <!--                                        </a>-->
                                    <!--                                        <a href="#" class="btn btn-danger m-2">Ok, I got it</a>-->
                                    <!--                                    </div>-->
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ApiService from "@/core/services/ApiService"
import {getAssetPath} from "@/core/helpers/assets";
import skeleton from "@/components/skeletons/skeleton.vue"

export interface Thead {
    label: string,
    value: string,
    align?: 'start' | 'center' | 'end',
    width?: string | '75px' | '100px' | '200px',
    search_type?: 'input' | 'select' | 'date',
    select_options?: { value: string; label: string }[];
}

export interface PerPageOption {
    label: string,
    value: string,
}

export default defineComponent({
    emits: ['onSelect'],
    name: "STable",
    props: {
        name: {
            type: String,
            required: false,
            default: () => 'Table'
        },
        headers: {
            type: Array as () => Thead[],
            required: true,
        },
        api_url: {
            type: String,
            required: true,
        },
        per_page_option: {
            type: Array as () => PerPageOption[],
            required: false,
        },
        per_page: {
            type: Number,
            required: false,
            default: () => 10
        },
        getUpdate: {
            type: Boolean,
            required: false
        },
    },
    components: {skeleton},
    data() {
        let default_per_page_options: PerPageOption[] = [
            {
                value: '10',
                label: '10'
            },
            {
                value: '25',
                label: '25'
            },
            {
                value: '50',
                label: '50'
            },
            {
                value: '100',
                label: '100'
            },
            {
                value: '',
                label: 'All'
            },
        ]
        return {
            data: [],
            selected: [] as any,
            loading: true,
            error: {
                status: false,
                title: 'Success',
                message: 'No Error Occured'
            },
            default_per_page_options: default_per_page_options
        }
    },
    computed: {
        headers_computed() {
            return this.headers.map((header: Thead) => ({
                ...header,
                search_text: '',
            }))
        }
    },
    methods: {
        getAssetPath,
        async getData() {
            if (!this.api_url) return
            try {
                let params = {}
                let searched_fields = this.headers_computed.filter((header) => header.search_text !== '')
                searched_fields.forEach((field) => {
                    params[field.value] = field.search_text
                })
                let response = await ApiService.get(this.api_url, {
                    params: params
                })
                this.data = response.data.results
            } catch (error) {
                this.error.status = true
                this.error.title = error.response.statusText
                this.error.message = error.response.data.detail
            }
            this.loading = false
        },
        selectSingle(row) {
            const index = this.selected.findIndex(item => item.id === row.id);
            if (index !== -1) {
                this.selected.splice(index, 1);
            } else {
                this.selected.push(row)
            }
            this.$emit('onSelect', this.selected)
        },
        selectAll() {
            this.selected.length === this.data.length
                ? this.selected = []
                : this.selected = [...this.data]
            this.$emit('onSelect', this.selected)
        },
        unselectAll() {
            this.selected = []
            this.$emit('onSelect', this.selected)
        },

        async searchChange() {
            setTimeout(() => {
                this.getData()
            }, 500)
        }
    },
    mounted() {
        this.loading = true
        this.getData()
    },
    watch: {
        getUpdate() {
            this.unselectAll()
            this.getData()
        }
    }
})
</script>

<style>
</style>