<template>
    <div class="row justify-content-center w-100 mx-auto py-10">
        <div class="col-8">
            <div class="card card-body">
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
                                            type="number"
                                            class="form-control form-control-lg form-control-solid"
                                            name="carYear"
                                            placeholder="Car Year"
                                            v-model="formData.carYear"
                                    >
                                    </Field>
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
                                    <Field
                                            type="text"
                                            name="pickUpDate"
                                            class="form-control form-control-lg form-control-solid"
                                            v-model="formData.pickUpDate"
                                            placeholder="Preferred Pick up Date"
                                            data-bs-toggle="modal"
                                            data-bs-target="#select_pickup_date_modal"
                                            readonly disabled
                                            @change="onPickUpDateSelect"
                                            @input="onPickUpDateSelect"
                                    />
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
                            <div class="w-100" v-if="isCreatingQuote === false">
                                <div class="pb-8 pb-lg-10">
                                    <h2 v-if="hasCreatedQuote" class="fw-bold text-dark">Your Are Done!</h2>
                                    <h2 v-else class="fw-bold text-danger">Something Went Wrong, Plase Try Again
                                        Later!</h2>
                                </div>
                            </div>
                            <div class="w-100" v-if="isCreatingQuote">
                                <div class="pb-8 pb-lg-10">
                                    <h2 class="fw-bold text-dark">We are creating your quote</h2>
                                    <h4 class="text-dark">Please, do not leave this page</h4>
                                </div>
                            </div>
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
            </div>
        </div>
    </div>

    <div class="modal fade"
         tabindex="-1"
         id="select_pickup_date_modal"
         ref="selectPickUpDateModalRef"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <h5 class="modal-title fw-normal">Select a Delivery Timeframe</h5>

                    <!--begin::Close-->
                    <div
                            class="btn btn-icon btn-sm btn-active-light-primary ms-2 btn-close-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                    >
                        <span class="svg-icon svg-icon-2x"></span>
                    </div>
                    <!--end::Close-->
                </div>

                <div class="modal-body pt-4">
                    <div class="row gy-3 px-3" v-if="!formData.onAspecificDate">
                        <div class="col-12">
                            <input
                                    type="radio"
                                    class="btn-check"
                                    name="pickUpDate"
                                    value="Within a Week"
                                    v-model="formData.pickUpDate"
                            />
                            <label @click="formData.pickUpDate = 'Within a Week'"
                                   data-bs-dismiss="modal"
                                   aria-label="Close"
                                   class="btn btn-outline btn-outline-dashed btn-outline-default p-7 py-4 d-flex align-items-center"
                            >
                                <!--begin::Info-->
                                <span class="d-block fw-semobold text-start">
                            <span class="text-dark fw-bold d-block fs-4">
                              Within a Week
                            </span>
                </span>
                            </label>
                        </div>
                        <div class="col-12">
                            <input
                                    type="radio"
                                    class="btn-check"
                                    name="pickUpDate"
                                    value="Within Two Weeks"
                                    v-model="formData.pickUpDate"
                            />
                            <label @click="formData.pickUpDate = 'Within Two Weeks'"
                                   data-bs-dismiss="modal"
                                   aria-label="Close"
                                   class="btn btn-outline btn-outline-dashed btn-outline-default p-7 py-4 d-flex align-items-center"
                            >
                                <!--begin::Info-->
                                <span class="d-block fw-semobold text-start">
                            <span class="text-dark fw-bold d-block fs-4">
                              Within Two Weeks
                            </span>
                </span>
                            </label>
                        </div>
                        <div class="col-12">
                            <input
                                    type="radio"
                                    class="btn-check"
                            />
                            <label @click="formData.onAspecificDate = true"
                                   class="btn btn-outline btn-outline-dashed btn-outline-default p-7 py-4 d-flex align-items-center"
                            >
                <span class="d-block fw-semobold text-start w-100">
                  <span class="text-dark fw-bold fs-4 d-flex justify-content-between align-items-center">
                    <span>On a Specific Date</span>
                    <i class="fa-solid fa-angle-right"></i>
                  </span>
                </span>
                            </label>
                        </div>
                        <div class="col-12">
                            <input
                                    type="radio"
                                    class="btn-check"
                                    name="pickUpDate"
                                    value="Don't Have a Date Yet"
                                    v-model="formData.pickUpDate"
                            />
                            <label @click="formData.pickUpDate = 'Don\'t Have a Date Yet'"
                                   data-bs-dismiss="modal"
                                   aria-label="Close"
                                   class="btn btn-outline btn-outline-dashed btn-outline-default p-7 py-4 d-flex align-items-center"
                            >
                                <!--begin::Info-->
                                <span class="d-block fw-semobold text-start">
                  <span class="text-dark fw-bold d-block fs-4">
                    Don't Have a Date Yet
                  </span>
                </span>
                            </label>
                        </div>
                    </div>
                    <div class="row gy-3 px-3" v-if="formData.onAspecificDate">
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-center">
                                <button @click="formData.onAspecificDate = false" class="btn btn-light mb-3">
                                    <i class="fa-solid fa-angle-left fs-4 me-2"></i> Back
                                </button>
                                <i class="fa-solid fa-xmark fs-3 mb-4 cursor-pointer" data-bs-dismiss="modal"
                                   aria-label="Close" @click="formData.onAspecificDate = false"></i>
                            </div>
                            <VDatePicker
                                    :min-date="new Date()"
                                    :max-date="new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate())"
                                    expanded v-model="formData.pickUpDate" mode="date"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, watch, watchEffect, ref} from "vue";
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
import axios from "axios";

interface Step1 {
    carModel?: object;
    carMake?: object;
    carYear?: number;
}

interface Step2 {
    pickUpLocation?: object;
    dropOffLocation?: object;
}

interface Step3 {
    pickUpDate?: string;
    onAspecificDate?: boolean;
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
        const selectPickUpDateModalRef = ref<HTMLElement | null>(null);
        const currentStepIndex = ref(0);
        const isCreatingQuote = ref(true);
        const hasCreatedQuote = ref(false);

        const options = ref({
            carMakes: [] as any[],
            carModels: [],
            pickUpLocations: [] as any[],
            dropOffLocations: [] as any[],
        })
        const formData = ref<KTCreateApp>({
            carMake: {},
            carModel: {},
            carYear: 0,
            pickUpLocation: {},
            dropOffLocation: {},
            pickUpDate: "",
            onAspecificDate: false,
            firstName: "",
            lastName: "",
            emailAddress: "",
        });

        onMounted(() => {
            _stepperObj.value = StepperComponent.createInsance(
                createAccountRef.value as HTMLElement
            );
        });

        watch(
            [() => formData.value.pickUpDate, () => currentStepIndex.value],
            ([newPickUpDate, newCurrentStepIndex]) => {

                if (newPickUpDate) {
                    if (newPickUpDate !== 'Within a Week' &&
                        newPickUpDate !== 'Within Two Weeks' &&
                        newPickUpDate !== 'Don\'t Have a Date Yet'
                    ) {
                        console.log("I AM HERE")
                        console.log(newPickUpDate)
                        const date = new Date(newPickUpDate);
                        const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        });
                        formData.value.pickUpDate = formattedDate;
                    }
                    document.querySelector('#select_pickup_date_modal .btn-close-modal')?.click();
                }

                if (newCurrentStepIndex === 4) {
                    createQuote()
                }
            }
        );

        const createAppSchema = [
            Yup.object({
                carMake: Yup.object().test('car-make', 'Car Make is a required field', obj => {
                    return Object.keys(obj).length !== 0;
                }),
                carModel: Yup.object().test('car-models', 'Car Model is a required field', obj => {
                    return Object.keys(obj).length !== 0;
                }),
                carYear: Yup.number().required().label("Car Year").min(1900).max(new Date().getFullYear()),
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

        const createQuote = async () => {
            isCreatingQuote.value = true;
            const date = new Date(formData.value.pickUpDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            let data = {
                car_make: formData.value.carMake?.value,
                car_model: formData.value.carModel?.value,
                car_year: parseInt(formData.value.carYear),
                pick_up_address: formData.value.pickUpLocation?.value,
                drop_off_address: formData.value.dropOffLocation?.value,
                pick_up_date: formattedDate,
                first_name: formData.value.firstName,
                last_name: formData.value.lastName,
                email: formData.value.emailAddress,
            }
            let request = await axios.post('http://127.0.0.1:8000/api/quotes/create/', data);
            if (request.status === 201) {
                isCreatingQuote.value = false;
                hasCreatedQuote.value = true;
            } else {
                isCreatingQuote.value = false;
                hasCreatedQuote.value = false;
            }
        };

        const searchCars = async (query) => {
            if (query.length < 1) return;
            let response = await searchCarMakes(query);
            options.value.carMakes = response.flatMap((item) => {
                return {
                    label: item.name,
                    value: item.id,
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
                        value: item.id,
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
        const onPickUpDateSelect = (event) => {
            console.log("event", event)
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
            isCreatingQuote,
            hasCreatedQuote,
            searchCars,
            searchPickUpLocation,
            searchDropOffLocation,
            onCarMakeChange,
            onPickUpLocationChange,
            onDropOffLocationChange,
            onPickUpDateSelect
        };
    },
})
;
</script>
