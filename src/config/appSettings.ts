import { Answer, AnswerKey } from '@/interfaces/answers';

export type QuestionSettings = {
  label: string;
};

export type AnswersSettings = {
  answers: Array<Answer>;
};

export type GeneralSettings = {
  defaultAnswer?: AnswerKey;
  multipleAnswers: boolean;
  required: boolean;
};
