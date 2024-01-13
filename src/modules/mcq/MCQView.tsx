import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { MCQ_QUESTION_CY } from '@/config/selectors';
import useUserAnswer from '@/hooks/useUserAnswers';

import { useSettings } from '../context/SettingsContext';
import MultipleAnswers from './MultipleAnswers';
import SingleAnswer from './SingleAnswer';

const MCQView: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  const { answers, question } = useSettings();
  const { userAnswer, deleteAnswer } = useUserAnswer();
  const { multipleAnswers } = answers;

  return (
    <Stack spacing={1} justifyContent="space-between" direction="row">
      <Box>
        <Typography data-cy={MCQ_QUESTION_CY} sx={{ mb: 1 }} variant="h6">
          {question.label}
        </Typography>
        {multipleAnswers ? (
          <MultipleAnswers userAnswer={userAnswer} answersSettings={answers} />
        ) : (
          <SingleAnswer userAnswer={userAnswer} answersSettings={answers} />
        )}
      </Box>
      <Stack direction="column" spacing={1} alignItems="center">
        {userAnswer && (
          <>
            <Tooltip title={t('SUBMIT_OK_TOOLTIP')}>
              <Chip
                color="info"
                icon={<CheckCircleOutlineIcon />}
                label={t('SUBMIT_OK_HELPER')}
                variant="outlined"
              />
            </Tooltip>
            <Tooltip title={t('RESET_ANSWER')}>
              <IconButton onClick={() => deleteAnswer()}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default MCQView;
