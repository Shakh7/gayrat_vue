<template>
  <!--begin::Aside-->
    <div
            id="kt_aside"
            class="aside"
            data-kt-drawer="true"
            data-kt-drawer-name="aside"
            data-kt-drawer-activate="{default: true, lg: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'200px', '300px': '250px'}"
            data-kt-drawer-direction="start"
            data-kt-drawer-toggle="#kt_aside_mobile_toggle"
    >
        <!--begin::Aside Toolbarl-->
        <div class="aside-toolbar flex-column-auto" id="kt_aside_toolbar">
            <!--begin::Aside user-->
            <AsideToolbar/>
            <!--end::Aside user-->
        </div>
        <!--end::Aside Toolbarl-->

        <!--begin::Aside menu-->
        <div class="aside-menu flex-column-fluid">
            <KTMenu></KTMenu>
        </div>
        <!--end::Aside menu-->

        <!--begin::Footer-->
        <div class="aside-footer flex-column-auto py-5" id="kt_aside_footer">
            <div @click="onLogOutSubmitted()"
                 class="btn btn-custom btn-primary w-100"
            >
                <span class="btn-label">{{ t("logOut") }}</span>
                <span class="svg-icon btn-icon svg-icon-2">
          <inline-svg :src="getAssetPath('media/icons/duotune/general/gen005.svg')"/>
        </span>
            </div>
        </div>
        <!--end::Footer-->
    </div>
  <!--end::Aside-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";
import KTMenu from "@/layouts/main-layout/aside/Menu.vue";
import AsideToolbar from "@/layouts/main-layout/aside/AsideToolbar.vue";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
    name: "KTAside",
    components: {
        KTMenu,
        AsideToolbar,
    },
    props: {
        lightLogo: String,
        darkLogo: String,
    },
    setup() {
        const {t} = useI18n();

        return {
            t,
            getAssetPath,
        };
    },
    data() {
        return {
            store: useAuthStore()
        }
    },
    methods: {
        async onLogOutSubmitted() {
            this.store.logout()
            location.reload(true);
        }
    }
});
</script>
