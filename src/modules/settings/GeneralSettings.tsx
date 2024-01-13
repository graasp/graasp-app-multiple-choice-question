// import { FC } from 'react';
// import { useTranslation } from 'react-i18next';

// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import { GeneralSettings } from '@/config/appSettings';

// const QuestionSettingsEdit: FC<{
//   general: GeneralSettings;
//   onChange: (newSetting: GeneralSettings) => void;
// }> = ({ general, onChange }) => {
//   const { t } = useTranslation('translations', {keyPrefix: 'SETTINGS.GENERAL'});
//   const { required } = general;
//   return (
//     <Stack spacing={1}>
//       <Typography variant="h2">{t('TITLE')}</Typography>
//       <TextField
//         value={questionLabel}
//         onChange={(e) => onChange({ label: e.target.value })}
//       />
//     </Stack>
//   );
// };

// export default QuestionSettingsEdit;
