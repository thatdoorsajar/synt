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
            'getKeyboard'
        ]),

        mounted() {
            this.setupKeyboard();
        },

        methods: {
            ...mapMutations([
                'setupWebAudio',
                'setKeyboard',
                'setSounds',
                'stopSounds'
            ]),

            toggleSyntOnOff() {
                this.syntOn = !this.syntOn;

                if (this.firstSwitch) {
                    this.firstSwitch = false;

                    this.setupSynth();
                }
            },

            setupKeyboard() {
                this.setKeyboard(new QwertyHancock({
                    id: 'Keyboard',
                    width: 600,
                    height: 150,
                    octaves: 2,
                    startNote: 'C3',
                    blackKeyColour: '#3d4852',
                    activeColour: '#a0f0ed'
                }));
            },

            setupSynth() {                
                this.setupWebAudio();

                this.getKeyboard.keyDown = (note, frequency) => {
                    if (! this.syntOn) return;

                    let sound1 = new Sound(this.getWebAudio);
                    let sound2 = new Sound(this.getWebAudio);

                    sound1.play(frequency, -10, 'sawtooth');
                    sound2.play(frequency, 10, 'triangle');

                    this.setSounds({
                        frequency,
                        sounds: [sound1, sound2]
                    });
                };

                this.getKeyboard.keyUp = (note, frequency) => {
                    if (! this.syntOn) return;

                    this.stopSounds(frequency);
                };

                // this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + fade);
            }
        }
    }
</script>
