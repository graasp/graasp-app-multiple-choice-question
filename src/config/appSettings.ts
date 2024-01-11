import { Answer, AnswerKey } from '@/interfaces/answers';

export type QuestionSettings = {
  label: string;
};

export type AnswersSettings = {
  answers: Array<Answer>;
  defaultAnswer: AnswerKey[];
  multipleAnswers: boolean;
};

export type GeneralSettings = {
  required: boolean;
};
