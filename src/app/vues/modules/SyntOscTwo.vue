<template>
    <div class="w-1/2">
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">OSC TWO</h3>
        </div>
        <div class="flex bg-grey-darker p-2 pb-3">
            <div class="w-1/3 text-center">
                <control-knob v-model="oscCent" 
                    property-value="cnt"
                    :min="-50"
                    :max="50"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="oscWave" 
                    property-value="wav"
                    :min="1"
                    :max="4"
                    :value-display-function="waveKnobWords"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="filterDrive" property-value="drv"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import { forOwn } from 'lodash';

    export default {
        data() {
            return {
                oscCent: 0,
                oscWave: 2,
                filterDrive: 10
            }
        },

        watch: {
            oscCent: {
                immediate: true,

                handler(detune) {
                    this.getOsc2Settings.detune = detune;

                    forOwn(this.getSounds, (soundArray, frequency) => {
                        soundArray[1].oscSettings(this.getOsc2Settings);
                    });
                }
            },

            oscWave: {
                immediate: true,

                handler(wave) {
                    if (wave == 1) {
                        wave = 'sine';
                    } else if (wave == 2) {
                        wave = 'triangle';
                    } else if (wave == 3) {
                        wave = 'sawtooth';
                    } else if (wave == 4) {
                        wave = 'square';
                    }

                    this.getOsc2Settings.wave = wave;

                    forOwn(this.getSounds, (soundArray, frequency) => {
                        soundArray[1].oscSettings(this.getOsc2Settings);
                    });
                }
            }
        },

        computed: mapGetters([
            'getOsc2Settings',
            'getSounds'
        ]),

        methods: {
            waveKnobWords(value) {
                const map = {
                    1: 'sin',
                    2: 'tri',
                    3: 'saw',
                    4: 'sqr'
                }

                return map[value];
            }
        }
    }
</script>
