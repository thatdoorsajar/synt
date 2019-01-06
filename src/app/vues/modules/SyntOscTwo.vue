<template>
    <div class="w-1/2">
        <div class="border-b-2 border-grey-darker">
            <h3 class="text-grey-dark font-normal">OSC TWO</h3>
        </div>
        <div class="flex bg-grey-darker p-2 pb-3">
            <div class="w-1/3 text-center">
                <control-knob v-model="filterCut" property-value="cut"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="filterRes" property-value="res"/>
            </div>
            <div class="w-1/3 text-center">
                <control-knob v-model="filterDrive" property-value="drv"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filterCut: 80,
                filterRes: 20,
                filterDrive: 10
            }
        }
    }
</script>
