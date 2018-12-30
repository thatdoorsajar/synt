<template>
    <div>
        <div style="width:600px;" class="bg-grey-lighter rounded shadow border-2">
            <nav class="flex justify-between p-4">
                <h1 class="text-grey">Synt</h1>
                <div class="switch">
                    <input type="checkbox" name="syntOnOffSwitch" class="switch-checkbox">
                    <label class="switch-label" 
                        for="syntOnOffSwitch" 
                        @click="toggleSyntOnOff">
                        <span class="switch-inner"></span>
                        <span class="switch-switch"></span>
                    </label>
                </div>
            </nav>
            <div class="p-4">
               <div id="keyboard"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyboard: {},
                syntOn: false
            }
        },

        mounted() {
            this.keyboard = new QwertyHancock({
                id: 'keyboard',
                width: 600,
                height: 150,
                octaves: 2,
                // startNote: 'A3',
                whiteNotesColour: 'white',
                blackNotesColour: '#3d4852',
                hoverColour: '#f3e939'
            });
        },

        methods: {
            toggleSyntOnOff() {
                this.syntOn = !this.syntOn;
                
                if (! this.syntOn) return;
            },

            setupKeyboard() {
                let context = new AudioContext(),
                    masterVolume = context.createGain(),
                    oscillators = {};

                masterVolume.gain.value = 0.2;

                masterVolume.connect(context.destination);

                this.keyboard.keyDown = function (note, frequency) {
                    let osc = context.createOscillator(),
                        osc2 = context.createOscillator();

                    osc.frequency.value = frequency;
                    osc.type = 'sawtooth';
                    osc.detune.value = -10;

                    osc2.frequency.value = frequency;
                    osc2.type = 'triangle';
                    osc2.detune.value = 10;

                    osc.connect(masterVolume);
                    osc2.connect(masterVolume);

                    masterVolume.connect(context.destination);

                    oscillators[frequency] = [osc, osc2];

                    osc.start(context.currentTime);
                    osc2.start(context.currentTime);
                };

                this.keyboard.keyUp = function (note, frequency) {
                    oscillators[frequency].forEach(function (oscillator) {
                        oscillator.stop(context.currentTime);
                    });
                };
            }
        }
    }
</script>
