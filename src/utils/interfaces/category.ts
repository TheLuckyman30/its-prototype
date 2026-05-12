export interface Category {
  id: string;
  title: string;
  unlocked: boolean;
  none: Set<string>;
  adequate: Set<string>;
  excellent: Set<string>;
}
