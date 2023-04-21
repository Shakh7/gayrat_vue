<template>
  <!-- begin:: Body -->
    <div class="page d-flex flex-row flex-column-fluid">
        <!-- begin:: Aside Left -->
        <KTAside
                v-if="asideEnabled"
                :lightLogo="themeLightLogo"
                :darkLogo="themeDarkLogo"
        />
        <!-- end:: Aside Left -->

        <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
            <KTHeader/>

            <!-- begin:: Content -->
            <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
                <!-- begin:: Content Body -->
                <div class="post d-flex flex-column-fluid">
                    <div
                            id="kt_content_container"
                            :class="{
              'container-fluid': contentWidthFluid,
              'container-xxl': !contentWidthFluid,
            }"
                    >
                        <transition
                                name="fade"
                                mode="out-in"
                        >
                            <router-view/>
                        </transition>
                    </div>
                </div>
                <!-- end:: Content Body -->
            </div>
            <!-- end:: Content -->
            <KTFooter/>
        </div>
    </div>
  <!-- end:: Body -->
    <KTScrollTop/>
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
import KTHeader from "@/layouts/main-layout/header/Header.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";

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

export default defineComponent({
    name: "master-layout",
    components: {
        KTAside,
        KTHeader,
        KTFooter,
        KTScrollTop,
    },
    setup() {
        const route = useRoute();

        onBeforeMount(() => {
            LayoutService.init();
        });

        onMounted(() => {
            nextTick(() => {
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

<style>
.fade-enter-active,
.fade-leave-active {
    transition-duration: 1.5s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
