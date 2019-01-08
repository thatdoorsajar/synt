<template>
    <div class="w-1/2 pr-2">
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">OSC ONE</h3>
        </div>
        <div class="flex bg-grey-darker p-2 pb-3">
            <div class="w-1/3 text-center">
                <control-knob v-model="oscCent" property-value="dtn"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="oscWave" property-value="wav"/>
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
                oscCent: 80,
                oscWave: 20,
                filterDrive: 10
            }
        },

        watch: {
            oscCent(detune) {
                forOwn(this.getSounds, (soundArray, frequency) => {
                    console.log(frequency, soundArray);
                    soundArray.forEach(sound => sound.oscSettings(detune));
                });
            },

            oscWave(wave) {
                if (wave >= 0 && wave < 25) {
                    wave = 'sine';
                } else if (wave >= 25 && wave < 50) {
                    wave = 'triangle';
                } else if (wave >= 50 && wave < 75) {
                    wave = 'sawtooth';
                } else if (wave >= 75 && wave <= 100) {
                    wave = 'square';
                }

                forOwn(this.getSounds, (soundArray, frequency) => {
                    soundArray.forEach(sound => sound.oscSettings(this.oscCent, wave));
                });
            }
        },

        computed: mapGetters([
            'getSounds'
        ])
    }
</script>
