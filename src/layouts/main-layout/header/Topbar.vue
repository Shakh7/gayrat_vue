<template>
  <!--begin::Action group-->
    <div class="d-flex align-items-stretch overflow-auto pt-3 pt-lg-0">

        <!--begin::Action wrapper-->
        <div class="d-flex align-items-center">
            <!--begin::Label-->
            <span class="fs-7 text-gray-700 fw-bold pe-3 d-none d-xxl-block"
            >Quick Tools:</span
            >
            <!--end::Label-->

            <!--begin::Actions-->
            <div class="d-flex">
                <!--begin::Action-->
                <a
                        href="#"
                        class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_invite_friends"
                >
          <span class="svg-icon svg-icon-1">
            <inline-svg
                    :src="getAssetPath('media/icons/duotune/files/fil003.svg')"
            />
          </span>
                </a>
                <!--end::Action-->

                <!--begin::Quick links-->
                <div class="d-flex align-items-center">
                    <!--begin::Menu wrapper-->
                    <a
                            href="#"
                            class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_create_app"
                    >
            <span class="svg-icon svg-icon-1">
              <inline-svg
                      :src="getAssetPath('media/icons/duotune/files/fil010.svg')"
              />
            </span>
                    </a>
                    <!--end::Menu wrapper-->
                </div>
                <!--end::Quick links-->
            </div>
            <!--end::Actions-->
        </div>
        <!--end::Action wrapper-->

        <!--begin::Theme mode-->
        <div class="d-flex align-items-center">
            <!--begin::Menu toggle-->
            <a
                    href="#"
                    class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
                    data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                    data-kt-menu-attach="parent"
                    data-kt-menu-placement="bottom-end"
            >
        <span class="svg-icon theme-light-show svg-icon-2">
          <inline-svg
                  :src="getAssetPath('media/icons/duotune/general/gen060.svg')"
          />
        </span>
                <span class="svg-icon theme-dark-show svg-icon-2">
          <inline-svg
                  :src="getAssetPath('media/icons/duotune/general/gen061.svg')"
          />
        </span>
            </a>
            <!--begin::Menu toggle-->
            <KTThemeModeSwitcher></KTThemeModeSwitcher>
        </div>
        <!--end::Theme mode-->
        {{ user.session_expire_date }}
    </div>
  <!--end::Action group-->


</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, onMounted} from "vue";
import noUiSlider from "nouislider";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import {useAuthStore} from "@/stores/auth"

export default defineComponent({
    name: "layout-topbar",
    components: {
        KTThemeModeSwitcher,
    },
    setup() {
        const initSlider = (): void => {
            const slider: noUiSlider.Instance = document.querySelector(
                "#kt_toolbar_slider"
            ) as noUiSlider.Instance;
            const rangeSliderValueElement: Element | null = document.querySelector(
                "#kt_toolbar_slider_value"
            );

            if (!slider) {
                return;
            }

            slider.innerHTML = "";

            noUiSlider.create(slider, {
                start: [5],
                connect: [true, false],
                step: 1,
                range: {
                    min: [1],
                    max: [10],
                },
            });

            slider.noUiSlider.on("update", function (values: any, handle: any) {
                if (!rangeSliderValueElement) {
                    return;
                }

                rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
            });
        };

        onMounted(() => {
            initSlider();
        });

        return {
            getAssetPath,
        };
    },
    data() {
        return {
            store: useAuthStore()
        }
    },
    computed: {
        user() {
            return this.store.user
        }
    }
});
</script>
