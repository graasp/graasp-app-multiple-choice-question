import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AnswersSettings, QuestionSettings } from '@/config/appSettings';

import { useSettings } from '../context/SettingsContext';
import AnswersSettingsEdit from './AnswersSettings';
import QuestionSettingsEdit from './QuestionSettings';

const SettingsView: FC = () => {
  const { t } = useTranslation();
  const { question: questionSavedState, answers: answersSavedState } =
    useSettings();

  const [question, setQuestion] =
    useState<QuestionSettings>(questionSavedState);
  const [answers, setAnswers] = useState<AnswersSettings>(answersSavedState);

  useEffect(() => setQuestion(questionSavedState), [questionSavedState]);
  useEffect(() => setAnswers(answersSavedState), [answersSavedState]);

  return (
    <Stack spacing={1}>
      <Typography variant="h1">{t('SETTINGS.TITLE')}</Typography>
      <QuestionSettingsEdit
        question={question}
        onChange={(newSetting: QuestionSettings) => {
          setQuestion(newSetting);
        }}
      />
      <AnswersSettingsEdit
        answers={answers}
        onChange={(newSetting: AnswersSettings) => {
          setAnswers(newSetting);
        }}
      />
      <Box>
        <Button>{t('SETTINGS.SAVE_BTN')}</Button>
      </Box>
      {/* <GeneralSettings /> */}
    </Stack>
  );
};

export default SettingsView;
