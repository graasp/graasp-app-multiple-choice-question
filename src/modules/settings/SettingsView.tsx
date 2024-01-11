import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import isEqual from 'lodash.isequal';

import { AnswersSettings, QuestionSettings } from '@/config/appSettings';

import { useSettings } from '../context/SettingsContext';
import AnswersSettingsEdit from './AnswersSettings';
import QuestionSettingsEdit from './QuestionSettings';

const SettingsView: FC = () => {
  const { t } = useTranslation();
  const {
    question: questionSavedState,
    answers: answersSavedState,
    saveSettings,
  } = useSettings();

  const [question, setQuestion] =
    useState<QuestionSettings>(questionSavedState);
  const [answers, setAnswers] = useState<AnswersSettings>(answersSavedState);

  const saveAllSettings = (): void => {
    saveSettings('question', question);
    saveSettings('answers', {
      ...answers,
      answers: answers.answers.filter((answer) => {
        if (answer?.key.length > 0) {
          return true;
        }
        return false;
      }),
    });
  };
  // eslint-disable-next-line no-console
  console.log('Answers: ', answers);

  useEffect(() => setQuestion(questionSavedState), [questionSavedState]);
  useEffect(() => {
    setAnswers(answersSavedState);
    // eslint-disable-next-line no-console
    console.log(answersSavedState);
  }, [answersSavedState]);

  const disableSave = useMemo(() => {
    if (
      isEqual(questionSavedState, question) &&
      isEqual(answersSavedState, answers)
    ) {
      return true;
    }
    return false;
  }, [answers, answersSavedState, question, questionSavedState]);

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
          setAnswers({ ...newSetting });
          // eslint-disable-next-line no-console
          console.log('Change the answers setting: ', newSetting);
        }}
      />
      <Box>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={saveAllSettings}
          disabled={disableSave}
        >
          {t('SETTINGS.SAVE_BTN')}
        </Button>
      </Box>
      {/* <GeneralSettings /> */}
    </Stack>
  );
};

export default SettingsView;
