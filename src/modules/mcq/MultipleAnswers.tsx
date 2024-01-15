import { FC, useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import { AnswersSettings } from '@/config/appSettings';
import { makeMcqMultipleAnswersCy } from '@/config/selectors';
import useUserAnswers from '@/hooks/useUserAnswers';
import { AnswerKey } from '@/interfaces/answers';
import { UserAnswer } from '@/interfaces/userAnswer';

const MultipleAnswers: FC<{
  userAnswer?: UserAnswer;
  answersSettings: AnswersSettings;
}> = ({ userAnswer, answersSettings }) => {
  const { answers } = answersSettings;
  const { submitAnswer } = useUserAnswers();

  // TODO: setup default answer
  const [selectedKeys, setSelectedKeys] = useState<AnswerKey[]>([]);

  useEffect(() => {
    const a = userAnswer?.multipleKey;
    if (a) {
      setSelectedKeys(a);
    } else {
      setSelectedKeys([]);
    }
  }, [userAnswer]);

  const isSelected = (key: AnswerKey): boolean =>
    selectedKeys.includes(key) ?? false;

  const handleChange = (key: AnswerKey, checked: boolean): void => {
    if (checked && !isSelected(key)) {
      submitAnswer({
        multipleKey: [...selectedKeys, key],
      });
    } else if (!checked) {
      submitAnswer({
        multipleKey: selectedKeys.filter((k) => k !== key),
      });
    }
  };

  return (
    <FormControl>
      <FormGroup>
        {answers.map((answer, index) => (
          <FormControlLabel
            data-cy={makeMcqMultipleAnswersCy(index)}
            key={index}
            data-key={answer.key}
            checked={isSelected(answer.key)}
            control={<Checkbox />}
            label={answer.label}
            onChange={(_e, checked) => handleChange(answer.key, checked)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleAnswers;
