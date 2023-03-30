<template>
  <div>
    <table class="table table-row-dashed table-row-gray-300 gy-7">
      <thead>
      <tr class="fw-bolder fs-5 text-gray-400">
        <th class="py-4" v-for="h in header" :key="h.columnLabel">{{ h.columnName }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="r in data" :key="r">
        <td v-for="h in header" :key="h.columnLabel">
          <slot :name="h.columnLabel" :row="r">
            {{ r[h.columnLabel] }}
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "STable",
  props: {
    header: {type: Array, required: true},
    data: {type: Array, required: true},
  }
})
</script>

<style scoped>

</style>