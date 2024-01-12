import { ChangeEventHandler, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import {
  makeSettingsAnswersInputKeyCy,
  makeSettingsAnswersRowCy,
} from '@/config/selectors';
import { Answer } from '@/interfaces/answers';

const AnswerInput: FC<{
  answer: Answer;
  index: number;
  isKeyUnique: boolean;
  onChange: (answer: Answer) => void;
  selectDefault: boolean;
  onSelectDefault: (checked: boolean) => void;
  onDelete: (index: number) => void;
  multiDefaults?: boolean;
}> = ({
  isKeyUnique,
  onChange,
  onSelectDefault,
  answer,
  index,
  onDelete,
  selectDefault,
  multiDefaults = false,
}) => {
  const { label, key } = answer;
  const { t } = useTranslation('translations', {
    keyPrefix: 'SETTINGS.ANSWERS.INPUT',
  });
  const onKeyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      ...answer,
      key: e.target.value,
    });
  };
  const onLabelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      ...answer,
      label: e.target.value,
    });
  };
  const getKeyTextFieldColor = (): 'error' | 'warning' | undefined => {
    if (key.length > 0) {
      return isKeyUnique ? undefined : 'error';
    }
    return 'warning';
  };
  const keyTextFieldColor = useMemo(getKeyTextFieldColor, [key, isKeyUnique]);
  const keyHelperText = useMemo(() => {
    if (keyTextFieldColor === 'warning') {
      return t('KEY_HELP_WARNING');
    }
    if (keyTextFieldColor === 'error') {
      return t('KEY_HELP_ERROR');
    }
    return ' ';
  }, [keyTextFieldColor, t]);
  const isKeyValid = useMemo(() => key?.length > 0, [key]);
  return (
    <TableRow data-cy={makeSettingsAnswersRowCy(index)}>
      <TableCell align="right" padding="checkbox">
        {multiDefaults ? (
          <Checkbox
            checked={selectDefault}
            onChange={(e) => {
              onSelectDefault(e.target.checked);
            }}
            disabled={!isKeyValid}
          />
        ) : (
          <Radio
            checked={selectDefault}
            onChange={(e) => {
              onSelectDefault(e.target.checked);
            }}
            disabled={!isKeyValid}
          />
        )}
      </TableCell>
      <TableCell>
        <TextField
          inputProps={{
            'data-cy': makeSettingsAnswersInputKeyCy(index),
          }}
          value={key}
          color={keyTextFieldColor}
          onChange={onKeyChange}
          label={t('KEY_LABEL')}
          helperText={keyHelperText}
        />
      </TableCell>
      <TableCell sx={{ width: '50%' }}>
        <TextField
          fullWidth
          value={label}
          label={t('ANSWER_LABEL')}
          onChange={onLabelChange}
          helperText=" "
        />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            onDelete(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AnswerInput;
