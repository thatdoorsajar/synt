<template>
    <div class="w-1/2">
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">ADSR</h3>
        </div>
        <div class="flex bg-grey-darker p-2 pb-3">
            <div class="w-1/3 text-center">
                <control-knob v-model="envAttack" property-value="atk"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="envDecay" property-value="dcy"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="envRelease" property-value="rls"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                envAttack: 10,
                envDecay: 80,
                envRelease: 10
            }
        },

        watch: {
            envAttack: {
                immediate: true,

                handler(value) {
                    this.getEnvSettings.attack = value / 100;
                }
            },

            envDecay: {
                immediate: true,

                handler(value) {
                    this.getEnvSettings.decay = value / 100;
                }
            },

            envRelease: {
                immediate: true,

                handler(value) {
                    this.getEnvSettings.release = value / 100;
                }
            }
        },

        computed: mapGetters([
            'getEnvSettings'
        ])
    }
</script>
