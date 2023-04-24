<template>
  <!--begin::Tables Widget 12-->
    <div class="card">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold fs-3 mb-1">Quotes List</span>

                <span class="text-muted mt-1 fw-semobold fs-7"
                >Over 500 new quotes</span
                >
            </h3>
            <div class="card-toolbar">
                <div v-if="selected_quotes.length === 0">
                    <!--begin::Menu-->
                    <button
                            type="button"
                            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            data-kt-menu-flip="top-end"
                    >
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                                :src="getAssetPath('media/icons/duotune/general/gen024.svg')"
                        />
                      </span>
                    </button>
                    <div
                            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold w-200px"
                            data-kt-menu="true"
                    >
                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">
                                Table Settings
                            </div>
                        </div>
                        <!--end::Menu item-->

                        <!--begin::Menu separator-->
                        <div class="separator mb-3 opacity-75"></div>
                        <!--end::Menu separator-->

                        <!--begin::Menu item-->
                        <div class="ps-5 p-3">
                            <div class="form-check form-check-custom form-check-solid form-check-sm">
                                <input v-model="table.search_server" class="form-check-input" type="checkbox" value=""
                                       id="searchServerCheck">
                                <label class="form-check-label" for="searchServerCheck">Search server</label>
                            </div>
                        </div>
                        <!--end::Menu item-->

                        <!--begin::Menu separator-->
                        <div class="separator mt-3 opacity-75"></div>
                        <!--end::Menu separator-->

                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <div class="menu-content d-flex justify-content-between px-3 py-3">
                                <a class="btn btn-transparent btn-sm px-4" href="#"> Reset </a>
                                <a class="btn btn-primary btn-sm px-4" href="#"> Apply </a>
                            </div>
                        </div>
                        <!--end::Menu item-->
                    </div>
                </div>
                <div v-else>
                    <button class="btn btn-sm btn-primary" data-bs-toggle="modal"
                            data-bs-target="#share_quotes_model">
                        Share Quotes
                    </button>
                </div>
            </div>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body py-3 px-6">

            <!--begin::Table container-->
            <div class="table-responsive">
                <!--begin::Table-->
                <table class="table align-middle gs-0 gy-4">
                    <!--begin::Table head-->
                    <thead>
                    <tr class="fw-bold text-muted bg-light align-middle">
                        <th style="max-width: 50px" class="ps-4 py-3 rounded-start">
                            <div class="form-check form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox"
                                       @change="pushAlToSelected"
                                       :checked="this.selected_quotes.length === this.list.length"
                                >
                            </div>
                        </th>
                        <th v-for="(item, index) in table_headers" :key="index" class="min-w-125px py-3">
                            <select v-if="item.search_type === 'select'"
                                    class="form-select form-select-sm form-select-solid"
                                    :placeholder="item.text"
                                    @change="searchChange(item.value, $event.target.value)"
                            >
                                <option value="" selected>All</option>
                                <option v-for="option in item.select_options" :key="option" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <input v-else-if="item.search_type === 'date'"
                                   class="form-control form-control-sm form-control-solid" type="date"
                                   :placeholder="item.text" v-model="item.search"
                                   @input="searchChange(item.value, $event.target.value)"/>
                            <input v-else class="form-control form-control-sm form-control-solid" type="text"
                                   :placeholder="item.text"
                                   @input="searchChange(item.value, $event.target.value)"/>
                        </th>
                    </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody v-if="!is_loading && table_data.length > 0">
                    <template v-for="(item, index) in table_data" :key="index">
                        <tr>
                            <td class="ps-4">
                                <div class="form-check form-check-custom form-check-solid">
                                    <input class="form-check-input"
                                           @click="pushToSelected(item)"
                                           type="checkbox"
                                           :checked="selected_quotes.map(i => i.id).includes(item.id)">
                                </div>
                            </td>
                            <td>
                                {{ item.unique_code }}
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.customer.full_name }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{ item.customer.email }}</span
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.car_make }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{ item.car_model }}</span
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.destination.city_name + ', ' + item.destination.state_code }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{ item.destination.state_name + ', ' + item.destination.zip_code }}</span
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.departure.city_name + ', ' + item.departure.state_code }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{
                                        item.departure.state_name + ', ' + item.departure.zip_code
                                        }}</span
                                    >
                                </div>
                            </td>
                            <td class="text-center">
                                    <span class="badge" :class="{
                                        'bg-success': item.is_lead === true,
                                        'bg-danger': item.is_lead === false,
                                    }">
                                        {{ item.is_lead ? 'Connected' : 'Not Connected' }}
                                    </span>
                            </td>
                            <td class="text-center">
                                {{ item.pick_up_date }}
                            </td>
                            <td class="text-center">
                                    <span v-if="item.created_at">
                                        {{ item.created_at }}
                                    </span>
                            </td>
                            <td>
                                <div class="d-flex">
                                    <button class="btn btn-sm btn-primary p-1 px-3 me-3" data-bs-toggle="modal"
                                            data-bs-target="#share_quotes_model"
                                            @click="pushSingleQuote(item)">
                                        Share
                                    </button>

                                    <button class="btn btn-sm btn-danger p-1 px-3">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </template>
                    </tbody>

                    <tbody v-else-if="!is_loading
                     && table_data.length === 0
                     && this.table.headers.filter(i => i.search !== undefined || i.search !=='').length > 0">
                    <tr>
                        <th :colspan="table_headers.length + 1" class="px-3 pt-10">
                            <div class="mb-5">
                                <span>We could not find any matching quotes for your queries !</span>
                            </div>
                            <div v-for="query in table_searched_fields"
                                 :key="query"
                                 class="d-block mb-3">
                                <span class="fw-semibold pe-3">{{ query.key.split('_').join(' ') }}:</span>
                                <span>{{ query.value.split('_').join(' ') }}</span>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <ShareQuotesModal :quotes="selected_quotes"/>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import axios from "axios";
import ShareQuotesModal from "@/components/modals/forms/ShareQuotesModal.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
    name: "kt-c",
    components: {
        ShareQuotesModal
    },
    data() {
        return {
            city: [],
            timeout: 200,
            list: [],
            selected_quotes: [] as any,
            getAssetPath,
            is_loading: true,
            table: {
                search_server: true,
                headers: [
                    {
                        text: 'Unique Code',
                        value: "unique_code",
                        align: 'start',
                        width: '200px',
                    },
                    {
                        text: "Customer",
                        value: "customer",
                        align: "start",
                        width: "200px",
                    },
                    {
                        text: "Car",
                        value: "car",
                        align: "start",
                        width: "200px",
                    },
                    {
                        text: "Pick Up Address",
                        value: "pick_up_address",
                        align: "start",
                        width: "200px",
                    },
                    {
                        text: "Drop Off Address",
                        value: "drop_off_address",
                        align: "start",
                        width: "200px",
                    },
                    {
                        text: "Status",
                        value: "is_lead",
                        align: "start",
                        width: "200px",
                        search_type: 'select',
                        select_options: [
                            {
                                label: 'Connected',
                                value: 'true'
                            },
                            {
                                label: 'Not Connected',
                                value: 'false'
                            }
                        ]
                    },
                    {
                        text: "Pick Up Date",
                        value: "pick_up_date",
                        align: "start",
                        width: "200px",
                        search_type: 'date'
                    },
                    {
                        text: "Created At",
                        value: "created_at",
                        align: "start",
                        width: "200px",
                        search_type: 'date'
                    },
                    {
                        text: "Actions",
                        value: "actions",
                        sortable: false,
                        align: "start",
                        width: "200px",
                    }
                ]
            },
            is_searching: false
        };
    },
    computed: {
        table_headers() {
            return this.table.headers.map((item: any) => {
                return {
                    ...item,
                };
            });
        },
        table_data() {

            let searched_fields = this.table_headers.filter(i => i.search !== undefined && i.search !== '').map(i => {
                return {
                    key: i.value,
                    value: i.search
                }
            })

            if (this.table.search_server) {
                return this.list
            } else if (!this.table.search_server && searched_fields.length > 0) {
                let query = this.list
                let results = [] as any
                searched_fields.forEach((key, index) => {

                    if (key.key === 'car') {
                        query = query.filter(i => {
                            if (
                                i.car_make.toLowerCase().includes(key.value.toLowerCase()) ||
                                i.car_model.toLowerCase().includes(key.value.toLowerCase())
                            ) {
                                return i
                            }
                        })
                    }

                    if (key.key === 'customer') {
                        query = query.filter(i => {
                            if (
                                i.customer.full_name.toLowerCase().includes(key.value.toLowerCase()) ||
                                i.customer.email.toLowerCase().includes(key.value.toLowerCase())
                            ) {
                                return i
                            }
                        })
                    }

                })
                return query
            } else {
                return this.list
            }
        },
        table_searched_fields() {
            let searched_fields = this.table_headers.filter(i => i.search !== undefined && i.search !== '').map(i => {
                return {
                    key: i.value,
                    value: i.search
                }
            })
            return searched_fields
        }
    },
    methods: {
        async getQuotes() {
            let response = await ApiService.get('quotes')
            if (response.status === 200) {
                this.is_loading = false
                this.list = response.data.results
            }
        },
        async searchQuotesServer(searched_fields: any []) {
            this.is_searching = true
            let url = `http://68.183.109.5:3000/api/quotes`
            searched_fields.forEach((item, index) => {
                index === 0 ? url += `?${item.key}=${item.value}` : url += `&${item.key}=${item.value}`
            })
            let response = await axios.get(url);
            if (response.status === 200) {
                this.list = response.data.results;
            }
            this.is_searching = false
        },
        pushToSelected(quote) {
            if (this.selected_quotes.map(i => i.id).includes(quote.id)) {
                this.selected_quotes = this.selected_quotes.filter(i => i.id !== quote.id)
            } else {
                this.selected_quotes.push(quote)
            }
        },
        pushSingleQuote(quote) {
            if (this.selected_quotes.map(i => i.id).includes(quote.id)) {
                return
            } else {
                this.selected_quotes.push(quote)
            }
        },
        pushAlToSelected() {
            if (this.selected_quotes.length === this.list.length) {
                this.selected_quotes = []
            } else {
                this.selected_quotes = this.list
            }
        },
        async searchChange(field_name, field_value) {
            this.table.headers.find(i => i.value === field_name).search = field_value
            if (this.table.search_server) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.searchQuotesServer(this.table_searched_fields)
                }, 400)
            }
        }
    },
    mounted() {
        this.getQuotes()
    }
});
</script>
