import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalStyle } from './styles/GlobalStyles';
import { ConfigProvider, ThemeConfig, theme } from 'antd';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});
const { useToken } = theme;

const config: ThemeConfig = {
  token: {
    colorPrimary: '#C12D2D',
    colorText: '#160E0E',
    colorBgBase: '#FBFBFB',
  },
};

const App: React.FC = (): JSX.Element => {
  useToken();
  return (
    <ConfigProvider theme={config}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Provider store={store}>
          <Router />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
