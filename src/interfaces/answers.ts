export type AnswerKey = string;

export interface Answer {
  key: AnswerKey;
  label: string;
  value?: string | number;
}

export const getEmptyAnswer = (): Answer => ({ key: '', label: '' });
