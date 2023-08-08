/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_SUPABASE_URL: string;
    REACT_APP_SUPABASE_BASE_KEY: string;
    REACT_APP_SUPABASE_SERVICE_KEY: string;
  }
}
