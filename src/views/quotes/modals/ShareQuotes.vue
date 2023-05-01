<template>
    <button v-if="quotes_list.length > 0" class="btn btn-sm btn-primary"
            data-bs-target="#share_quotes_model"
            data-bs-toggle="modal">
        Share Quotes
        <span class="badge badge-square badge-light ms-2">{{ quotes_list.length }}</span>
    </button>


    <div
            class="modal fade"
            id="share_quotes_model"
            tabindex="-1"
            role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false"
    >
        <div class="modal-dialog mw-1000px modal-static">
            <div v-if="!submit_started" class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">Share Quotes</h1>
                    <div
                            class="btn btn-sm btn-icon btn-active-color-primary"
                            data-bs-dismiss="modal"
                    >
                        <span class="svg-icon svg-icon-1">
                          <inline-svg
                                  :src="getAssetPath('media/icons/duotune/arrows/arr061.svg')"
                          />
                        </span>
                    </div>
                </div>

                <div class="modal-body py-5 mx-15">
                    <div class="row justify-content-between">
                        <div class="col-4 text-start">
                            <h5 class="my-0" :class="{
                                'text-primary' : state === 'quotes'
                            }">View Quotes</h5>
                        </div>
                        <div class="col-4 text-center">
                            <h5 class="my-0" :class="{
                                'text-primary' : state === 'clients'
                            }">Select Clients</h5>
                        </div>
                        <div class="col-4 text-end">
                            <h5 class="my-0" :class="{
                                'text-primary' : state === 'sharing'
                            }">Share Quotes</h5>
                        </div>
                    </div>
                </div>

                <div class="separator"></div>

                <!-- VIEW QUOTES -->
                <div class="modal-body mx-15 pb-10 pb-15"
                     :class="[state !== 'quotes' && 'd-none']"
                >
                    <div class="table-responsive mb-15">
                        <table class="table table-row-dashed table-row-gray-300 mb-0">
                            <thead>
                            <tr class="fw-bold text-muted align-middle">
                                <th class="ps-3">ID</th>
                                <th style="min-width: 120px">Date Received</th>
                                <th style="min-width: 120px">Pick up Date</th>
                                <th>Car</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th class="pe-3">
                                    Price
                                    <select v-model="price_all" class=" border-0 bg-transparent" style="outline: none">
                                        <option v-for="price in quote_prices" :key="price.value" :value="price.value">
                                            {{ price.label }}
                                        </option>
                                    </select>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="align-middle" v-for="quote in quotes_list" :key="quote.id">
                                <th class="ps-3">{{ quote.id.slice(0, 8) }}..</th>
                                <td class="w-min-250px">{{ quote.created_at.slice(0, 10) }}</td>
                                <td>{{ quote.pick_up_date }}</td>
                                <td>{{ quote.car_make }}</td>
                                <td>{{ quote.origin.state_name }}</td>
                                <td>{{ quote.destination.state_name }}</td>
                                <td class="pe-3">
                                    <select v-model="quote.price" @change="calculateTotalPrice()"
                                            class="form-select form-select-sm">
                                        <option v-for="price in quote_prices" :key="price.value" :value="price.value">
                                            {{ price.label }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-end">
                        <button @click="state = 'clients'"
                                class="btn btn-primary">Confirm and Next
                        </button>
                    </div>
                </div>

                <div :class="[state !== 'clients' && 'd-none']" class="mx-15 modal-body">
                    <div class="d-flex flex-column flex-lg-row
                     justify-content-lg-between
                     align-items-center"
                    >
                        <div class="w-75 py-15 pt-10 text-center mx-auto">
                            <div class="text-start mb-10">
                                <h3 class="modal-title">Select clients</h3>
                                <p class="mb-2 text-muted fs-6">Select clients that you want to share the quotes
                                    with</p>
                            </div>
                            <Multiselect class="mb-15" v-model="clients.value"
                                         v-bind="clients"
                            >
                                <template v-slot:option="{ option }">
                                    <div class="d-flex justify-content-start flex-column text-start">
                                <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                                     {{ option.label }}
                                </span>
                                        <small class="text-muted fw-semobold text-muted d-block">
                                            {{ option.email }}
                                        </small>
                                    </div>
                                </template>
                            </Multiselect>
                            <div class="text-end">
                                <button @click="state = 'quotes'"
                                        class="btn btn-secondary me-3">Back
                                </button>
                                <button v-if="clients.value.length > 0"
                                        @click="state = 'sharing'"
                                        class="btn btn-primary"
                                >
                                    Confirm and Next
                                </button>
                                <button v-else
                                        class="btn btn-primary"
                                        disabled
                                >
                                    Confirm and Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div :class="[state !== 'sharing' && 'd-none']" class="mx-15 modal-body pt-10 py-15">

                    <div class="w-75 mx-auto mb-0">
                        <div class="alert alert-primary d-flex align-items-center p-5">
                            <span class="svg-icon svg-icon-2hx svg-icon-primary me-4">
                              <inline-svg src="media/icons/duotune/general/gen044.svg"/>
                            </span>
                            <div class="d-flex flex-column">
                                <h4 class="mb-1 text-dark">Please Note!</h4>
                                <span class="text-muted">
                                    This action <span class="fw-bold text-gray-600">
                                    cannot be reverted</span> and all the quotes which was
                                    <br><span class="fw-bold text-gray-600">previously shared</span>
                                    with selected clients
                                    <span class="fw-bold text-gray-600">will be skipped</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex flex-wrap flex-stack mb-10 w-75 mx-auto">

                        <div class="d-flex flex-wrap">
                            <div class=" border-primary w-150px rounded my-3 p-4 me-6"
                                 style="border: 1px dashed">
                                  <span class="fs-1 fw-bold text-gray-800 lh-1">
                                    <span
                                            data-kt-countup="true"
                                            data-kt-countup-value="6,840"
                                            data-kt-countup-prefix="$"
                                    >
                                        {{ quotes_list.length }}
                                    </span>
                                  </span>
                                <span class="fs-6 fw-semobold text-muted d-block lh-1 pt-2">
                                    Quotes Selected
                                </span>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap">
                            <div class=" border-primary w-150px rounded my-3 p-4 me-6"
                                 style="border: 1px dashed">
                                  <span class="fs-1 fw-bold text-gray-800 lh-1">
                                    <span
                                            data-kt-countup="true"
                                            data-kt-countup-value="6,840"
                                            data-kt-countup-prefix="$"
                                    >
                                        {{ clients.value.length }}
                                    </span>
                                  </span>
                                <span class="fs-6 fw-semobold text-muted d-block lh-1 pt-2">
                                    Clients Selected
                                </span>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap">
                            <div class=" border-primary w-150px rounded my-3 p-4 me-6"
                                 style="border: 1px dashed">
                                  <span class="fs-1 fw-bold text-gray-800 lh-1">
                                    <span
                                            data-kt-countup="true"
                                            data-kt-countup-value="6,840"
                                            data-kt-countup-prefix="$"
                                    >
                                        ${{ total_price * clients.value.length }}
                                        <span class="text-muted fs-4 fw-semobold">USD</span>
                                    </span>
                                  </span>
                                <span class="fs-6 fw-semobold text-muted d-block lh-1 pt-2">
                                    Total Price
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="text-end w-75 mx-auto">
                        <div v-if="!share_confirmed">
                            <button @click="state='clients'"
                                    class="btn btn-secondary me-3">
                                Back
                            </button>
                            <button @click="share_confirmed = true" class="btn btn-primary">
                                Share Quotes
                            </button>
                        </div>
                        <div v-else>
                            <h6>Are you absolutly sure ?</h6>
                            <div>
                                <button @click="share_confirmed = false" class="btn btn-secondary me-3">
                                    No Cancel
                                </button>
                                <button @click="shareQuotes" class="btn btn-success">
                                    Confirm and Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="submit_started" class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">Share Quotes</h1>
                    <div
                            class="btn btn-sm btn-icon btn-active-color-primary"
                            data-bs-dismiss="modal"
                    >
                        <span class="svg-icon svg-icon-1">
                          <inline-svg
                                  :src="getAssetPath('media/icons/duotune/arrows/arr061.svg')"
                          />
                        </span>
                    </div>
                </div>
                <div class="modal-body py-5">
                    <div v-if="!submit_is_success" class="text-center py-15">
                        <span class="svg-icon svg-icon-4x">
                        <inline-svg src="media/icons/duotune/general/gen012.svg"/>
                        </span>
                        <h5 class="my-0 mt-10">
                            We are sharing the quotes, please wait
                        </h5>
                    </div>
                    <div v-else-if="submit_is_success" class="text-center py-15 pb-10">
                        <span class="svg-icon svg-icon-4x">
                        <inline-svg src="media/icons/duotune/general/gen020.svg"/>
                        </span>
                        <h5 class="my-10">
                            We have shared the quotes successfully
                        </h5>
                        <button @click="closeModal()" class="btn btn-success">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import quote_prices from "@/core/data/quote_prices";
import {getClients} from "@/api/clients/api";
import {createLeads, type Lead} from "@/api/leads/api";

export default defineComponent({
    emits: ['created'],
    name: "ShareQuotes",
    props: {
        quotes: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    components: {
        Multiselect
    },
    data() {
        return {
            getAssetPath: getAssetPath,
            quote_prices: quote_prices,
            clients: ({
                mode: "tags",
                value: [],
                placeholder: "Select clients",
                searchable: true,
                label: "label",
                trackBy: "value",
                options: [],
                object: true
            }),
            share_confirmed: false,
            price_all: '1',
            total_price: '0',
            state: 'quotes',
            submit_started: false,
            submit_is_success: false
        }
    },
    computed: {
        quotes_list() {
            return this.quotes.map(i => ({
                ...i,
                price: '1'
            }))
        },
    },
    methods: {
        async getClientsList() {
            if (this.clients.options.length > 0) return
            let response = await getClients()
            if (!response.error) {
                this.clients.options = response.results.map(i => ({
                    value: i.full_name,
                    label: i.full_name,
                    email: i.email,
                    id: i.id
                }))
            }
        },
        async shareQuotes() {
            this.submit_started = true
            let leads = [] as Lead[]
            this.quotes_list.forEach(quote => {
                this.clients.value.forEach(client => {
                    leads.push({
                        quote_id: quote.id,
                        client_id: client.id,
                        price: quote.price,
                    })
                })
            })
            try {
                await createLeads(leads)
                setTimeout(() => {
                    this.submit_is_success = true
                }, 500)
            } catch {
                this.submit_is_success = false
            }
            setTimeout(() => {
                this.closeModal()
            }, 3000)
        },
        calculateTotalPrice() {
            this.total_price = this.quotes_list
                .map(i => i.price)
                .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
                .toFixed(2)
        },
        closeModal() {
            document.querySelector('#share_quotes_model div[data-bs-dismiss="modal"]').click()
            this.$emit('created')
        }
    },
    watch: {
        quotes_list() {
            this.share_confirmed = false
            this.price_all = '1'
            this.total_price = '0'
            this.state = 'quotes'
            this.submit_started = false
            this.submit_is_success = false
            this.clients.value = []
            this.getClientsList()
            this.calculateTotalPrice()
        },
        price_all(new_price) {
            this.quotes_list.forEach(quote => {
                quote.price = new_price
            })
            this.calculateTotalPrice()
        }
    }
})
</script>

<style scoped>

</style>
<script setup lang="ts">
</script>