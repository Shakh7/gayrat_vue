<template>
  <!--begin::Modal - View Users-->
  <div
      class="modal fade"
      id="modal_select_pick_up_date"
      tabindex="-1"
      aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg
                  :src="getAssetPath('media/icons/duotune/arrows/arr061.svg')"
              />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 pt-0 pb-15">
          <!--begin::Heading-->
          <div class=" mb-13">
            <!--begin::Title-->
            <h1 class="mb-3">Browse Users</h1>
            <!--end::Title-->

            <!--begin::Description-->
            <div class="text-gray-400 fw-semobold fs-5">
              If you need more info, please check out our
              <a href="#" class="link-primary fw-bold">Users Directory</a>.
            </div>
            <!--end::Description-->
          </div>
          <!--end::Heading-->

          <!--begin::Users-->
          <div>
            <!--begin::List-->
            <div class="mh-375px scroll-y">
              <div class="d-flex align-items-center rounded p-5 bg-light-danger"
              >
                <!--begin::Icon-->
                <span :class="`svg-icon-danger`" class="svg-icon me-5">
                    <span class="svg-icon svg-icon-1">
                      <inline-svg
                          :src="getAssetPath('media/icons/duotune/abstract/abs027.svg')"
                      />
                    </span>
                </span>
                <!--end::Icon-->

                <!--begin::Title-->
                <div class="flex-grow-1 me-2">
                  <a href="#" class="fw-bold text-gray-800 text-hover-primary fs-6">
                    Hello
                  </a>

                  <span class="text-muted fw-semobold d-block">Hello</span>
                </div>
                <!--end::Title-->

                <!--begin::Lable-->
                <span class="text-danger fw-bold py-1">66</span>
                <!--end::Lable-->
              </div>

            </div>
            <!--end::List-->
          </div>
          <!--end::Users-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - View Users-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";

export default defineComponent({
  name: "view-users-modal",
  components: {},
  setup() {
    const users = [
      {
        avatar: getAssetPath("media/avatars/300-6.jpg"),
        name: "Emma Smith",
        email: "e.smith@kpmg.com.au",
        position: "Art Director",
        sales: "23,000",
      },
      {
        state: "danger",
        name: "Melody Macy",
        email: "melody@altbox.com",
        position: "Marketing Analytic",
        sales: "50,500",
      },
      {
        avatar: getAssetPath("media/avatars/300-1.jpg"),
        name: "Max Smith",
        email: "max@kt.com",
        position: "Software Enginer",
        sales: "75,900",
      },
      {
        avatar: getAssetPath("media/avatars/300-1.jpg"),
        name: "Sean Bean",
        email: "sean@dellito.com",
        position: "Web Developer",
        sales: "10,500",
      },
      {
        avatar: getAssetPath("media/avatars/300-25.jpg"),
        name: "Brian Cox",
        email: "brian@exchange.com",
        position: "UI/UX Designer",
        sales: "20,000",
      },
      {
        state: "warning",
        name: "Mikaela Collins",
        email: "mikaela@pexcom.com",
        position: "Head Of Marketing",
        sales: "9,300",
      },
      {
        avatar: getAssetPath("media/avatars/300-9.jpg"),
        name: "Francis Mitcham",
        email: "f.mitcham@kpmg.com.au",
        position: "Software Arcitect",
        sales: "15,000",
      },
      {
        state: "danger",
        name: "Olivia Wild",
        email: "olivia@corpmail.com",
        position: "System Admin",
        sales: "23,000",
      },
      {
        state: "info",
        name: "Neil Owen",
        email: "owen.neil@gmail.com",
        position: "Account Manager",
        sales: "45,000",
      },
      {
        avatar: getAssetPath("media/avatars/300-23.jpg"),
        name: "Dan Wilson",
        email: "dam@consilting.com",
        position: "Web Desinger",
        sales: "90,500",
      },
      {
        state: "danger",
        name: "Emma Bold",
        email: "emma@intenso.com",
        position: "Corporate Finance",
        sales: "5,000",
      },
      {
        avatar: getAssetPath("media/avatars/300-12.jpg"),
        name: "Ana Crown",
        email: "ana.cf@limtel.com",
        position: "Customer Relationship",
        sales: "70,000",
      },
      {
        state: "primary",
        name: "Robert Doe",
        email: "robert@benko.com",
        position: "Marketing Executive",
        sales: "45,500",
      },
    ];

    return {
      users,
      getAssetPath,
    };
  },
});
</script>
