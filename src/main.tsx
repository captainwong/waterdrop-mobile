import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import apolloClient from './utils/apollo';
import { ROUTES } from './routes/routes';
import { ROUTE_COMPONENTS } from './routes';
import StudentInfo from './components/userInfo/StudentInfo';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import App from './App';
import './theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <StudentInfo>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<App />}>
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
            </Route>
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
