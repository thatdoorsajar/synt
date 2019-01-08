<template>
    <div class="w-1/2 pr-2">
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">FILTER</h3>
        </div>
        <div class="flex bg-grey-darker p-2 pb-3">
            <div class="w-1/3 text-center">
                <control-knob v-model="filterType" 
                    property-value="drv"
                    :min="1"
                    :max="4"
                    :value-display-function="typeKnobWords"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="filterCut" property-value="cut"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="filterRes" property-value="res"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                filterType: 1,
                filterCut: 80,
                filterRes: 20
            }
        },

        watch: {
            filterType(type) {
                if (type == 1) {
                    type = 'lowpass';
                } else if (type == 2) {
                    type = 'highpass';
                } else if (type == 3) {
                    type = 'bandpass';
                } else if (type == 4) {
                    type = 'peaking';
                }

                this.getFilterNode.type = type;
            },

            filterCut(value) {
                this.getFilterNode.frequency.value = value * 10;
            },

            filterRes(value) {
                this.getFilterNode.Q.setValueAtTime(value / 100, this.getContext.currentTime);
            }
        },

        computed: mapGetters([
            'getContext',
            'getFilterNode'
        ]),

        mounted() {
            setTimeout(() => {
                this.filterType = 1;
                this.filterCut = 81;
                this.filterRes = 21;
            }, 200)
        },

        methods: {
            typeKnobWords(value) {
                const map = {
                    1: 'lpf',
                    2: 'hpf',
                    3: 'bnd',
                    4: 'pkg'
                }

                return map[value];
            }
        }
    }
</script>
