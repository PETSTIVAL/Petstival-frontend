import { createClient } from '@supabase/supabase-js';

// Supabase URL과 API 키를 환경 변수에서 가져옴
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_API_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_ROLE_KEY;

// Supabase 클라이언트 생성
const supabasAdmin = createClient(SUPABASE_URL, SUPABASE_KEY);

// Supabase 클라이언트 export
export default supabasAdmin;
