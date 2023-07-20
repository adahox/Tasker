<template>
  <v-container class="fill-height">
    <v-responsive class="py-10 text-center fill-height">
      <v-row>
        <v-col class="text-right py-10">
          <v-col cols="auto">
            <v-btn color="teal-lighten-2" icon="mdi-plus" size="x-small" @click="showNewTaskDialog"></v-btn>
          </v-col>
        </v-col>
      </v-row>
      <TaskItem v-for="(task, index) in list.tasks" :id="task.id" :title="task.title" :history="task.history"
        :description="task.description" :time="task.time" :key="index">
      </TaskItem>
    </v-responsive>
  </v-container>

  <!-- dialog add new task -->
  <v-dialog v-model="isNewTaskDialogVisible" width="70%">
    <v-card>
      <v-card-title>
        Add New Task
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" label="Task Title"></v-text-field>
        <v-text-field v-model="taskLink" label="Link Task"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded="20" block prepend-icon="mdi-plus" elevation="2" @click="addNewTask"
          class="bg-teal-lighten-2">Salvar Task</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import TaskItem from './taskItem/TaskItem';
import { listTask, registerTask } from '../fetchers/tasks';
import { reactive } from 'vue';
let isNewTaskDialogVisible = ref(false);

let taskTitle = ref("");
let taskLink = ref("");
const taskList = await listTask();

let list = reactive({ tasks: taskList.task });

const addNewTask = async () => {

  const newTask = {
    title: taskTitle.value,
    description: taskLink.value,
  };

  registerTask(newTask).then((data) => {
    console.log(data);
    list.tasks = data.task;
  });

  cleaNewTaskForm();
  HideNewTaskDialog();
}

const showNewTaskDialog = () => isNewTaskDialogVisible.value = true;
const HideNewTaskDialog = () => isNewTaskDialogVisible.value = false;
const cleaNewTaskForm = () => [taskTitle.value, taskLink.value] = ["", ""]

</script>
 