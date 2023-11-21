<template>
  <Table v-bind="table"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Table from "@/components/table/Table.vue";
import type {DataTableItem} from "@/components/table/types";


export default defineComponent({
  name: "kt-c",
  components: {Table},
  data() {
    return {
      table: {
        title: "Quotes",
        data: [
          {
            id: 1,
            name: "Dakota Rice",
            email: "dakota@gmail.com",
          },
          {
            id: 2,
            name: "Dakota Rice",
            email: "dakota@gmail.com",
          },
          {
            id: 3,
            name: "Dakota Rice",
            email: "dakota@gmail.com",
            // _row: {
            //   classes: 'bg-danger',
            // }
          },
          {
            id: 4,
            name: "Dakota Rice",
            email: "dakota@gmail.com"
          },
          {
            id: 5,
            name: "Dakota Rice",
            email: "dakota@gmail.com"
          }
        ] as DataTableItem[],
        show_label_underneath_data: true,
        table_striped: false,
        table_hover: true,
      }
    }
  },
})

</script>

