type KcUnderstanding = {
  none: string[];
  adequate: string[];
  excellent: string[];
};

export interface Category {
  id: string;
  title: string;
  kcsUnderstanding: KcUnderstanding;
}
