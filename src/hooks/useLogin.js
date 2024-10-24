import { createClient } from '@supabase/supabase-js';

// Supabase URL과 API 키를 환경 변수에서 가져옵니다.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_API_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 소셜 로그인 함수
 * @param {string} provider - 소셜 로그인 공급자 (google, facebook, kakao 등)
 * @returns {Promise<void>}
 */
export const signInWithProvider = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        console.error('로그인 오류:', error.message);
        throw error; // 에러를 호출한 곳으로 전달
    }

    console.log('로그인 성공:', data);
};

// Supabase 클라이언트를 외부에서 사용하기 위해 export
export { supabase };
