import { AnswerKey } from './answers';

export type UserAnswer = {
  singleKey?: AnswerKey;
  multipleKey?: AnswerKey[];
};
