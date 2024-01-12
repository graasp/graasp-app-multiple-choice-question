import { ChangeEvent, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import useUserAnswer from '@/hooks/useUserAnswers';
import { AnswerKey } from '@/interfaces/answers';

import { useSettings } from '../context/SettingsContext';

const MCQView: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  const { answers, question } = useSettings();
  const { defaultAnswer } = answers;
  const { submitAnswer, userAnswer, deleteAnswer } = useUserAnswer();

  const handleChange = (
    _e: ChangeEvent<HTMLInputElement>,
    newKey: AnswerKey,
  ): void => {
    submitAnswer({
      singleKey: newKey,
    });
  };

  const defaultValue = useMemo(
    () => defaultAnswer.length > 0 && defaultAnswer[0],
    [defaultAnswer],
  );
  return (
    <Stack spacing={1} justifyContent="space-between" direction="row">
      <Box>
        <Typography sx={{ mb: 1 }} variant="h6">
          {question.label}
        </Typography>
        <FormControl>
          <RadioGroup
            name="radio-group"
            onChange={handleChange}
            value={userAnswer?.singleKey ?? defaultValue}
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
      </Box>
      {/* Status */}
      <Stack direction="column" spacing={1} alignItems="center">
        {userAnswer && (
          <>
            <Tooltip title={t('RESET_ANSWER')}>
              <IconButton onClick={() => deleteAnswer()}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('SUBMIT_OK_TOOLTIP')}>
              <CheckIcon color="success" />
            </Tooltip>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default MCQView;
