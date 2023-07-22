<template>
    <suspense>
        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title class="bg-teal-lighten-4">
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
                            <v-btn density="compact" class="bg-green-lighten-4" icon="mdi-plus"
                                @click="showNewSubTask"></v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="" v-for="(h, k) in _history">

                        <v-col class="align-self-center" v-if="h.isCreating">
                            <v-text-field v-model="h.description" label="Sub Task title" required></v-text-field>
                        </v-col>
                        <v-col class="align-self-center" v-if="h.isCreating">
                            <v-checkbox v-model="startOnSave" label="Iniciar ao Salvar" color="success" :value="true"
                                hide-details></v-checkbox>
                        </v-col>
                        <v-col v-if="h.isCreating" class="text-right align-self-center">
                            <v-btn class="bg-green-lighten-4" @click="addNewSubTask(h)"
                                prepend-icon="mdi-content-save-check">
                                Adicionar Sub Task
                            </v-btn>
                        </v-col>
                        <v-col v-else class="align-self-center">
                            {{ h?.description }}
                        </v-col>

                        <v-col v-if="!h.isCreating" class="text-right">
                            <v-btn v-if="!h.closed" class="mx-1"
                                :color="h.startTime ? 'yellow-lighten-4' : 'green-lighten-4'" icon="mdi-plus" size="x-small"
                                @click="!h.startTime ? startHistoryTask(h?.id, k) : stopHistoryTask(h?.id, k)">
                                <v-icon :icon="h.startTime ? 'mdi-pause' : 'mdi-play'"></v-icon>
                            </v-btn>

                            <Time v-if="h.closed" color="grey" value="Finalizado" />
                            <Time v-if="h.startTime" time color="light-green" :value="h.startTime" />
                            <Time v-if="h.endTime" time color="red-lighten-2" :value="h.endTime" />
                            <Time v-if="h.endTime" color="blue" :value="getWorkedTime(h.startTime, h.endTime)" />

                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </suspense>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { deleteTask } from '../../fetchers/tasks';
import { getDiff } from '../../utils/Utils';
import { startHistoryTime, stopHistoryTime, registerHistory } from '../../fetchers/history';
import Time from "../elements/time/Time.vue";
let startOnSave = ref(false);

interface ITaskItem {
    id: string,
    title: string,
    description: string,
    time: string,
    history: Array<any>,
    isCreating?: boolean
}

const props = defineProps<ITaskItem>();

const _history = reactive(props.history);

const getWorkedTime = (startTime: string, endTime: string): string => getDiff(startTime, endTime)

const startHistoryTask = async (historyId, k) => {
    let started = await startHistoryTime(historyId);
    _history[k] = started.history;
}

const stopHistoryTask = async (historyId, k) => {
    // resumeHistory
    let stoped = await stopHistoryTime(historyId);
    _history[k] = stoped.history;
}

const deleteTaskById = async () => {
    const deletedTask = await deleteTask(props.id);
}

const showNewSubTask = () => {
    const newSubTask = {
        description: "nova subtask",
        tasksId: props.id,
        closed: false,
        startTime: null,
        endTime: null,
        isCreating: true
    };

    _history.push(newSubTask);
}

const addNewSubTask = async (h) => {
    let newSubTask = h;
    newSubTask.startTime = startOnSave.value ? new Date() : null;
    delete newSubTask.isCreating;

    registerHistory(newSubTask).then((data) => {
        _history.pop();
        _history.push(data.history);
    });

}

</script>