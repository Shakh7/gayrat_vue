<template>
  <div class="row justify-content-center">
    <div class="col-12 col-xl-5" style="max-width: 500px">
      <!--begin::Wrapper-->
      <div class="p-10 card card-body">
        <!--begin::Form-->
        <VForm
            class="form w-100"
            id="kt_login_signin_form"
            @submit="onSubmitLogin"
            :validation-schema="login"
        >
          <!--begin::Heading-->
          <div class="text-center mb-10">
            <!--begin::Title-->
            <h1 class="text-dark mb-5">Sign In</h1>
            <!--end::Title-->
          </div>
          <!--begin::Heading-->

          <!--begin::Input group-->
          <div class="fv-row mb-8">
            <!--begin::Label-->
            <label class="form-label fs-6 fw-bold text-dark">Email</label>
            <!--end::Label-->

            <!--begin::Input-->
            <Field
                tabindex="1"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="email"
                autocomplete="off"
                placeholder="Email"
            />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="email"/>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="fv-row mb-8">
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack mb-2">
              <!--begin::Label-->
              <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
              <!--end::Label-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Input-->
            <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="password"
                name="password"
                autocomplete="off"
                placeholder="Password"
            />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password"/>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <div class="form-check mb-8">
            <input v-model="trust_this_device"
                   class="form-check-input" type="checkbox" value="" id="trust_this_device"/>
            <label class="form-check-label fs-5" for="trust_this_device">
              Trust this device for 7 days
            </label>
          </div>

          <!--begin::Alert-->
          <div v-if="login_errors.length > 0"
               class="alert alert-dismissible border border-danger border-dashed bg-light-danger p-5 mb-10">

            <!--begin::Wrapper-->
            <div class="pe-0 pe-sm-10 text-danger">
              <!--begin::Content-->
              <span>
                {{ login_errors }}
              </span>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->

          </div>
          <!--end::Alert-->

          <!--begin::Actions-->
          <div class="text-center">
            <!--begin::Submit button-->
            <button
                tabindex="3"
                type="submit"
                ref="submitButton"
                id="kt_sign_in_submit"
                class="btn btn-lg btn-primary w-100 mb-5"
            >
              <span class="indicator-label"> Continue </span>

              <span class="indicator-progress">
                        Please wait..
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
            </button>
            <!--end::Submit button-->

          </div>
          <!--end::Actions-->

        </VForm>
        <!--end::Form-->
      </div>
      <!--end::Wrapper-->
    </div>
  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, ref} from "vue";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import {useAuthStore, type User} from "@/stores/auth";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import router from "@/router/index";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    let login_errors = ref('');
    let trust_this_device = ref(true);


    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().min(8).required().label("Email"),
      password: Yup.string().min(8).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      try {
        login_errors.value = '';
        values = values as User;
        // Clear existing errors
        store.logout();

        if (submitButton.value) {
          // eslint-disable-next-line
          submitButton.value!.disabled = true;
          // Activate indicator
          submitButton.value.setAttribute("data-kt-indicator", "on");
        }

        // Send login request
        await store.login(values, trust_this_device.value);
        const error = store.errors;

        if ((error).length === 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'You have successfully logged in!',
          }).then(() => {
            router.push({name: "dashboard"});
          });
        } else {
          login_errors.value = error[0];
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: error[0] as string,
          }).then(() => {
            store.errors = [];
          });
        }
      } catch {
        login_errors.value = 'Something went wrong, please try again later.';
        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
      store,
      login_errors,
      trust_this_device
    };
  },
});
</script>
