<template>
  <!--begin::Modal - Create account-->
  <div
      class="modal fade"
      id="create_quote_modal"
      ref="createAccountModalRef"
      aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Title-->
          <h2>Get a Quote</h2>
          <!--end::Title-->

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
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y m-5">
          <!--begin::Stepper-->
          <div
              ref="createAccountRef"
              class="stepper stepper-links d-flex flex-column"
              id="kt_create_account_stepper"
          >
            <!--begin::Nav-->
            <div class="stepper-nav py-5">
              <!--begin::Step 2-->
              <div class="stepper-item current" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Vehicle Info</h3>
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Pick up & Drop off Location</h3>
              </div>
              <!--end::Step 3-->

              <!--begin::Step 4-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Pick up Date</h3>
              </div>
              <!--end::Step 4-->

              <!--begin::Step 4-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Shipper Info</h3>
              </div>
              <!--end::Step 4-->

              <!--begin::Step 5-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">Completed</h3>
              </div>
              <!--end::Step 5-->
            </div>
            <!--end::Nav-->

            <!--begin::Form-->
            <form
                class="mx-auto mw-600px w-100 py-10"
                novalidate
                id="kt_create_account_form"
                @submit="handleStep"
            >
              <!--begin::Step 2-->
              <div class="current" data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-15">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Vehicle Info</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      If you need more info, please check out
                      <a href="#" class="link-primary fw-bold">Help Page</a>.
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="mb-10 fv-row">
                    <!--begin::Label-->
                    <label class="form-label mb-3">Car Make</label>
                    <!--end::Label-->

                    <Multiselect
                        @search-change="searchCars" :searchable="true"
                        @input="onCarMakeChange"
                        :options="options.carMakes" :object="true"/>
                    <!--begin::Input-->
                    <Field
                        as="select"
                        class="visually-hidden form-control form-control-lg form-control-solid"
                        name="carMake"
                        placeholder="Car Make"
                        v-model="formData.carMake"
                    >
                    </Field>
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="carMake"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="mb-10 fv-row">
                    <!--begin::Label-->
                    <label class="form-label mb-3">Car Model</label>
                    <!--end::Label-->

                    <Multiselect :searchable="true"
                                 @input="$event === null ? formData.carModel = {} : formData.carModel = $event"
                                 :options="options.carModels" :object="true"/>
                    <!--begin::Input-->
                    <Field
                        as="select"
                        class="visually-hidden form-control form-control-lg form-control-solid"
                        name="carModel"
                        placeholder="Car Model"
                        v-model="formData.carModel"
                    >
                    </Field>
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="carModel"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="mb-10 fv-row">
                    <!--begin::Label-->
                    <label class="form-label mb-3">Car Year</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <Field
                        type="date"
                        class="form-control form-control-lg form-control-solid"
                        name="carYear"
                        placeholder="Car Year"
                        v-model="formData.carYear"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="carYear"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-12">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Tell is more about pick up and drop off locations</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      If you need more info, please check out
                      <a href="#" class="link-primary fw-bold">Help Page</a>.
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">Pick up Location</label>
                    <!--end::Label-->

                    <Multiselect
                        @search-change="searchPickUpLocation" :searchable="true"
                        @input="onPickUpLocationChange"
                        :options="options.pickUpLocations" :object="true"/>

                    <!--begin::Input-->
                    <Field
                        as="select"
                        name="pickUpLocation"
                        class="visually-hidden form-control form-control-lg form-control-solid"
                        v-model="formData.pickUpLocation"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="pickUpLocation"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">Drop off Location</label>
                    <!--end::Label-->

                    <Multiselect
                        @search-change="searchDropOffLocation" :searchable="true"
                        @input="onDropOffLocationChange"
                        :options="options.dropOffLocations" :object="true"/>

                    <!--begin::Input-->
                    <Field
                        as="select"
                        name="dropOffLocation"
                        class="visually-hidden form-control form-control-lg form-control-solid"
                        v-model="formData.dropOffLocation"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="dropOffLocation"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 3-->

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-12">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">When would you like the job carried out?</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      If you need more info, please check out
                      <a href="#" class="link-primary fw-bold">Help Page</a>.
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">Pick up Date</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <div class="flex flex-wrap items-center">
                      <el-dropdown class="w-100" trigger="click">
                        <Field
                            type="text"
                            name="pickUpDate"
                            class="form-control form-control-lg form-control-solid"
                            v-model="formData.pickUpDate"
                            placeholder="Preferred Pick up Date"
                        />
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                            <el-dropdown-item>Action 4</el-dropdown-item>
                            <el-dropdown-item>Action 5</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="pickUpDate"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 3-->

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-10 pb-lg-12">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">What's your info so we can send you the quotes?</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      If you need more info, please check out
                      <a href="#" class="link-primary fw-bold">Help Page</a>.
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">First Name</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <Field
                        type="text"
                        name="firstName"
                        class="form-control form-control-lg form-control-solid"
                        v-model="formData.firstName"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="firstName"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">Last Name</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <Field
                        type="text"
                        name="lastName"
                        class="form-control form-control-lg form-control-solid"
                        v-model="formData.lastName"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="lastName"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label required">Email Address</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <Field
                        type="email"
                        name="emailAddress"
                        class="form-control form-control-lg form-control-solid"
                        v-model="formData.emailAddress"
                    />
                    <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="emailAddress"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->

                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 3-->

              <!--begin::Step 5-->
              <div data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="pb-8 pb-lg-10">
                    <!--begin::Title-->
                    <h2 class="fw-bold text-dark">Your Are Done!</h2>
                    <!--end::Title-->

                    <!--begin::Notice-->
                    <div class="text-gray-400 fw-semobold fs-6">
                      If you need more info, please
                      <router-link to="/sign-in" class="link-primary fw-bold"
                      >Sign In
                      </router-link
                      >
                      .
                    </div>
                    <!--end::Notice-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Body-->
                  <div class="mb-0">
                    <!--begin::Text-->
                    <div class="fs-6 text-gray-600 mb-5">
                      Writing headlines for blog posts is as much an art as it
                      is a science and probably warrants its own post, but for
                      all advise is with what works for your great & amazing
                      audience.
                    </div>
                    <!--end::Text-->

                    <!--begin::Alert-->
                    <div
                        class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
                    >
                      <!--begin::Icon-->
                      <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
                        <inline-svg
                            :src="
                            getAssetPath(
                              '/media/icons/duotune/general/gen044.svg'
                            )
                          "
                        />
                      </span>
                      <!--end::Icon-->
                      <!--begin::Wrapper-->
                      <div class="d-flex flex-stack flex-grow-1">
                        <!--begin::Content-->
                        <div class="fw-semobold">
                          <h4 class="text-gray-800 fw-bold">
                            We need your attention!
                          </h4>
                          <div class="fs-6 text-gray-600">
                            To start using great tools, please, please
                            <a href="#" class="fw-bold">Create Team Platform</a>
                          </div>
                        </div>
                        <!--end::Content-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <!--end::Alert-->
                  </div>
                  <!--end::Body-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 5-->

              <!--begin::Actions-->
              <div class="d-flex flex-stack pt-15">
                <!--begin::Wrapper-->
                <div class="me-2">
                  <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      @click="previousStep()"
                  >
                    <span class="svg-icon svg-icon-3 me-1">
                      <inline-svg
                          :src="
                          getAssetPath('media/icons/duotune/arrows/arr063.svg')
                        "
                      />
                    </span>
                    Back
                  </button>
                </div>
                <!--end::Wrapper-->

                <!--begin::Wrapper-->
                <div>
                  <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      v-if="currentStepIndex === totalSteps - 1"
                      @click="formSubmit()"
                  >
                    <span class="indicator-label">
                      Submit
                      <span class="svg-icon svg-icon-3 ms-2 me-0">
                        <inline-svg
                            :src="
                            getAssetPath(
                              '/media/icons/duotune/arrows/arr064.svg'
                            )
                          "
                        />
                      </span>
                    </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>

                  <button type="submit" class="btn btn-lg btn-primary" v-else>
                    Continue
                    <span class="svg-icon svg-icon-3 ms-1 me-0">
                      <inline-svg
                          :src="
                          getAssetPath('media/icons/duotune/arrows/arr064.svg')
                        "
                      />
                    </span>
                  </button>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Actions-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create project-->

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, ref} from "vue";
import {hideModal} from "@/core/helpers/dom";
import {StepperComponent} from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2";
import {useForm} from "vee-validate";
import {Field, ErrorMessage} from "vee-validate";
import * as Yup from "yup";
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";
import {searchCarMakes, searchLocations} from "@/api/quote/QuoteApi"
import search from "@/layouts/main-layout/search/Search.vue";


interface Step1 {
  carModel?: object;
  carMake?: object;
  carYear?: string;
}

interface Step2 {
  pickUpLocation?: object;
  dropOffLocation?: object;
}

interface Step3 {
  pickUpDate?: string;
}

interface Step4 {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
}


interface KTCreateApp extends Step1, Step2, Step3, Step4 {
}

export default defineComponent({
  name: "create-quote-modal",
  computed: {
    search() {
      return search
    }
  },
  components: {
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAccountRef = ref<HTMLElement | null>(null);
    const createAccountModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const options = ref({
      carMakes: [] as any[],
      carModels: [],
      pickUpLocations: [] as any[],
      dropOffLocations: [] as any[],
    })
    const formData = ref<KTCreateApp>({
      carMake: {},
      carModel: {},
      carYear: "",
      pickUpLocation: {},
      dropOffLocation: {},
      pickUpDate: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
          createAccountRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        carMake: Yup.object().test('car-make', 'Car Make is a required field', obj => {
          return Object.keys(obj).length !== 0;
        }),
        carModel: Yup.object().test('car-models', 'Car Model is a required field', obj => {
          return Object.keys(obj).length !== 0;
        }),
        carYear: Yup.string().required().label("Car Year"),
      }),
      Yup.object({
        pickUpLocation: Yup.object().test('pickup-location', 'Pick up Location is a required field', obj => {
          return Object.keys(obj).length !== 0;
        }),
        dropOffLocation: Yup.object().test('dropoff-location', 'Drop off Location is a required field', obj => {
          return Object.keys(obj).length !== 0;
        }),
      }),
      Yup.object({
        pickUpDate: Yup.string().required().label("Pick up Date"),
      }),
      Yup.object({
        firstName: Yup.string().required().label("First Name"),
        lastName: Yup.string().required().label("Last Name"),
        emailAddress: Yup.string().required().label("Email Address"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totatStepsNumber;
      } else {
        return 1;
      }
    });

    const {resetForm, handleSubmit} = useForm<Step1 | Step2 | Step3 | Step4>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...formData.value,
        },
      });

      formData.value = {
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      }).then(() => {
        hideModal(createAccountModalRef.value);
      });
    };
    const searchCars = async (query) => {
      if (query.length < 1) return;
      let response = await searchCarMakes(query);
      options.value.carMakes = response.flatMap((item) => {
        return {
          label: item.name,
          value: item.name,
          models: item.models
        };
      });
    };

    const searchPickUpLocation = async (query) => {
      if (query.length < 1) return;
      let response = await searchLocations(query);
      options.value.pickUpLocations = response.flatMap((item) => {
        return {
          label: item.zip_code + ' ' + item.city_name + ' ' + item.state_name + ' ' + item.state_code,
          value: item.id,
        };
      });
    };
    const searchDropOffLocation = async (query) => {
      if (query.length < 1) return;
      let response = await searchLocations(query);
      options.value.dropOffLocations = response.flatMap((item) => {
        return {
          label: item.zip_code + ' ' + item.city_name + ' ' + item.state_name + ' ' + item.state_code,
          value: item.id,
        };
      });
    };

    const onCarMakeChange = (event) => {
      if (event === null) {
        formData.value.carMake = {}
        formData.value.carModel = {}
      } else {
        formData.value.carMake = event
        options.value.carModels = event.models.filter(n => n.naem !== 'Other').map((item) => {
          return {
            label: item.name,
            value: item.name,
          }
        });

      }
    };
    const onPickUpLocationChange = (event) => {
      if (event === null) {
        formData.value.pickUpLocation = {}
      } else {
        formData.value.pickUpLocation = event
      }
    };

    const onDropOffLocationChange = (event) => {
      if (event === null) {
        formData.value.dropOffLocation = {}
      } else {
        formData.value.dropOffLocation = event
      }
    };

    return {
      createAccountRef,
      totalSteps,
      previousStep,
      handleStep,
      formSubmit,
      currentStepIndex,
      formData,
      createAccountModalRef,
      getAssetPath,
      options,
      searchCars,
      searchPickUpLocation,
      searchDropOffLocation,
      onCarMakeChange,
      onPickUpLocationChange,
      onDropOffLocationChange
    };
  },
});
</script>
