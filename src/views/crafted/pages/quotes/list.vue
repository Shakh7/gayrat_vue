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
                <Dropdown2></Dropdown2>
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
                    <tr class="fw-bold text-muted bg-light">
                        <th style="max-width: 50px" class="ps-4 rounded-start">
                            <div class="form-check form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox">
                            </div>
                        </th>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Pick Up Address</th>
                        <th>Drop Off Address</th>
                        <th>PIck Up Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody v-if="!is_loading">
                    <template v-for="(item, index) in list" :key="index">
                        <tr>
                            <td class="ps-4">
                                <div class="form-check form-check-custom form-check-solid">
                                    <input class="form-check-input" type="checkbox"
                                           :checked="selected_quotes.map(i => i.id).includes(item.id) === true">
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.customer.first_name + ' ' + item.customer.last_name }}</a
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
                                    >{{ item.pick_up_address.city_name + ', ' + item.pick_up_address.state_code }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{ item.pick_up_address.state_name + ', ' + item.pick_up_address.zip_code }}</span
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start flex-column">
                                    <a
                                            href="#"
                                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                    >{{ item.drop_off_address.city_name + ', ' + item.drop_off_address.state_code }}</a
                                    >
                                    <span
                                            class="text-muted fw-semobold text-muted d-block fs-7"
                                    >{{
                                        item.drop_off_address.state_name + ', ' + item.drop_off_address.zip_code
                                        }}</span
                                    >
                                </div>
                            </td>
                            <td>
                                {{ item.pick_up_date }}
                            </td>
                            <td>
                                <router-link :to="{name: 'quote-details', params: {id: item.id}}">
                                    <button class="btn btn-sm btn-primary p-1 px-3 me-3">See</button>
                                </router-link>

                                <button class="btn btn-sm btn-danger p-1 px-3">Delete</button>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import axios from "axios";

export default defineComponent({
    name: "kt-c",
    components: {
        Dropdown2,
    },
    data() {
        return {
            list: [] as any,
            selected_quotes: [] as any,
            getAssetPath,
            is_loading: true,
        };
    },
    methods: {
        async getQuotes() {
            this.is_loading = true
            let response = await axios.get("http://127.0.0.1:8000/api/quotes");
            if (response.status === 200) {
                this.is_loading = false
                this.list = response.data.results;
            }
        },
        pushToSelected(quote) {
            this.selected_quotes.push(quote)
        }
    },
    mounted() {
        this.getQuotes()
    }
});
</script>
