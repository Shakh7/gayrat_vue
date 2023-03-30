<template>
  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">

    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
      <KTHeader/>
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid py-0">
        <!-- begin:: Content Body -->
        <div class="post d-flex flex-column-fluid">
          <div
              id="kt_content_container" class="w-100"
          >
            <router-view/>
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  nextTick,
  onBeforeMount,
} from "vue";
import {useRoute} from "vue-router";
import KTAside from "@/layouts/main-layout/aside/Aside.vue";
import KTHeader from "@/layouts/landing-page/header/Header.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import KTActivivityDrawer from "@/layouts/main-layout/drawers/ActivityDrawer.vue";
import KTCreateApp from "@/components/modals/wizards/create-app-modal/CreateAppModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import KTDemosDrawer from "@/layouts/main-layout/extras/DemosDrawer.vue";
import KTHelpDrawer from "@/layouts/main-layout/extras/HelpDrawer.vue";
import KTToolButtons from "@/layouts/main-layout/extras/ToolButtons.vue";
import KTDrawerMessenger from "@/layouts/main-layout/extras/MessengerDrawer.vue";
import {reinitializeComponents} from "@/core/plugins/keenthemes";
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";
import LayoutService from "@/core/services/LayoutService";

import {useBodyStore} from "@/stores/body";

export default defineComponent({
  name: "master-layout",
  components: {
    KTAside,
    KTHeader,
    KTFooter,
    KTScrollTop,
    KTCreateApp,
    KTInviteFriendsModal,
    KTActivivityDrawer,
    KTDemosDrawer,
    KTHelpDrawer,
    KTToolButtons,
    KTDrawerMessenger,
  },
  setup() {
    const route = useRoute();
    let bodyStore = useBodyStore();
    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        bodyStore.addBodyAttribute({
          qualifiedName: "data-kt-aside-minimize",
          value: "on",
        });
        reinitializeComponents();
      });
    });

    watch(
        () => route.path,
        () => {
          nextTick(() => {
            reinitializeComponents();
          });
        }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      themeLightLogo,
      themeDarkLogo,
    };
  },
});
</script>
