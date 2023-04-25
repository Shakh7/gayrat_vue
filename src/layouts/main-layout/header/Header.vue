<template>
    <div id="kt_header" class="header align-items-stretch">
        <div class="header-brand">
            <!--begin::Logo-->
            <router-link to="/">
                <h2 class="my-0">ShipperAuto</h2>
            </router-link>
            <!--end::Logo-->

            <!--begin::Aside minimize-->
            <div
                    v-if="asideDisplay"
                    id="kt_aside_toggle"
                    class="btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize"
                    :class="{ active: asideMinimized }"
                    data-kt-toggle="true"
                    data-kt-toggle-state="active"
                    data-kt-toggle-target="body"
                    data-kt-toggle-name="aside-minimize"
            >
        <span class="svg-icon svg-icon-1 me-n1 minimize-default">
          <inline-svg
                  :src="getAssetPath('media/icons/duotune/arrows/arr092.svg')"
          />
        </span>

                <span class="svg-icon svg-icon-1 minimize-active">
          <inline-svg
                  :src="getAssetPath('media/icons/duotune/arrows/arr076.svg')"
          />
        </span>
            </div>
            <!--end::Aside minimize-->

            <!--begin::Aside toggle-->
            <div
                    class="d-flex align-items-center d-lg-none ms-n3 me-1"
                    title="Show aside menu"
            >
                <div
                        class="btn btn-icon btn-active-color-primary w-30px h-30px"
                        id="kt_aside_mobile_toggle"
                >
          <span class="svg-icon svg-icon-1">
            <inline-svg
                    :src="getAssetPath('media/icons/duotune/abstract/abs015.svg')"
            />
          </span>
                </div>
            </div>
            <!--end::Aside toggle-->
        </div>

        <div
                class="toolbar d-flex align-items-stretch ps-0"
                :class="{
    'container-fluid': headerWidthFluid,
    'container-xxl': !headerWidthFluid,
  }"
        >
            <div
                    class="container-fluid py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between"
                    id="kt_toolbar_container"
            >
                <PageTitle></PageTitle>
                <KTTopbar/>
                <div class="d-flex d-lg-none w-100 mt-5">
                    <div class="rounded h-3px"
                         :class="'bg-'+ progress_color"
                         role="progressbar"
                         :aria-valuenow="seconds_left"
                         aria-valuemin="0"
                         :aria-valuemax="300"
                         :style="{width: seconds_left.toString() + '%'}">
                    </div>
                </div>
            </div>
        </div>
        <div class="d-none d-lg-flex w-100 position-absolute bottom-0">
            <div class="rounded h-3px"
                 :class="'bg-'+ progress_color"
                 role="progressbar"
                 :aria-valuenow="seconds_left"
                 aria-valuemin="0"
                 :aria-valuemax="300"
                 :style="{width: seconds_left.toString() + '%'}">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import KTTopbar from "@/layouts/main-layout/header/Topbar.vue";
import PageTitle from "@/layouts/main-layout/page-title/PageTitle.vue";
import {useAuthStore} from "@/stores/auth"

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
        PageTitle,
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
    data() {
        return {
            store: useAuthStore(),
            total_seconds_left: 0,
            total_time_in_seconds: 300,
        }
    },
    computed: {
        seconds_left() {
            return ((this.total_seconds_left / this.total_time_in_seconds) * 100).toFixed(1)
        },
        progress_color() {
            const seconds_left = parseFloat(this.seconds_left)
            if (seconds_left <= 10) {
                return 'danger'
            } else if (seconds_left <= 50) {
                return 'warning'
            } else {
                return 'primary'
            }
        }
    },
    methods: {
        sesstion_timeleft() {
            const expiresIn = this.store.user.session_expire_date - Math.floor(Date.now() / 1000)
            isNaN(expiresIn) ? this.total_seconds_left = 0 : this.total_seconds_left = expiresIn
        }
    },
    mounted() {
        this.sesstion_timeleft()
        setInterval(() => {
            this.sesstion_timeleft()
        }, 500)
    },
    watch: {
        seconds_left(newValue) {
            let percant_left = parseFloat(newValue)
            if (percant_left <= 0) {
                this.store.logout()
                location.reload();
            }
        }
    }
});
</script>

<style>
.session-timeout-progess-bar {
    background: blue;
    position: absolute;
    bottom: 0;
    left: 0
}
</style>