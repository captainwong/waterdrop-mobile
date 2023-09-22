import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import apolloClient from './utils/apollo';
import './theme.css';
import { ROUTES } from './routes/routes';
import { ROUTE_COMPONENTS } from './routes';
import StudentInfo from './components/userInfo/StudentInfo';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <StudentInfo>
          <Routes>
            {ROUTES.map((route) => {
              const Page = ROUTE_COMPONENTS[route.key];
              return (
                <Route
                  key={route.key}
                  path={`/${route.path}`}
                  element={<Page />}
                />
              );
            })}
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
