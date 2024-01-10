import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { AnswersSettings } from '@/config/appSettings';
import { Answer, getEmptyAnswer } from '@/interfaces/answers';

import AnswerInput from './AnswerInput';

const AnswersSettingsEdit: FC<{
  answers: AnswersSettings;
  onChange: (newSetting: AnswersSettings) => void;
}> = ({ answers, onChange }) => {
  const { t } = useTranslation();
  const addNewAnswer = (): void => {
    onChange({ answers: [...answers.answers, getEmptyAnswer()] });
  };
  return (
    <>
      <Typography variant="h2">{t('SETTINGS.ANSWERS.TITLE')}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="answers table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Default answer</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.answers.map((answer) => (
              <AnswerInput
                answer={answer}
                key={answer.key}
                setValueToggle={false}
                isKeyUnique
                // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-shadow
                onChange={function (answer: Answer): void {
                  throw new Error('Function not implemented.');
                }}
                // eslint-disable-next-line react/jsx-no-bind
                onSelectDefault={function (key: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button onClick={addNewAnswer}>New answer</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default AnswersSettingsEdit;
