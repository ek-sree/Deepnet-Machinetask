import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>,
)