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
          <tr class="fw-bold text-muted bg-light border-0">

            <template v-for="(header, index) in computed_headers" :key="`header_${index}_${header.field}`">
              <th class="py-1" :class="{
                'rounded-start': index === 0,
                'rounded-end': index + 1 === computed_headers.length,
              }">
                <input type="text" class="form-control border-0 bg-transparent"
                       :placeholder="formatSnakeCaseToReadable(header.label)"/>
              </th>
            </template>

          </tr>
          </thead>
          <tbody v-if="!is_fetching_data">
          <tr v-for="(row, index) in computed_data"
              :key="`row_${index}`"
              :class="row?._row?.classes || ':'"
          >
            <template
                v-for="(header, index) in computed_headers"
                :key="`header_value_${index}_${header.field}`"
            >
              <td>
                <slot :field="`${header.field}_body`"
                      v-html="getCellValue(row, header, index)"
                      :row="row">
                </slot>
              </td>
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
import axios from "axios";
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
    api_url: {
      type: String,
      required: false,
      default: "",
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
  data() {
    return {
      api_data: [],
      is_fetching_data: false,
    }
  },
  computed: {
    computed_data() {
      if (this.api_url && this.api_url.length > 0) {
        return this.api_data
      } else {
        return this.data as DataTableItem[]
      }
    },
    computed_headers() {
      if (this.is_fetching_data) return [];

      if (this.headers && this.headers.length) {
        return this.headers.map((item) => {
          return {label: item, field: item}
        }) as Header[]
      } else {
        let sampleData = this.api_url ? this.api_data : this.data;
        if (sampleData.length > 0) {
          return Object.keys(sampleData[0]).map((item) => {
            return {label: item, field: item}
          }) as Header[]
        } else {
          return []
        }
      }
    },
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
                ${this.formatSnakeCaseToReadable(header.label)}
</span>
        `
      } else {
        return `<span class="${index === 0 ? 'ps-3' : ''}">
                ${row[header.field] || ""}
                </span>
        `;
      }
    },
    formatSnakeCaseToReadable(str: string) {
      return str ? str
          .split('_')
          .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
          .join(' ') : ''
    },
    async getDataFromApi(retry_after_fail = true) {
      if (!this.api_url) return;
      this.is_fetching_data = true;
      try {
        let response = await axios.get(this.api_url);
        this.api_data = response.data.results || [];
      } catch {
        if (retry_after_fail) {
          setTimeout(() => {
            this.getDataFromApi(false);
          }, 2000)
        } else {
          this.api_data = [];
        }
      }
      this.is_fetching_data = false;
    }
  },
  mounted() {
    this.getDataFromApi();
  }
})

</script>

