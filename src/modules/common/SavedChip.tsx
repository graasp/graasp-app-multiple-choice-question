import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import BackupIcon from '@mui/icons-material/Backup';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const SavedChip: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'MCQ' });
  return (
    <Tooltip title={t('SAVED_TOOLTIP')}>
      <Chip
        icon={<BackupIcon />}
        label={t('SAVED_HELPER')}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default SavedChip;
