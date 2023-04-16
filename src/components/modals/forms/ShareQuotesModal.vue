<template>
  <!--begin::Modal - Invite Friends-->
    <div
            class="modal fade"
            id="share_quotes_model"
            tabindex="-1"
            aria-hidden="true"
    >
        <!--begin::Modal dialog-->
        <div class="modal-dialog mw-800px">
            <!--begin::Modal content-->
            <div class="modal-content">
                <!--begin::Modal header-->
                <div class="modal-header">
                    <h1 class="modal-title">Share Quotes</h1>
                    <!--begin::Close-->
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
                    <!--end::Close-->
                </div>
                <!--begin::Modal header-->

                <!--begin::Modal body-->
                <div class="modal-body scroll-y mx-lg-10 pb-15">

                    <!--begin::Separator-->
                    <!--                    <div class="separator d-flex flex-center mb-8">-->
                    <!--            <span-->
                    <!--                    class="text-uppercase bg-body fs-7 fw-semobold text-gray-400 px-3"-->
                    <!--            >or</span-->
                    <!--            >-->
                    <!--                    </div>-->
                    <!--end::Separator-->

                    <!--begin::Users-->
                    <div class="mb-10">
                        <!--begin::Heading-->
                        <div class="fs-6 fw-semobold mb-2">Selected Quotes</div>
                        <!--end::Heading-->


                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr class="fw-bold text-muted bg-light ">
                                    <th class="ps-5 rounded-start">#</th>
                                    <th>Car</th>
                                    <th>Pick Up Address</th>
                                    <th>Drop Off Address</th>
                                    <th>PIck Up Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(quote, index) in quotes" :key="index">
                                    <!--begin::User-->
                                    <tr class="text-center align-middle">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>
                                            <div class="d-flex justify-content-start flex-column text-start">
                                                <a
                                                        href="#"
                                                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                                >{{ quote.car_make }}</a
                                                >
                                                <span
                                                        class="text-muted fw-semobold text-muted d-block fs-7"
                                                >{{ quote.car_model }}</span
                                                >
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-start flex-column text-start">
                                                <a
                                                        href="#"
                                                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                                >{{
                                                    quote.departure.city_name + ', ' + quote.departure.state_code
                                                    }}</a
                                                >
                                                <span
                                                        class="text-muted fw-semobold text-muted d-block fs-7"
                                                >{{
                                                    quote.departure.state_name + ', ' + quote.departure.zip_code
                                                    }}</span
                                                >
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-start flex-column text-start">
                                                <a
                                                        href="#"
                                                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                                >{{
                                                    quote.destination.city_name + ', ' + quote.destination.state_code
                                                    }}</a
                                                >
                                                <span
                                                        class="text-muted fw-semobold text-muted d-block fs-7"
                                                >{{
                                                    quote.destination.state_name + ', ' + quote.destination.zip_code
                                                    }}</span
                                                >
                                            </div>
                                        </td>
                                        <td>{{ quote.pick_up_date }}</td>
                                        <td class="mw-100px">
                                            <input class="form-control form-control-sm" type="number"
                                                   placeholder="Price">
                                        </td>
                                    </tr>
                                    <!--end::User-->
                                </template>
                                </tbody>
                            </table>
                        </div>
                        <!--begin::List-->
                        <!--end::List-->
                    </div>
                    <!--end::Users-->

                    <!--begin::Notice-->
                    <div class="d-flex flex-stack">
                        <!--begin::Label-->
                        <div class="me-5 fw-semobold">
                            <label class="fs-6">Adding Users by Team Members</label>
                            <div class="fs-7 text-gray-400">
                                If you need more info, please check budget planning
                            </div>
                        </div>
                        <!--end::Label-->

                        <!--begin::Switch-->
                        <label
                                class="form-check form-switch form-check-custom form-check-solid"
                        >
                            <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value="1"
                                    checked
                            />

                            <span class="form-check-label fw-semobold text-gray-400">
                Allowed
              </span>
                        </label>
                        <!--end::Switch-->
                    </div>
                    <!--end::Notice-->
                </div>
                <!--end::Modal body-->
            </div>
            <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
    </div>
  <!--end::Modal - Invite Friend-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";

export default defineComponent({
    name: "invite-friends-modal",
    props: {
        quotes: Array
    },
    setup() {
        const users = [
            {
                avatar: getAssetPath("media/avatars/300-6.jpg"),
                name: "Emma Smith",
                email: "e.smith@kpmg.com.au",
                access: "1",
            },
            {
                state: "danger",
                name: "Melody Macy",
                email: "melody@altbox.com",
                access: "1",
            },
            {
                avatar: getAssetPath("media/avatars/300-1.jpg"),
                name: "Max Smith",
                email: "max@kt.com",
                access: "3",
            },
            {
                avatar: getAssetPath("media/avatars/300-1.jpg"),
                name: "Sean Bean",
                email: "sean@dellito.com",
                access: "2",
            },
            {
                avatar: getAssetPath("media/avatars/300-25.jpg"),
                name: "Brian Cox",
                email: "brian@exchange.com",
                access: "3",
            },
            {
                state: "warning",
                name: "Mikaela Collins",
                email: "mikaela@pexcom.com",
                access: "2",
            },
            {
                avatar: getAssetPath("media/avatars/300-9.jpg"),
                name: "Francis Mitcham",
                email: "f.mitcham@kpmg.com.au",
                access: "3",
            },
            {
                state: "danger",
                name: "Olivia Wild",
                email: "olivia@corpmail.com",
                access: "2",
            },
            {
                state: "info",
                name: "Neil Owen",
                email: "owen.neil@gmail.com",
                access: "1",
            },
            {
                avatar: getAssetPath("media/avatars/300-23.jpg"),
                name: "Dan Wilson",
                email: "dam@consilting.com",
                access: "3",
            },
            {
                state: "danger",
                name: "Emma Bold",
                email: "emma@intenso.com",
                access: "2",
            },
            {
                avatar: getAssetPath("media/avatars/300-12.jpg"),
                name: "Ana Crown",
                email: "ana.cf@limtel.com",
                access: "1",
            },
            {
                state: "primary",
                name: "Robert Doe",
                email: "robert@benko.com",
                access: "3",
            },
            {
                avatar: getAssetPath("media/avatars/300-13.jpg"),
                name: "John Miller",
                email: "miller@mapple.com",
                access: "3",
            },
            {
                state: "success",
                name: "Lucy Kunic",
                email: "lucy.m@fentech.com",
                access: "2",
            },
            {
                state: getAssetPath("media/avatars/300-21.jpg"),
                name: "Ethan Wilder",
                email: "ethan@loop.com.au",
                access: "1",
            },
            {
                state: getAssetPath("media/avatars/300-12.jpg"),
                name: "Ana Crown",
                email: "ana.cf@limtel.com",
                access: "3",
            },
        ];

        return {
            users,
            getAssetPath,
        };
    },
    computed: {
        quotes_list() {
            return this.quotes
        }
    }
});
</script>
