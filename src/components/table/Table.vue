<template>
  <div class="mb-5 mb-xl-8 card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
            {{ title }}
        </span>
        <span class="text-muted mt-1 fw-semibold fs-7">
          Over 500 new members
        </span>
      </h3>
      <div class="card-toolbar">
        <button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end"><i
            class="ki-duotone ki-category fs-2"><span class="path1"></span><span class="path2"></span><span
            class="path3"></span><span class="path4"></span></i></button>
        <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px"
            data-kt-menu="true">
          <div class="menu-item px-3">
            <div class="menu-content fs-6 text-gray-900 fw-bold px-3 py-4"> Quick Actions</div>
          </div>
          <div class="separator mb-3 opacity-75"></div>
          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Ticket </a></div>
          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Customer </a></div>
          <div class="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start"
               data-kt-menu-flip="left-start, top"><a href="#" class="menu-link px-3"><span
              class="menu-title">New Group</span><span class="menu-arrow"></span></a>
            <div class="menu-sub menu-sub-dropdown w-175px py-4">
              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Admin Group </a></div>
              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Staff Group </a></div>
              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Member Group </a></div>
            </div>
          </div>
          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Contact </a></div>
          <div class="separator mt-3 opacity-75"></div>
          <div class="menu-item px-3">
            <div class="menu-content px-3 py-3"><a class="btn btn-primary btn-sm px-4" href="#"> Generate Reports </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body py-3">
      <div class="table-responsive">

        <table class="table align-middle table-row-bordered gs-0 gy-4"
               :class="{
          'table-striped': table_striped,
          'table-hover': table_hover,
               }"
        >
          <thead>
          <tr class="fw-bold text-muted bg-light">

            <template v-for="(header, index) in computed_headers" :key="`header_${index}_${header.field}`">
              <th class="py-1" :class="{
                'rounded-start': index === 0,
                'rounded-end': index + 1 === computed_headers.length,
              }">
                <input type="text" class="form-control border-0 bg-transparent"
                       :placeholder="header.field"/>
              </th>
            </template>

          </tr>
          </thead>
          <tbody>
          <template>

          </template>
          <tr v-for="(row, index) in data"
              :key="`row_${index}`"
              :class="row?._row?.classes || ''"
          >
            <template
                v-for="(header, index) in computed_headers"
                :key="`header_value_${index}_${header.field}`"
            >
              <td v-html="getCellValue(row, header, index)"/>
            </template>
          </tr>
          </tbody>
        </table>

        <ul class="pagination pagination-circle pagination-outline">
          <li class="page-item first disabled m-1">
            <a href="#" class="page-link px-0">
              <i class="ki-duotone ki-double-left fs-2"><span class="path1"></span><span class="path2"></span></i>
            </a>
          </li>
          <li class="page-item previous disabled m-1">
            <a href="#" class="page-link px-0">
              <i class="ki-duotone ki-left fs-2"></i>
            </a>
          </li>
          <li class="page-item m-1"><a href="#" class="page-link">1</a></li>
          <li class="page-item active m-1"><a href="#" class="page-link">2</a></li>
          <li class="page-item m-1"><a href="#" class="page-link">3</a></li>
          <li class="page-item m-1"><a href="#" class="page-link">4</a></li>
          <li class="page-item m-1"><a href="#" class="page-link">5</a></li>
          <li class="page-item m-1"><a href="#" class="page-link">6</a></li>
          <li class="page-item next m-1">
            <a href="#" class="page-link px-0">
              <i class="ki-duotone ki-right fs-2"></i>
            </a>
          </li>
          <li class="page-item last m-1">
            <a href="#" class="page-link px-0">
              <i class="ki-duotone ki-double-right fs-2"><span class="path1"></span><span class="path2"></span></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";

type Header = {
  field: string,
  label: string,
}

type DataTableItem = Record<string, any> & {
  _table?: {
    active: boolean,
  }
};


export default defineComponent({
  name: "kt-c",
  props: {
    title: {
      type: String,
      default: "Table",
    },
    headers: {
      type: Array,
      required: false,
      default: () => [],
    },
    data: {
      type: Array as PropType<DataTableItem[]>,
      required: true,
      default: () => [],
    },
    show_label_underneath_data: {
      type: Boolean,
      required: false,
      default: false,
    },
    table_striped: {
      type: Boolean,
      required: false,
      default: false,
    },
    table_hover: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    computed_headers() {
      return (this.headers && this.headers.length ? this.headers : Object.keys(this.data[0])).map((item) => {
        return {label: item, field: item}
      }) as Header[]
    }
  },
  data() {

  },
  methods: {
    getCellValue(row: Record<string, any>, header: Header, index: number) {
      if (this.show_label_underneath_data) {
        return `
                <a
                class="text-gray-900 fw-bold text-hover-primary d-block ${index === 0 ? 'ps-3' : ''} mb-1 fs-6">
                ${row[header.field] || ""}
                </a>
                <span class="text-muted fw-semibold text-muted d-block ${index === 0 ? 'ps-3' : ''} fs-7">
                ${header.label}
</span>
        `
      } else {
        return `<span class="${index === 0 ? 'ps-3' : ''}">
                ${row[header.field] || ""}
                </span>
        `;
      }
    },
  },
})

</script>

