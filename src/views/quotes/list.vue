<template>
  <Table v-bind="table">
    <template v-slot:created_at_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ formatDate(getData(data).created_at) }}
      </a>
    </template>
    <template v-slot:shipper_value="{row: data}">
      <a class="text-overflow text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).shipper.email }}
      </a>
    </template>
    <template v-slot:shipper_label>
      <span class="text-muted fw-semibold text-muted d-flex gap-1 fs-7">
        Shipper
        <VMenu>
          <i class="bi bi-eye"></i>

          <template #popper>
            <div class="card shadow-0 p-0">
                <div class="card-body d-flex align-items p-3">
                   <!--begin::Avatar-->
                <div class="symbol symbol-50px me-5">
                    <img alt="Logo" :src="getAssetPath('media/avatars/300-1.jpg')"/>
                </div>
                  <!--end::Avatar-->

                  <!--begin::Username-->
                <div class="d-flex flex-column">
                    <div class="fw-bold d-flex align-items-center fs-5">
                        Max Smith
                        <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
                        >Pro</span
                        >
                    </div>
                    <a href="#" class="fw-semobold text-muted text-hover-primary fs-7"
                    >max@kt.com</a
                    >
                </div>
                  <!--end::Username-->
                </div>
            </div>
          </template>
        </VMenu>
      </span>
    </template>
    <template v-slot:pick_up_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).pick_up.summary }}
      </a>
    </template>
    <template v-slot:vehicle_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).vehicle.summary }}
      </a>
    </template>
    <template v-slot:departure_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        <i class="ki-duotone ki-geolocation ">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        {{ getData(data).departure.summary }}
      </a>
    </template>
    <template v-slot:destination_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).destination.summary }}
      </a>
    </template>
    <template v-slot:transport_type_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).transport_type }}
      </a>
    </template>
    <template v-slot:is_operable_value="{row: data}">
      <i class="fa-solid fa-square-check text-primary fs-3 align-middle me-2"
         :class="{
        'fa-square-check text-primary': getData(data).vehicle.is_operable,
        'fa-square-xmark text-danger': !getData(data).vehicle.is_operable
         }"
      ></i>
      <span class="badge mb-1"
            :class="{
        'badge-light-primary' : getData(data).vehicle.is_operable,
        'badge-light-danger' : !getData(data).vehicle.is_operable
            }"
      >{{ getData(data).vehicle.is_operable ? 'Yes' : 'No' }}</span>
    </template>
  </Table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Table from "@/components/table/Table.vue";
import type {Header} from "@/components/table/types";
import type {Quote} from "@/types";
import moment from "moment";
import {getAssetPath} from "@/core/helpers/assets";


export default defineComponent({
  name: "kt-c",
  components: {Table},
  data() {
    return {
      getAssetPath,
      table: {
        title: "Quotes",
        api_url: "quotes/list",
        show_label_underneath_data: true,
        table_striped: false,
        table_hover: true,
        headers: [
          {
            label: "Created At",
            field: "created_at",
            style: {
              minWidth: '180px',
              maxWidth: '220px',
            }
          },
          {
            label: "Shipper",
            field: "shipper",
            style: {
              maxWidth: '220px',
            }
          },
          {
            label: "Pick Up",
            field: "pick_up",
            style: {
              minWidth: '160px',
              maxWidth: '200px',
            }
          },
          {
            label: "Vehicle",
            field: "vehicle",
            style: {
              minWidth: '200px',
              maxWidth: '270px',
            }
          },
          {
            label: "Departure",
            field: "departure",
            style: {
              minWidth: '230px',
              maxWidth: '270px',
            }
          },
          {
            label: "Destination",
            field: "destination",
            style: {
              minWidth: '230px',
              maxWidth: '270px',
            }
          },
          {
            label: "Transport Type",
            field: "transport_type",
            search_type: 'select',
            options: [
              {label: 'Open', value: "open"},
              {label: 'Enclosed', value: "enclosed"},
            ],
            style: {
              minWidth: '160px',
              maxWidth: '200px',
            }
          },
          {
            label: "Times Shared",
            field: "lead_conversion_count",
            style: {
              minWidth: '160px',
              maxWidth: '180px',
            }
          },
          {
            label: "Is Operable",
            field: "is_operable",
            search_type: 'select',
            options: [
              {label: 'Yes', value: "true"},
              {label: 'No', value: "false"},
            ],
            style: {
              minWidth: '160px',
              maxWidth: '180px',
            }
          },
        ] as Header[]
      }
    }
  },
  methods: {
    getData(data: any) {
      return data as Quote ? data : {} as Quote;
    },
    formatDate(date: string) {
      return moment(date).format('lll');
    }
  }
})

</script>

