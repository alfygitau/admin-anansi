import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  registeredUser: {},
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setRegisteredUser: (data) => set({ registeredUser: data }),
      clearRegisteredUser: () => set({ registeredUser: {} }),

      resetStore: () => {
        set(initialState);
      },
    }),
    {
      name: "my-storage",
    },
  ),
);
