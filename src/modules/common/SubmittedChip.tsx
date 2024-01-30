import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const SubmittedChip: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  return (
    <Tooltip title={t('SUBMIT_OK_TOOLTIP')}>
      <Chip
        color="info"
        icon={<CheckCircleOutlineIcon />}
        label={t('SUBMIT_OK_HELPER')}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default SubmittedChip;
