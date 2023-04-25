<template>
    <div class="d-flex align-items-center flex-column">
        <div class="d-flex justify-content-between w-100 mt-auto mb-2">
            <small class="text-gray-400">Session timeout</small>
            <div class="text-gray-400">
                <small>
                    {{ (total_seconds_left / 60).toFixed(0) }}:
                    {{ String((total_seconds_left % 60).toFixed(0)).padStart(2, '0') }}
                </small>
            </div>
        </div>
        <div class="h-5px mx-3 w-100 mb-3">
            <div class="rounded"
                 :class="'bg-'+ progress_color + ' h-' + bar_height + 'px'"
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
import {defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
    name: "AuthSession",
    data() {
        return {
            store: useAuthStore(),
            total_seconds_left: 0,
            total_time_in_seconds: 300,
            bar_height: 3
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
})
</script>

<style scoped>

</style>