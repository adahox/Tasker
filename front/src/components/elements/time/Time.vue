<template>
    <v-chip class="ma-2"  prepend-icon="mdi-clock">
        {{ formatedValue }}
    </v-chip>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { asTime, asDate } from '../../../utils/Utils';

interface ITime {
    value: string,
    time?: boolean,
    date?: boolean
}

const props = defineProps<ITime>();

let formatedValue = ref(props.value);

formatedValue.value = props.time ? asTime(props.value) :  props.date ? asDate(props.value) : props.value;
</script>
