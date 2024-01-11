import { ChangeEvent, FC } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import useUserAnswer from '@/hooks/useUserAnswers';
import { AnswerKey } from '@/interfaces/answers';

import { useSettings } from '../context/SettingsContext';

const MCQView: FC = () => {
  //   const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  const { answers, question } = useSettings();
  const { defaultAnswer } = answers;
  const { submitAnswer, userAnswer } = useUserAnswer();
  const handleChange = (
    _e: ChangeEvent<HTMLInputElement>,
    newKey: AnswerKey,
  ): void => {
    submitAnswer({
      singleKey: newKey,
    });
  };
  return (
    <>
      <Typography sx={{ mb: 1 }} variant="h6">
        {question.label}
      </Typography>
      <FormControl>
        <RadioGroup
          defaultValue={defaultAnswer.length > 0 && defaultAnswer[0]}
          name="radio-group"
          onChange={handleChange}
          value={userAnswer?.singleKey}
        >
          {answers.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer.key}
              control={<Radio />}
              label={answer.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default MCQView;
