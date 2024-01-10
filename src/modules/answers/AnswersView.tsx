import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

const AnswersView: FC = () => {
  const { t } = useTranslation();
  return <Typography variant="h1">{t('ANSWERS.TITLE')}</Typography>;
};

export default AnswersView;
