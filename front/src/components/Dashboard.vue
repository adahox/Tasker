<template>
  <v-container class="fill-height">
    <v-responsive class="py-10 text-center fill-height">
      <v-row>
        <v-col class="text-right py-10">
          <v-col>
            <VueDatePicker v-model="date" :enable-time-picker="false" :format="formatarData"
              @update:model-value="filterDate"></VueDatePicker>
          </v-col>
          <v-col cols="auto">
            <v-btn color="teal-lighten-2" icon="mdi-plus" size="x-small" @click="showNewTaskDialog"></v-btn>
          </v-col>
        </v-col>
      </v-row>
      <v-row v-for="(tasks, index) in groupedByDate.tasks">
        <p class="text-subtitle-2 px-4 pt-8">
          {{ index }}
        </p>
        <TaskItem v-for="(task, index) in tasks" :id="task.id" :title="task.title" :history="task.history" :key="index" />
      </v-row>

    </v-responsive>
  </v-container>

  <!-- dialog add new task -->
  <v-dialog v-model="isNewTaskDialogVisible" width="70%">
    <v-card>
      <v-card-title>
        Add New Task
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" label="Titulo"></v-text-field>
        <v-text-field v-model="subTarefaDescricao" label="Descrição Sub-tarefa"></v-text-field>
        <v-text-field v-model="redmineLink" label="Link Redmine" hint="www.example.com/page" persistent-hint
          variant="solo"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded="20" block prepend-icon="mdi-plus" @click="adicionarTarefa" class="bg-teal-lighten-2">Salvar
          Tarefa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import TaskItem from './taskItem/TaskItem';
import { listTask, registerTask } from '../fetchers/tasks';
import { formatTo } from './../utils/Utils';

import { reactive } from 'vue';
let isNewTaskDialogVisible = ref(false);

const date = ref("");
let taskTitle = ref("");
let subTarefaDescricao = ref("");
let redmineLink = ref("");
const taskList = await listTask();

let list = reactive({ tasks: taskList.task });
const groupedByDate = reactive({ tasks: [] });

function groupBy(arr, keyGetter) {
  const out = {};
  for (let item of arr) {
    const key = keyGetter(item);
    out[`${key}`] ??= [];
    out[`${key}`].push(item);
  }
  return out;
};

groupedByDate.tasks = groupBy(list.tasks, (task) => formatTo(task.createdAt, 'DD/MM'));

async function adicionarTarefa() {
  const newTask = {
    title: taskTitle.value,
    description: subTarefaDescricao.value,
    redmineLink: redmineLink.value,
  };

  registerTask(newTask).then((data) => {
    list.tasks = data.task;
    groupedByDate.tasks = groupBy(list.tasks, (task) => formatTo(task.createdAt, 'DD/MM'));
  });

  cleaNewTaskForm();
  HideNewTaskDialog();

}

function filterDate() {
  groupedByDate.tasks = groupBy(list.tasks, (task) => formatTo(task.createdAt, 'DD/MM'));
  if (date.value)
    groupedByDate.tasks = Object.fromEntries(Object.entries(groupedByDate.tasks).filter(([key]) => key == formatTo(date.value, 'DD/MM')));
}

function formatarData(date) {

  return formatTo(date, 'DD/MM')
}

const showNewTaskDialog = () => isNewTaskDialogVisible.value = true;
const HideNewTaskDialog = () => isNewTaskDialogVisible.value = false;
const cleaNewTaskForm = () => [taskTitle.value, subTarefaDescricao.value] = ["", ""]

</script>
 