import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Typography, styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { UserAnswerAppData } from '@/config/appData';
import { UserAnswerStatus } from '@/interfaces/userAnswer';

import SavedChip from '../common/SavedChip';
import SubmittedChip from '../common/SubmittedChip';
import { useSettings } from '../context/SettingsContext';

const BoldWord = styled('span')({
  fontWeight: 'bold',
});
const ItalicText = styled(Typography)({
  fontStyle: 'italic',
});

const UserAnswerRow: FC<{
  userAnswerAppData: UserAnswerAppData;
}> = ({ userAnswerAppData }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'ANSWERS.TABLE.ROW',
  });
  const { answers } = useSettings();
  const { multipleAnswers } = answers;
  const { singleKey, multipleKey, status } = userAnswerAppData.data;

  const getLabels = (): JSX.Element => {
    if (multipleAnswers) {
      const ans = answers.answers.filter((a) => multipleKey?.includes(a.key));
      return (
        <ul>
          {ans.map((a) => (
            <li key={a.key}>{a.label}</li>
          ))}
        </ul>
      );
    }
    const label = answers.answers.find((a) => a.key === singleKey)?.label;
    return <p>{label}</p>;
  };

  const getStatus = (): JSX.Element => {
    if (status === UserAnswerStatus.Saved) {
      return <SavedChip />;
    }
    if (status === UserAnswerStatus.Submitted) {
      return <SubmittedChip />;
    }
    return <ItalicText>{t('NO_STATUS')}</ItalicText>;
  };

  const labels = getLabels();
  return (
    <TableRow>
      <TableCell>{userAnswerAppData.creator?.name}</TableCell>
      <TableCell>
        {multipleAnswers ? multipleKey?.toString() : singleKey}
      </TableCell>
      <TableCell>
        {labels ?? (
          <Alert severity="warning">
            <ItalicText variant="body1">
              {t('KEY_ERASED_WARNING.STRING_1')}
              <BoldWord>{singleKey}</BoldWord>
              {t('KEY_ERASED_WARNING.STRING_2')}
            </ItalicText>
          </Alert>
        )}
      </TableCell>
      <TableCell>{getStatus()}</TableCell>
    </TableRow>
  );
};

export default UserAnswerRow;
