<template>
  <Table v-bind="table">

  </Table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Table from "@/components/table/Table.vue";


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
})

</script>

