import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { AnswersSettings } from '@/config/appSettings';
import { SETTINGS_ANSWERS_ADD_BTN_CY } from '@/config/selectors';
import { Answer, AnswerKey, getNewAnswer } from '@/interfaces/answers';

import AnswerInput from './AnswerInput';

const AnswersSettingsEdit: FC<{
  answers: AnswersSettings;
  onChange: (newSetting: AnswersSettings) => void;
}> = ({ answers, onChange }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.ANSWERS',
  });

  const { defaultAnswer, multipleAnswers } = answers;

  const isDefault = (
    key: AnswerKey,
    defaultAns: AnswerKey[] | undefined,
  ): boolean => defaultAns?.includes(key) ?? false;

  const addNewAnswer = (): void => {
    onChange({
      ...answers,
      answers: [
        ...answers.answers,
        getNewAnswer({ key: answers.answers.length.toString() }),
      ],
    });
  };

  const handleAnswersChange = (a: Answer[]): void => {
    onChange({ ...answers, answers: a });
  };

  const handleMultipleAnswerChange = (
    _event: unknown,
    checked: boolean,
  ): void => {
    onChange({ ...answers, multipleAnswers: checked });
  };

  const handleSelectDefault = (key: AnswerKey, add: boolean): void => {
    // eslint-disable-next-line no-console, @typescript-eslint/no-unused-expressions
    add ? console.log('Add: ', key) : console.log('Remove: ', key);
    let newDef = [...defaultAnswer];
    if (add) {
      if (!multipleAnswers) {
        newDef = [];
      }
      newDef.push(key);
    } else {
      newDef = defaultAnswer.filter((a) => a !== key);
    }
    onChange({
      ...answers,
      defaultAnswer: newDef,
    });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">{t('TITLE')}</Typography>
      <FormControlLabel
        control={<Switch />}
        label={t('MULTIPLE_ANS_SWITCH_LABEL')}
        checked={multipleAnswers}
        onChange={handleMultipleAnswerChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="answers table">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                {t('DEFAULT_ANSWER_TABLE_HEAD')}
              </TableCell>
              <TableCell>{t('INPUT.KEY_LABEL')}</TableCell>
              <TableCell>{t('INPUT.ANSWER_LABEL')}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.answers.map((answer, index) => (
              <AnswerInput
                multipleAnswers={multipleAnswers}
                answer={answer}
                index={index}
                key={index}
                isKeyUnique
                onChange={(ans) => {
                  if (isDefault(answer.key, defaultAnswer)) {
                    handleSelectDefault(ans.key, true);
                  }
                  const a = [...answers.answers];
                  a[index] = ans;
                  handleAnswersChange(a);
                }}
                // eslint-disable-next-line react/jsx-no-bind, no-console
                onSelectDefault={(d) => handleSelectDefault(answer.key, d)}
                onDelete={(i) => {
                  const a = [...answers.answers];
                  a.splice(i, 1);
                  handleAnswersChange(a);
                }}
                selectDefault={isDefault(answer.key, defaultAnswer)}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  data-cy={SETTINGS_ANSWERS_ADD_BTN_CY}
                  startIcon={<AddIcon />}
                  onClick={addNewAnswer}
                >
                  {t('NEW_ANSWER_BTN')}
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default AnswersSettingsEdit;
