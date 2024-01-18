import ReactDOM from 'react-dom/client'
import {App} from './app/App'
import './boilerplate.scss'
import {Provider} from "react-redux";
import {store} from "./app/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
