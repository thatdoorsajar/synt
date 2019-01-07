<template>
    <div>
        <div class="flex justify-center mb-20">
            <div class="px-6 py-4 bg-gradient-purple-teal shadow-lg">
                <h1 class="text-white font-normal">SiNT</h1>
            </div>
        </div>
        <div style="max-width: 600px;" class="mx-auto mb-6">
            <div class="flex p-4 pb-0">
                <synt-osc-one/>
                <synt-osc-two/>
            </div>
            <div class="flex p-4">
                <synt-filter/>
                <synt-envelope/>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="px-6 py-4" style="max-width: 620px;">
                <div id="keyboard"></div>
            </div>
        </div>
    </div>
</template>

<script>
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
                keyboard: {},
                context: {},
                gainNode: {},
                oscillators: {},
                syntOn: false
            }
        },

        mounted() {
            this.setupKeyboard();

            // var AudioContext = window.AudioContext || window.webkitAudioContext;
            // var audioCtx = new AudioContext();
            // var oscillatorNode = audioCtx.createOscillator();
            // var gainNode = audioCtx.createGain();
            // var finish = audioCtx.destination;
            // etc.
        },

        methods: {
            toggleSyntOnOff() {
                this.syntOn = !this.syntOn;

                if (this.syntOn) {
                    this.setupSynth();
                }
            },

            setupKeyboard() {
                this.keyboard = new QwertyHancock({
                    id: 'keyboard',
                    width: 600,
                    height: 150,
                    octaves: 2,
                    startNote: 'C3',
                    blackKeyColour: '#3d4852',
                    activeColour: '#a0f0ed'
                });
            },

            setupSynth() {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
                this.gainNode = this.context.createGain();

                this.gainNode.gain.value = 0.2;

                this.gainNode.connect(this.context.destination);

                this.keyboard.keyDown = (note, frequency) => {
                    if (! this.syntOn) return;

                    let osc1 = this.context.createOscillator(),
                        osc2 = this.context.createOscillator();

                    osc1.frequency.value = frequency;
                    osc1.type = 'sawtooth';
                    osc1.detune.value = -10;

                    osc2.frequency.value = frequency;
                    osc2.type = 'triangle';
                    osc2.detune.value = 10;

                    osc1.connect(this.gainNode);
                    osc2.connect(this.gainNode);

                    this.gainNode.connect(this.context.destination);

                    this.oscillators[frequency] = [osc1, osc2];

                    osc1.start(this.context.currentTime);
                    osc2.start(this.context.currentTime);
                };

                this.keyboard.keyUp = (note, frequency) => {
                    if (! this.syntOn) return;

                    this.oscillators[frequency].forEach((oscillator) => {
                        oscillator.stop(this.context.currentTime);
                    });
                };
            }
        }
    }
</script>
