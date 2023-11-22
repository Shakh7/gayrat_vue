<template>
  <Table v-bind="table">
    <template v-slot:departure_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 ps-3">
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
    <template v-slot:vehicle_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).vehicle.summary }}
      </a>
    </template>
    <template v-slot:pick_up_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).pick_up.summary }}
      </a>
    </template>
    <template v-slot:shipper_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ getData(data).shipper.email }}
      </a>
    </template>
    <template v-slot:created_at_value="{row: data}">
      <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
        {{ formatDate(getData(data).created_at) }}
      </a>
    </template>
  </Table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Table from "@/components/table/Table.vue";
import type {Quote} from "@/types";
import moment from "moment";


export default defineComponent({
  name: "kt-c",
  components: {Table},
  data() {
    return {
      table: {
        title: "Quotes",
        api_url: "quotes/list/",
        show_label_underneath_data: true,
        table_striped: false,
        table_hover: true,
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

