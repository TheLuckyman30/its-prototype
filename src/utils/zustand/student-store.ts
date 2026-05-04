import type { KnowledgeComponent } from "@utils";
import { create } from "zustand";
import kcs from "@data/kc.json";

type QaPairs = Map<string, string>;

interface StudentStore {
  knowledgeComponents: KnowledgeComponent[];
  qaPairs: QaPairs;
  updateKc: (updatedKc: KnowledgeComponent) => void;
  setQaPairs: (newPairs: Map<string, string>) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  knowledgeComponents: kcs,
  qaPairs: new Map<string, string>(),
  updateKc: (updatedKC: KnowledgeComponent) => {
    set((state) => ({
      knowledgeComponents: state.knowledgeComponents.map((kc) =>
        updatedKC.id === kc.id ? updatedKC : kc,
      ),
    }));
  },
  setQaPairs: (newPairs: QaPairs) => {
    set({ qaPairs: newPairs });
  },
}));
