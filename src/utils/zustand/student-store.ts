import type { KnowledgeComponent } from "@utils";
import { create } from "zustand";
import kcs from "@data/kc.json";

interface StudentStore {
  knowledgeComponents: KnowledgeComponent[];
  updateKc: (updatedKc: KnowledgeComponent) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  knowledgeComponents: kcs,
  updateKc: (updatedKC: KnowledgeComponent) => {
    set((state) => ({
      knowledgeComponents: state.knowledgeComponents.map((kc) =>
        updatedKC.id === kc.id ? updatedKC : kc,
      ),
    }));
  },
}));
