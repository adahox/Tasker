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
                    <v-row class="py-4">
                        <v-col>
                            <p class="text-caption font-weight-bold">Sub-tarefas</p>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn density="compact" class="bg-green-lighten-4" icon="mdi-plus"
                                @click="showNewSubTask"></v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="py-4" v-for="(h, k) in _history">

                        <v-col class="align-self-center" v-if="h.isCreating">
                            <v-text-field v-model="h.description" label="Sub Task title" required></v-text-field>
                        </v-col>
                        <v-col class="align-self-center" v-if="h.isCreating">
                            <v-checkbox v-model="startOnSave" label="Iniciar ao Salvar" color="success" :value="true"
                                hide-details></v-checkbox>
                        </v-col>
                        <v-col v-if="h.isCreating" class="text-right align-self-center">
                            <v-btn class="bg-green-lighten-4" @click="addNewSubTask(h)" prepend-icon="mdi-content-save-check">
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
                            <v-chip v-if="h.closed" class="ma-2" color="pink" text-color="white">
                                <v-icon start icon="mdi-close"></v-icon>
                                Finalizado
                            </v-chip>
                            <v-chip v-if="h.startTime" class="ma-2" color="light-green" text-color="white"
                                prepend-icon="mdi-clock" :model-value="true">
                                {{ formatDate(h.startTime) }}
                            </v-chip>
                            <v-chip v-if="h.endTime" class="ma-2" color="red-lighten-2" text-color="white"
                                prepend-icon="mdi-clock" :model-value="true">
                                {{ formatDate(h.endTime) }}
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </suspense>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { deleteTask } from '../../fetchers/tasks';
import { startHistoryTime, stopHistoryTime, registerHistory } from '../../fetchers/history';
import dayjs from 'dayjs';

let isNewSubTaskDialogVisible = ref(false);
let subTask = ref("");
let startOnSave = ref(false);

const props = defineProps({
    id: String,
    title: String,
    description: String,
    time: String,
    history: Array,
    isCreating: {
        type: Boolean,
        required: false,
        default: false
    }
});

const _history = reactive(props.history);

const startHistoryTask = async (historyId, k) => {
    // resumeHistory
    let started = await startHistoryTime(historyId);
    _history[k] = started.history;
}

const stopHistoryTask = async (historyId, k) => {
    // resumeHistory
    let stoped = await stopHistoryTime(historyId);
    _history[k] = stoped.history;
}

const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('hh:mm');
}

const deleteTaskById = async () => {
    const deletedTask = await deleteTask(props.id);
    console.log(deletedTask);
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
    console.log(newSubTask);
    delete newSubTask.isCreating;
    
    registerHistory(newSubTask).then((data) => {
        _history.pop();
        _history.push(data.history);
    });

}

</script>