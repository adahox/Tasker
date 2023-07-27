<template>
    <v-row class="" v-for="(h, key) in history">

        <v-col class="align-self-center" v-if="h.isCreating">
            <v-text-field v-model="h.description" label="Sub Task title" required></v-text-field>
        </v-col>
        <v-col class="align-self-center" v-if="h.isCreating">
            <v-checkbox v-model="startOnSave" label="Iniciar ao Salvar" color="success" :value="true"
                hide-details></v-checkbox>
        </v-col>
        <v-col v-if="h.isCreating" class="text-right align-self-center">
            <v-btn class="bg-green-lighten-4" @click="addNewSubTask(h)" prepend-icon="mdi-content-save-check">
                Adicionar Sub Tarefa
            </v-btn>
        </v-col>
        <v-col v-else class="align-self-center">
            {{ h?.description }}
        </v-col>

        <v-col v-if="!h.isCreating" class="text-right">
            <v-btn v-if="!h.closed" class="mx-1" :color="h.startTime ? 'yellow-lighten-4' : 'green-lighten-4'"
                icon="mdi-plus" size="x-small"
                @click="!h.startTime ? startHistoryTask(h?.id, key) : stopHistoryTask(h?.id, key)">
                <v-icon :icon="h.startTime ? 'mdi-pause' : 'mdi-play'"></v-icon>
            </v-btn>

            <Time v-if="h.closed" color="grey" value="Finalizado" />
            <Time v-if="h.startTime" time color="green" :value="h.startTime" />
            <Time v-if="h.endTime" time color="red-lighten-2" :value="h.endTime" />
            <Time v-if="h.endTime" time color="blue" :value="getWorkedTime(h.startTime, h.endTime)" />

        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import { getDiff } from '../../../utils/Utils';
import { startHistoryTime, stopHistoryTime, registerHistory } from '../../../fetchers/history';
import Time from "../../elements/time/Time.vue";

export interface IHistory {
    id?: string
    startTime: string
    endTime: string
    description: string
    tasksId: string
    closed: boolean
    isCreating?: boolean
}

interface Props {
    history: Array<IHistory>
};

const props = defineProps<Props>();
const startOnSave = ref(false);
const history: Array<IHistory> = reactive(props.history);

async function startHistoryTask(history_id: string, index: number): Promise<void> {
    const started = await startHistoryTime(history_id);
    history[index] = started.history;
}

async function stopHistoryTask(history_id: string, index: number): Promise<void> {
    const stoped = await stopHistoryTime(history_id);
    history[index] = stoped.history;
}

function getWorkedTime(startTime: string, endTime: string): string  {
    return getDiff(startTime, endTime)
}

async function addNewSubTask(history: IHistory): Promise<void> {
    let newSubTask = history;
    newSubTask.startTime = startOnSave.value ? new Date().toISOString() : null;
    delete newSubTask.isCreating;

    registerHistory(newSubTask).then((data) => {
        props.history.pop();
        props.history.push(data.history);
    });

}

</script>