import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/font.css'
import 'font-awesome/css/font-awesome.css'
import 'antd/dist/antd.css'
import App from './App';  
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
    <Provider store={store} >
        <App />
    </Provider>
)

