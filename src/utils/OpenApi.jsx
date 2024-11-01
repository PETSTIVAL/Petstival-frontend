import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 URL 및 API 키 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Open API URL 목록
const apiUrls = [
  import.meta.env.VITE_API_URL1,
  import.meta.env.VITE_API_URL2,
];

console.log("Supabase URL:", supabaseUrl); // Supabase URL 확인
console.log("Supabase Key:", supabaseKey); // Supabase Key 확인
console.log("API URLs:", apiUrls); // API URL 목록 확인

const OpenApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // 각 API에서 데이터 가져오기
  const fetchDataFromAPIs = async () => {
    try {
      const allData = [];

      for (const apiUrl of apiUrls) {
        console.log(`Fetching data from: ${apiUrl}`); // 요청 URL 출력
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch data from API: ${apiUrl} (status: ${response.status})`);
        }

        const data = await response.json().catch((error) => {
          console.error("JSON 파싱 오류:", error); // JSON 파싱 오류 확인
          throw new Error("응답이 JSON 형식이 아닙니다. 응답 내용을 확인하세요.");
        });
        
        console.log(`API 응답 데이터 (${apiUrl}):`, data); // 응답 데이터 전체 출력

        // API 응답 구조에서 필요한 데이터만 추출
        const items = data.response?.body?.items?.item || [];
        if (items.length === 0) {
          console.warn(`No items found in API response from ${apiUrl}`);
        }

        allData.push(...items);
      }

      console.log("모든 API 데이터:", allData); // 전체 데이터 출력
      return allData;
    } catch (error) {
      console.error('API 데이터 가져오기 오류:', error);
      setError(`API 데이터 가져오기 오류: ${error.message}`);
      return [];
    }
  };

  // Supabase에 데이터 삽입하기
  const insertDataToSupabase = async (data) => {
    try {
      const uniqueData = [];

      for (let item of data) {
        const { data: existingData, error } = await supabase
          .from('festivals')
          .select('title')
          .eq('title', item.title);

        if (error) throw error;

        if (existingData.length === 0) {
          uniqueData.push({
            title: item.title,
            tel: item.tel,
            mapx: item.mapx,
            mapy: item.mapy,
            firstimage: item.firstimage,
            addr1: item.addr1,
            modifiedtime: item.modifiedtime.substring(0, 8),
          });
        }
      }

      if (uniqueData.length > 0) {
        const { error: insertError } = await supabase
          .from('festivals')
          .insert(uniqueData);

        if (insertError) throw insertError;
        console.log('Data inserted successfully:', uniqueData);
        setMessage('Supabase에 데이터가 성공적으로 삽입되었습니다!');
      } else {
        setMessage('삽입할 새로운 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('Supabase 데이터 삽입 오류:', error);
      setError(error.message);
      setMessage('');
    }
  };

  // 버튼 클릭 시 API 호출 및 데이터베이스 삽입
  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    
    const data = await fetchDataFromAPIs();

    if (data.length > 0) {
      console.log("Fetched data to insert:", data); // 가져온 데이터 출력
      await insertDataToSupabase(data);
    } else {
      console.error("삽입할 데이터가 없습니다. API 응답이 빈 값이거나 잘못된 값일 수 있습니다.");
    }
    
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? '로딩 중...' : 'API에서 데이터 가져와서 Supabase에 삽입'}
      </button>
      {error && <p style={{ color: 'red' }}>오류: {error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default OpenApi;