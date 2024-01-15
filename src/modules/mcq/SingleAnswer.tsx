import { ChangeEvent, FC, useMemo } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { AnswersSettings } from '@/config/appSettings';
import { makeMcqAnswersCy } from '@/config/selectors';
import useUserAnswers from '@/hooks/useUserAnswers';
import { AnswerKey } from '@/interfaces/answers';
import { UserAnswer } from '@/interfaces/userAnswer';

const SingleAnswer: FC<{
  userAnswer?: UserAnswer;
  answersSettings: AnswersSettings;
}> = ({ userAnswer, answersSettings }) => {
  const { answers, defaultAnswer } = answersSettings;
  const { submitAnswer } = useUserAnswers();
  const defaultValue = useMemo(
    () => (defaultAnswer.length > 0 ? defaultAnswer[0] : undefined),
    [defaultAnswer],
  );

  const handleChange = (
    _e: ChangeEvent<HTMLInputElement>,
    newKey: AnswerKey,
  ): void => {
    submitAnswer({
      singleKey: newKey,
    });
  };
  return (
    <FormControl>
      <RadioGroup
        name="radio-group"
        onChange={handleChange}
        value={userAnswer?.singleKey ?? defaultValue}
      >
        {answers.map((answer, index) => (
          <FormControlLabel
            data-cy={makeMcqAnswersCy(index)}
            key={index}
            value={answer.key}
            control={<Radio />}
            label={answer.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SingleAnswer;
