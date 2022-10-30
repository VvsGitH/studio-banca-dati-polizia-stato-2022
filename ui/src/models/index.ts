export interface Answer {
  label: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Array<Answer>;
}

export interface Section {
  section: string;
  qa: Array<Question>;
}

export type DataBank = Array<Section>;