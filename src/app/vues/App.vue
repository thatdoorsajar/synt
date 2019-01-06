<template>
    <div>
        <div style="width:606px;" class="bg-grey-darkest rounded shadow-lg">
            <nav class="flex justify-between p-4 pb-0">
                <h1 class="text-grey-light font-medium" style="line-height: 0.8;">SiNT</h1>
                <div class="switch">
                    <input type="checkbox" 
                        name="syntOnOffSwitch" 
                        class="switch-checkbox"
                        :checked="syntOn">
                    <label class="switch-label" 
                        for="syntOnOffSwitch" 
                        @click="toggleSyntOnOff">
                        <span class="switch-inner"></span>
                        <span class="switch-switch"></span>
                    </label>
                </div>
            </nav>
            <div class="flex p-4 pb-0">
                <synt-osc-one/>
                <synt-osc-two/>
            </div>
            <div class="flex p-4">
                <synt-filter/>
                <synt-envelope/>
            </div>
            <div class="p-4 pt-0">
               <div id="keyboard"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import SyntOscOne from './modules/SyntOscOne.vue';
    import SyntOscTwo from './modules/SyntOscTwo.vue';
    import SyntFilter from './modules/SyntFilter.vue';
    import SyntEnvelope from './modules/SyntEnvelope.vue';

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
        },

        methods: {
            toggleSyntOnOff() {
                this.syntOn = !this.syntOn;
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
