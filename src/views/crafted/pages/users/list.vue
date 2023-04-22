<template>
    <div class="card">

        <div class="card-header py-5 align-items-center">

            <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg
                    :src="getAssetPath('media/icons/duotune/general/gen021.svg')"
            />
          </span>
                <input
                        type="text"
                        class="form-control form-control-solid w-250px ps-15"
                        placeholder="Search Users"
                />
            </div>

            <button
                    type="button"
                    class="btn btn-primary btn-sm py"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_add_customer"
            >
            <span class="svg-icon svg-icon-2">
              <inline-svg
                      :src="getAssetPath('media/icons/duotune/arrows/arr075.svg')"
              />
            </span>
                Add User
            </button>

        </div>

        <div class="card-body pt-0">
            <Datatable :header="tableHeader" :data="tableData">
                <template v-slot:full_name="{ row: data }">
                    <span class="text-dark">{{ data.full_name }}</span>
                </template>
                <template v-slot:email="{ row: data }">
                    <span class="text-dark">{{ data.email }}</span>
                </template>
                <template v-slot:date_joined="{ row: data }">
                    <div class="text-start">
                        <span>{{ data.date_joined }}</span>
                    </div>
                </template>
            </Datatable>
        </div>
    </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from "axios";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
    name: "customers-listing",
    components: {
        Datatable,
    },
    data() {
        const tableHeader = [
            {
                columnName: "Full Name",
                columnLabel: "full_name",
            },
            {
                columnName: "Email",
                columnLabel: "email",
            },
            {
                columnName: "Date Joined",
                columnLabel: "date_joined",
            },
        ];
        const tableData = [];

        return {
            tableHeader,
            tableData,
            getAssetPath
        }
    },
    methods: {
        async getUsers() {
            let response = await ApiService.get('/users')
            if (response.status === 200) {
                this.tableData = response.data.map((item: any) => {
                    return {
                        full_name: item.full_name,
                        email: item.email,
                        date_joined: item.date_joined,
                        id: item.id
                    }
                })
            }
        }
    },
    mounted() {
        this.getUsers()
    }
});
</script>
