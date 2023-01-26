import './App.scss';
import { Container } from '@mui/system';
import { Content } from './components/Content';

export const App: React.FC = () => {
  return (
    <Container sx={{ margin: '80px auto' }}>
      <Content />
    </Container>
  );
};
