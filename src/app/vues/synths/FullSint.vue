<template>
    <div class="w-600-fix mx-auto">
        <div class="flex bg-gradient-purple-teal shadow-lg px-6 py-4 mb-20 select-none text-3xl icon-text-aligner">
            <p class="mr-2 cursor-pointer icon-text-aligner"
                :class="{'text-teal-light': syntOn, 'text-grey-darkest': !syntOn}"
                @click="toggleSyntOnOff">
                <svg class="icon">
                    <use href="/icons.svg#icon-engine-start" xlink:href="/icons.svg#icon-engine-start"/>
                </svg>
            </p>
            <p class="text-white font-normal icon-text-aligner">
                SiNT
            </p>
        </div>
        <div class="w-600-fix mx-auto mb-6">
            <div class="flex mb-6">
                <synt-osc-one/>
                <synt-osc-two/>
            </div>
            <div class="flex">
                <synt-filter/>
                <synt-envelope/>
            </div>
        </div>
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">QWERTY</h3>
        </div>
        <div class="p-3 bg-grey-darker">
            <div id="Keyboard"></div>
        </div>
    </div>
</template>

<script>
    import Sound from '../../classes/Sound';
    import { mapGetters, mapMutations } from 'vuex';
    import SyntOscOne from '../modules/SyntOscOne.vue';
    import SyntOscTwo from '../modules/SyntOscTwo.vue';
    import SyntFilter from '../modules/SyntFilter.vue';
    import SyntEnvelope from '../modules/SyntEnvelope.vue';

    export default {
        components: {
            SyntOscOne,
            SyntOscTwo,            
            SyntFilter,
            SyntEnvelope
        },

        data() {
            return {
                syntOn: false,
                firstSwitch: true
            }
        },

        computed: mapGetters([
            'getWebAudio',
            'getOsc1Settings',
            'getOsc2Settings',
            'getSounds',
            'getKeyboard'
        ]),

        mounted() {
            this.setupWebAudio();

            this.setupKeyboard();
        },

        methods: {
            ...mapMutations([
                'setupWebAudio',
                'setupKeyboard',
                'stopAllSounds'
            ]),

            toggleSyntOnOff() {
                this.syntOn = !this.syntOn;

                if (this.firstSwitch) {
                    this.firstSwitch = false;

                    this.setupSynth();
                }

                if (! this.syntOn) {
                    this.stopAllSounds();
                }
            },

            setupSynth() {
                this.getKeyboard.keyDown = (note, frequency) => {
                    if (! this.syntOn) return;

                    let sound1 = new Sound(this.getWebAudio);
                    let sound2 = new Sound(this.getWebAudio);

                    sound1.oscSettings(this.getOsc1Settings).play(frequency);
                    sound2.oscSettings(this.getOsc2Settings).play(frequency);

                    this.getSounds[frequency] = [sound1, sound2];
                }

                this.getKeyboard.keyUp = (note, frequency) => {
                    this.getSounds[frequency].forEach(sound => sound.stop());
                }
            }
        }
    }
</script>
