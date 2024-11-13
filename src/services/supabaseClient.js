import { createClient } from '@supabase/supabase-js';

// Supabase URL과 API 키를 환경 변수에서 가져옴
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_API_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{
   auth: {
        storage: sessionStorage, // 세션 스토리지에 저장
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        sessionStorage.setItem('access_token', session.access_token);
        sessionStorage.setItem('refresh_token', session.refresh_token);
    } else if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
    }
});

// Supabase 클라이언트 export
export default supabase;
