import { defineStore } from "pinia";
import loggerService from "@/services/loggerService.ts";
import { User } from "@/models/user.interface.ts";
import { geUsers } from "@/services/dataService.ts";

export interface DataState {
  isLoading: boolean;
  users: User[];
}

export const useDataStore = defineStore({
  id: "data",
  state: (): DataState => ({
    isLoading: false,
    users: [],
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        this.users = await geUsers();
      } catch (e) {
        loggerService.error(`Error fetching users`);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
