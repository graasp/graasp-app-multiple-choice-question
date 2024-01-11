import Container from '@mui/material/Container';

import { PLAYER_VIEW_CY } from '@/config/selectors';

import MCQView from '../mcq/MCQView';

const PlayerView = (): JSX.Element => (
  <Container data-cy={PLAYER_VIEW_CY}>
    <MCQView />
  </Container>
);
export default PlayerView;
