// Utilities
import { defineStore } from 'pinia'
import { listTask, registerTask } from '../fetchers/tasks';

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [],
  }),
  getters: {
    items: async (state) => {
      state.tasks = await listTask().task;
    }
  },
  actions: {
    async searchTasks() {
      this.tasks = await listTask().task;
    }
  },
})
