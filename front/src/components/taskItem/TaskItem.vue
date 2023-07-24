<template>
    <suspense>
        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title color="teal">
                    {{ title }}

                    <template v-slot:actions="{ expanded }">
                        <v-icon color="teal" :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'"></v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                    <v-row class="py-2">
                        <v-col>
                            <p class="text-caption font-weight-bold">Sub-tarefas</p>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn density="compact" color="green" icon="mdi-plus" @click="showNewSubTask"></v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <History :history="props.history" />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </suspense>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { deleteTask } from '../../fetchers/tasks';
import History, { IHistory } from './history/History.vue'

interface ITaskItem {
    id?: string,
    title: string,
    description: string,
    time: string,
    history: Array<IHistory>,
    isCreating?: boolean
}

const props = defineProps<ITaskItem>();
const history = reactive(props.history);

async function deleteTaskById() {
    const deletedTask = await deleteTask(props.id);
}

function showNewSubTask() {

    const newSubTask = {
        description: "nova subtask",
        tasksId: props.id,
        closed: false,
        startTime: null,
        endTime: null,
        isCreating: true
    };

    history.push(newSubTask);
}
</script>