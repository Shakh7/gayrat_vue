<template>
  <!--begin::Pricing-->
    <div class="card card-flush pt-3 mb-5 mb-lg-10">
        <!--begin::Card header-->
        <div class="card-header">
            <!--begin::Card title-->
            <div class="card-title">
                <h2 class="fw-bold">Connected Clients</h2>
            </div>
            <!--begin::Card title-->

            <!--begin::Card toolbar-->
            <div class="card-toolbar">
                <button
                        type="button"
                        class="btn btn-light-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_add_product"
                >
                    Add Client
                </button>
            </div>
            <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0">
            <!--begin::Table wrapper-->
            <div class="table-responsive">
                <!--begin::Table-->
                <table
                        class="table align-middle table-row-dashed fs-6 fw-semobold gy-4"
                        id="kt_subscription_products_table"
                >
                    <!--begin::Table head-->
                    <thead>
                    <tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th class="min-w-300px">Client</th>
                        <th class="min-w-100px">Rate</th>
                        <th class="min-w-150px">Date</th>
                        <th class="min-w-70px text-end">Remove</th>
                    </tr>
                    </thead>
                    <!--end::Table head-->

                    <!--begin::Table body-->
                    <tbody class="text-gray-600">
                    <tr>
                        <td>
                            <div class="d-flex justify-content-start flex-column">
                                <a
                                        href="#"
                                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                                >John Smith</a
                                >
                                <span
                                        class="text-muted fw-semobold text-muted d-block fs-7"
                                >JohnSmith@gmail.com</span
                                >
                            </div>
                        </td>
                        <td>$2.99</td>
                        <td>27 March, 2023</td>
                        <td class="text-end">
                            <!--begin::Delete-->
                            <a
                                    href="#"
                                    class="btn btn-icon btn-flex btn-active-light-primary w-30px h-30px me-3"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-kt-action="product_remove"
                                    data-bs-original-title="Delete"
                            >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg
                            :src="
                        getAssetPath('media/icons/duotune/general/gen027.svg')
                      "
                    />
                  </span>
                            </a>
                            <!--end::Delete-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--end::Table-->
            </div>
            <!--end::Table wrapper-->
        </div>
        <!--end::Card body-->
    </div>
  <!--end::Pricing-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";

export default defineComponent({
    name: "kt-products",
    props: {
        quote: {
            type: Object,
            required: true,
        },
    },
    setup() {
        return {
            getAssetPath,
        };
    },
});
</script>
