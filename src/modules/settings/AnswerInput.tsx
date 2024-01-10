import { ChangeEventHandler, FC } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { Answer, AnswerKey } from '@/interfaces/answers';

const AnswerInput: FC<{
  answer: Answer;
  setValueToggle: boolean;
  isKeyUnique: boolean;
  onChange: (answer: Answer) => void;
  onSelectDefault: (key: AnswerKey) => void;
}> = ({ setValueToggle, isKeyUnique, onChange, onSelectDefault, answer }) => {
  const { value, label, key } = answer;
  const onKeyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      ...answer,
      key: e.target.value,
    });
  };
  const onValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      ...answer,
      value: e.target.value,
    });
  };
  const onLabelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      ...answer,
      label: e.target.value,
    });
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <TextField value={key} onChange={onKeyChange} label="key" />
      </TableCell>
      {setValueToggle && (
        <TableCell>
          <TextField value={value} onChange={onValueChange} />
        </TableCell>
      )}
      <TableCell>
        <TextField value={label} onChange={onLabelChange} />
      </TableCell>
    </TableRow>
  );
};

export default AnswerInput;
