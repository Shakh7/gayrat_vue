<template>
  <div id="kt_header" class="header align-items-stretch">
    <div class="header-brand">
      <router-link to="/dashboard">
        <img
            alt="Logo"
            src="https://consent.trustarc.com/v2/asset/20:55:23.714y33gof_DO_Logo-Blue.png"
            class="h-25px h-lg-40px"
        />
      </router-link>
      <div class="d-lg-none pe-4">
        <i class="fa-solid fa-bars cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
           aria-controls="offcanvasRight" style="font-size: 16px"></i>
      </div>
    </div>

    <div
        class="d-none d-lg-flex toolbar d-flex justify-content-end"
        :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <div
          class="container-fluid py-6 py-lg-0 align-items-center d-flex flex-column justify-content-end"
          id="kt_toolbar_container"
      >
        <ul class="list-unstyled d-flex justify-content-around align-self-end w-75 my-0 align-items-center">
          <li class="h5 my-0 fw-normal">Services</li>
          <li class="h5 my-0 fw-normal">How it works</li>
          <li class="h5 my-0 fw-normal">Help</li>
          <li class="h5 my-0 fw-normal">Log in</li>
          <li class="my-0">
            <button class="btn btn-primary btn-sm">Get Quotes</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" style="max-width: 280px"
         id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body pt-0">
        <div class="table-responsive">
          <table class="table">
            <tbody>
            <tr>
              <td>Services</td>
            </tr>
            <tr>
              <td>How it works</td>
            </tr>
            <tr>
              <td>Help</td>
            </tr>
            <tr>
              <td>Log in</td>
            </tr>
            <tr>
              <td>
                <button class="btn btn-primary btn-sm">Get Quotes</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import KTTopbar from "@/layouts/main-layout/header/Topbar.vue";

import {
  headerWidthFluid,
  headerLeft,
  asideDisplay,
  asideMinimized,
} from "@/core/helpers/config";

export default defineComponent({
  name: "KTHeader",
  components: {
    KTTopbar,
  },
  setup() {
    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      asideMinimized,
      getAssetPath,
    };
  },
});
</script>
