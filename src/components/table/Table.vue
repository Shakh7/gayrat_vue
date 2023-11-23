<template>

  <div class="mb-5 mb-xl-8 card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{ translate(title) }}
        </span>
        <span class="text-muted mt-1 fw-semibold fs-7">
          Showing {{ (active_page - 1) * per_page + 1 }} to
          {{
            per_page * active_page > data_count
                ? data_count
                : per_page * active_page
          }}
          of {{ data_count }} entries
        </span>
      </h3>
      <!--      <div class="card-toolbar">-->
      <!--        <button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"-->
      <!--                data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end"><i-->
      <!--            class="ki-duotone ki-category fs-2"><span class="path1"></span><span class="path2"></span><span-->
      <!--            class="path3"></span><span class="path4"></span></i></button>-->
      <!--        <div-->
      <!--            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px"-->
      <!--            data-kt-menu="true">-->
      <!--          <div class="menu-item px-3">-->
      <!--            <div class="menu-content fs-6 text-gray-900 fw-bold px-3 py-4"> Quick Actions</div>-->
      <!--          </div>-->
      <!--          <div class="separator mb-3 opacity-75"></div>-->
      <!--          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Ticket </a></div>-->
      <!--          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Customer </a></div>-->
      <!--          <div class="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start"-->
      <!--               data-kt-menu-flip="left-start, top"><a href="#" class="menu-link px-3"><span-->
      <!--              class="menu-title">New Group</span><span class="menu-arrow"></span></a>-->
      <!--            <div class="menu-sub menu-sub-dropdown w-175px py-4">-->
      <!--              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Admin Group </a></div>-->
      <!--              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Staff Group </a></div>-->
      <!--              <div class="menu-item px-3"><a href="#" class="menu-link px-3"> Member Group </a></div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="menu-item px-3"><a href="#" class="menu-link px-3"> New Contact </a></div>-->
      <!--          <div class="separator mt-3 opacity-75"></div>-->
      <!--          <div class="menu-item px-3">-->
      <!--            <div class="menu-content px-3 py-3"><a class="btn btn-primary btn-sm px-4" href="#"> Generate Reports </a>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="card-body py-3">
      <div class="table-responsive">

        <table class="table align-middle gs-0 gy-4"
               :class="{
          'table-striped': table_striped,
          'table-hover': table_hover,
               }"
        >

          <thead>

          <tr class="fw-bold text-muted bg-light align-middle">
            <template v-for="(header, index) in computed_headers" :key="`header_${index}_search_${header.field}`">
              <th class="p-3"
                  :class="{
                      'rounded-start': index === 0,
                      'rounded-end': index + 1 === computed_headers.length,
                  }"
                  :style="{ width: header?.style?.width || 'auto', maxWidth: header?.style?.maxWidth || 'auto', minWidth: header?.style?.minWidth || 'auto' }"
              >
                <span class="d-flex gap-1 ">
                  {{ translate(header.label) }}
                  <span v-if="header.description">
                    <VTooltip>
                    <a>
                      <i class="ki-duotone ki-information-2 align-middle">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </a>

                    <template #popper>
                      <p class="mb-0" v-html="header.description"></p>
                    </template>
                  </VTooltip>
                  </span>
                </span>
              </th>
            </template>
          </tr>
          <tr class="fw-bold align-middle">
            <template v-for="(header, index) in computed_headers" :key="`header_${index}_search_${header.field}`">
              <th class="p-3"
                  :class="{
                      'ps-0': index === 0,
                      'pe-0': index + 1 === computed_headers.length,
                  }"
                  :style="{ width: header?.style?.width || 'auto', maxWidth: header?.style?.maxWidth || 'auto', minWidth: header?.style?.minWidth || 'auto' }"
              >
                <select
                    v-model="header.query"
                    v-if="header.search_type === 'select'"
                    class="form-select form-select-sm"
                    aria-label="Select example"
                    @change="searchChange(header)"
                    :disabled="header.searchable === false"
                    :class="{
                      'bg-light border-0': header.searchable === false,
                    }"
                    :style="{cursor: header.searchable === false ? 'not-allowed': 'auto'}"
                >
                  <option value="">
                    {{ translate('all') }} {{ translate(header.label) }}
                  </option>
                  <option v-for="(item, index) in header.options" :key="`option_${index}_${item.value}`"
                          :value="item.value">
                    {{ translate(item.label) }}
                  </option>
                </select>
                <input v-else-if="header.search_type === 'date'" type="date"
                       class="form-control form-control-sm ps-3 bg-light border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0"
                       :readonly="header.searchable === false"
                       :style="{cursor: header.searchable === false ? 'not-allowed': 'auto'}"
                       :class="{
                      'bg-light border-0': header.searchable === false,
                    }"
                />
                <input v-else type="text"
                       v-model="header.query"
                       class="form-control form-control-sm ps-3"
                       :placeholder="`Search ${translate(header.label)}`"
                       @input="searchChange(header)"
                       :readonly="header.searchable === false"
                       :class="{
                      'bg-light border-0': header.searchable === false,
                    }"
                       :style="{cursor: header.searchable === false ? 'not-allowed': 'auto'}"
                />
              </th>
            </template>
          </tr>

          </thead>
          <tbody :class="{'overlay overlay-block': is_fetching_data}">
          <template v-if="computed_data.length > 0">
            <tr v-for="(row, index) in computed_data"
                :key="`row_${index}`"
                :class="row?._row?.classes || ':'"
            >
              <template
                  v-for="(header, index) in computed_headers"
                  :key="`header_value_${index}_${header.field}`"
              >
                <td :style="{ width: header?.style?.width || 'auto', maxWidth: header?.style?.maxWidth || 'auto', minWidth: header?.style?.minWidth || 'auto' }"
                >
                  <div :class="[index === 0 ? 'ps-3' : '']" >
                    <slot :name="`${header.field}_body`"
                          :row="row">
                      <template v-if="show_label_underneath_data">
                        <slot :name="`${header.field}_value`" :row="row">
                          <a class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ row[header.field] || "-" }}
                          </a>
                        </slot>
                        <slot :name="`${header.field}_label`" :row="row">
                        <span class="text-muted fw-semibold text-muted d-block fs-7">
                          {{ translate(header.label) }}
                        </span>
                        </slot>
                      </template>
                      <template v-else>
                     <span>
                       <slot :name="`${header.field}_value`" :row="row">
                          {{ row[header.field] || "-" }}
                       </slot>
                     </span>
                      </template>
                    </slot>
                  </div>
                </td>
              </template>
            </tr>
          </template>
          <tr v-else-if="computed_data.length === 0 && !is_fetching_data">
            <td :colspan="computed_headers.length" class="py-0">
              <!--begin::Alert-->
              <div
                  class="alert bg-light-success d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-0">


                <!--begin::Icon-->
                <i class="ki-duotone ki-information-5 fs-5tx text-success mb-5">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                <!--end::Icon-->

                <!--begin::Wrapper-->
                <div class="text-center">
                  <!--begin::Title-->
                  <h1 class="fw-bold mb-5">
                    {{ translate('no_data_found') }}
                  </h1>
                  <!--end::Title-->

                  <!--begin::Separator-->
                  <div class="separator separator-dashed border-success opacity-25 mb-5"></div>
                  <!--end::Separator-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Alert-->
            </td>
          </tr>
          <tr v-if="is_fetching_data">
            <td>
              <div class="overlay-layer card-rounded bg-dark bg-opacity-5 py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
          </tbody>

        </table>

        <div class="d-flex justify-content-between align-items-center py-3">
          <div>
            <select v-model="per_page" class="form-select" aria-label="Select example">
              <option v-for="i in per_page_options" :key="`per_page_${i}`" :value="i">
                {{ i }}
              </option>
            </select>
          </div>
          <ul class="pagination">
            <li class="page-item previous"
                @click="goPrevPage()"
                :class="{'disabled': active_page <= 1}"
                :style="{ cursor: active_page <= 1 ? 'not-allowed': 'auto' }"
            >
              <a class="page-link"><i class="previous"></i></a>
            </li>
            <li class="page-item cursor-pointer"
                v-for="page in pagination_items"
                :key="`pagination_page_${page}`"
                :class="{'active': page === active_page }"
                @click="goPage(page)"
            >
              <a class="page-link">{{ page }}</a>
            </li>
            <li class="page-item next"
                @click="goNextPage()"
                :class="{'disabled': active_page >=  pagination_items}"
                :style="{ cursor: active_page >=  pagination_items ? 'not-allowed': 'auto' }"
            >
              <a class="page-link"><i class="next"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent, type PropType} from "vue";
import type {Header} from "@/components/table/types";

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
      required: false,
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
    per_page_options: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => [10, 20, 50, 100],
    }
  },
  data() {
    return {
      api_data: [],
      is_fetching_data: false,
      debounceTimeout: 500,
      active_page: 1,
      data_count: 0,
      per_page: this.per_page_options[0] || 10,
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
      // if (this.is_fetching_data) return [];

      if (this.headers && this.headers.length) {
        return this.headers.map((item: any) => {
          return {
            ...item,
            query: item.searchable !== false ? this.$route.query[item.field] || "" : '',
          }
        }) as Header[]
      } else {
        let sampleData = this.api_url ? this.api_data : this.data;
        if (sampleData.length > 0) {
          return Object.keys(sampleData[0]).map((item) => {
            return {label: item, field: item}
          }) as Header[]
        } else {
          return [] as Header[]
        }
      }
    },
    pagination_items() {
      return Math.ceil(this.data_count / this.per_page)
    },
    per_page_and_active_page_change() {
      return this.per_page + this.active_page
    }
  },
  methods: {
    async getDataFromApi(retry_after_fail = true) {
      if (!this.api_url) return;
      this.is_fetching_data = true;
      try {
        let response = await axios.get(
            this.api_url,
            {
              params: {
                offset: (this.active_page - 1) * this.per_page,
                limit: this.per_page,
                ...this.$route.query,
              }
            }
        );
        this.api_data = response.data.results || [];
        this.data_count = response.data.count || 0;
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
    },
    translate(str: string) {
      return str
    },
    searchChange(header: Header) {
      if (header.searchable === false) return;
      let query = header.query;
      if (query && query.length > 0) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [header.field]: query,
          }
        })
      } else {
        let newQuery = {...this.$route.query};
        delete newQuery[header.field];
        this.$router.push({
          query: newQuery
        })
      }
    },

    goNextPage() {
      if (this.active_page >= this.pagination_items) return;
      this.active_page += 1;
      this.getDataFromApi();
    },
    goPrevPage() {
      if (this.active_page <= 1) return;
      this.active_page -= 1;
      this.getDataFromApi();
    },
    goPage(page: number) {
      this.active_page = page || 1;
      this.getDataFromApi();
    }
  },
  watch: {
    "$route.query"() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        this.active_page = 1;
        this.getDataFromApi();
      }, 300);
    },
    per_page() {
      this.active_page = 1;
      this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
  }
})

</script>
