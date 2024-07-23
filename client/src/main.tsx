import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import Container from './container.tsx'; 
import Cursor from './components/widgets/cursor.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Container>
            <Cursor/>
            <App />
        </Container>
    </Provider>
);
