import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Typography } from '@mui/material';

import { QuestionSettings } from '@/config/appSettings';

const QuestionSettingsEdit: FC<{
  question: QuestionSettings;
  onChange: (newSetting: QuestionSettings) => void;
}> = ({ question, onChange }) => {
  const { t } = useTranslation();
  const { label: questionLabel } = question;
  return (
    <>
      <Typography variant="h2">{t('SETTINGS.QUESTION.TITLE')}</Typography>
      <TextField
        value={questionLabel}
        onChange={(e) => onChange({ label: e.target.value })}
      />
    </>
  );
};

export default QuestionSettingsEdit;
