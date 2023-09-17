import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import apolloClient from './utils/apollo';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={apolloClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </ConfigProvider>,
);
