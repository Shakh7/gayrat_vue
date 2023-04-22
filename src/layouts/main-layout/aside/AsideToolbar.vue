<template>
  <!--begin::User-->
    <div
            class="aside-user d-flex align-items-sm-center justify-content-center py-5"
    >
        <!--begin::Symbol-->
        <div class="symbol symbol-50px">
            <img :src="getAssetPath('media/avatars/300-1.jpg?>')" alt=""/>
        </div>
        <!--end::Symbol-->

        <!--begin::Wrapper-->
        <div class="aside-user-info flex-row-fluid flex-wrap ms-5">
            <!--begin::Section-->
            <div class="d-flex">
                <!--begin::Info-->
                <div class="flex-grow-1 me-2">
                    <!--begin::Username-->
                    <a href="#" class="text-white text-hover-primary fs-6 fw-semobold"
                    >
                        {{ getUserFullName }}
                    </a
                    >
                    <!--end::Username-->

                    <!--begin::Description-->
                    <span class="text-gray-600 fw-semobold d-block fs-8 mb-1"
                    >
                        {{ getUserType }}
                    </span>
                    <!--end::Description-->

                    <!--begin::Label-->
                    <div class="d-flex align-items-center text-success fs-9">
                        <span class="bullet bullet-dot bg-success me-1"></span>online
                    </div>
                    <!--end::Label-->
                </div>
                <!--end::Info-->

                <!--begin::User menu-->
                <!--                <div class="me-n2">-->
                <!--                    &lt;!&ndash;begin::Action&ndash;&gt;-->
                <!--                    <a-->
                <!--                            href="#"-->
                <!--                            class="btn btn-icon btn-sm btn-active-color-primary mt-n2"-->
                <!--                            data-kt-menu-trigger="click"-->
                <!--                            data-kt-menu-placement="bottom-start"-->
                <!--                            data-kt-menu-overflow="true"-->
                <!--                    >-->
                <!--            <span class="svg-icon svg-icon-muted svg-icon-1">-->
                <!--              <inline-svg-->
                <!--                      :src="getAssetPath('media/icons/duotune/coding/cod001.svg')"-->
                <!--              />-->
                <!--            </span>-->
                <!--                    </a>-->

                <!--                    <UserMenu/>-->
                <!--                    &lt;!&ndash;end::Action&ndash;&gt;-->
                <!--                </div>-->
                <!--end::User menu-->
            </div>
            <!--end::Section-->
        </div>
        <!--end::Wrapper-->
    </div>
  <!--end::User-->

  <!--begin::Aside search-->
  <!--    <div class="aside-search py-5">-->
  <!--        <AsideSearch/>-->
  <!--    </div>-->
  <!--end::Aside search-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
// import UserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
// import AsideSearch from "@/layouts/main-layout/aside/AsideSearch.vue";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
    name: "kt--aside-toolbar",
    components: {
        // UserMenu,
        // AsideSearch,
    },
    data() {
        return {
            getAssetPath,
            store: useAuthStore(),
        }
    },
    computed: {
        getUserType() {
            if (Object.keys(this.store.user).length > 0) {
                let convertedStr = this.store.user.user_type.replace(/_/g, ' ').toLowerCase().split(' ');
                for (let i = 0; i < convertedStr.length; i++) {
                    convertedStr[i] = convertedStr[i].charAt(0).toUpperCase() + convertedStr[i].slice(1);
                }
                return convertedStr.join(' ');
            } else {
                return '';
            }
        },
        getUserFullName() {
            let user_full_name = this.store.user.full_name
            return user_full_name
        }
    },
});
</script>
