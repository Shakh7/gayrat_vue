<template>
  <!--begin::Tables Widget 12-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Quotes List</span>

        <span class="text-muted mt-1 fw-semobold fs-7"
        >Over 500 new quotes</span
        >
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg
                :src="getAssetPath('media/icons/duotune/general/gen024.svg')"
            />
          </span>
        </button>
        <Dropdown2></Dropdown2>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3 px-6">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
          <tr class="fw-bold text-muted bg-light">
            <th style="max-width: 50px" class="ps-4 rounded-start">
              <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox">
                </div>
            </th>
            <th>Customer</th>
            <th>Car</th>
            <th>Pick Up Address</th>
            <th>Drop Off Address</th>
            <th>PIck Up Date</th>
            <th>CLients</th>
            <th>Actions</th>
          </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
          <template v-for="(item, index) in list" :key="index">
            <tr>
              <td class="ps-4">
                <div class="form-check form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox">
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-start flex-column">
                  <a
                      href="#"
                      class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                  >{{ item.customer.first_name + ' ' + item.customer.last_name }}</a
                  >
                  <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                  >{{ item.customer.email }}</span
                  >
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-start flex-column">
                  <a
                      href="#"
                      class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                  >{{ item.car_make }}</a
                  >
                  <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                  >{{ item.car_model }}</span
                  >
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-start flex-column">
                  <a
                      href="#"
                      class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                  >{{ item.pick_up_address.city_name + ', ' + item.pick_up_address.state_code }}</a
                  >
                  <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                  >{{ item.pick_up_address.state_name + ', ' + item.pick_up_address.zip_code }}</span
                  >
                </div>
              </td>
              <td>
                <div class="d-flex justify-content-start flex-column">
                  <a
                      href="#"
                      class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                  >{{ item.drop_off_address.city_name + ', ' + item.drop_off_address.state_code }}</a
                  >
                  <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                  >{{ item.drop_off_address.state_name + ', ' + item.drop_off_address.zip_code }}</span
                  >
                </div>
              </td>
              <td>
                {{ item.pick_up_date }}
              </td>
              <td class="text-center">
                <el-popover v-if="item.clients.length > 0" placement="left" :width="400" trigger="hover">
                  <template #reference>
                    <span>Clients <span class="badge badge-circle badge-info ms-1">{{
                        item.clients.length
                      }}</span></span>
                  </template>
                  <el-table :data="item.clients" class="mb-8">
                    <el-table-column property="full_name" label="Full Name"/>
                    <el-table-column property="email" label="Email"/>
                    <el-table-column label="Actions" class-name="text-center">
                      <span class="fw-medium text-danger cursor-pointer">Remove</span>
                    </el-table-column>
                  </el-table>
                  <button class="btn btn-sm btn-success w-100">Add Client</button>
                </el-popover>
                <span v-else>---</span>
              </td>
              <td>
                <button class="btn btn-sm btn-danger p-1 px-3">Delete</button>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import axios from "axios";

export default defineComponent({
  name: "kt-c",
  components: {
    Dropdown2,
  },
  data() {
    return {
      list: [],
      getAssetPath,
    };
  },
  methods: {
    async getQuotes() {
      let response = await axios.get("http://127.0.0.1:8000/api/leads");
      if (response.status === 200) {
        this.list = response.data;
      }
    }
  },
  mounted() {
    this.getQuotes()
  }
});
</script>
