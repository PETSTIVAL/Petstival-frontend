import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const widgetSecretKey = Deno.env.get('WIDGET_SECRET_KEY');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method === "POST" &&  req.url === "http://edge-runtime.supabase.com/payment") {
    const { paymentKey, orderId, amount } = await req.json();
    const encryptedSecretKey = "Basic " + btoa(widgetSecretKey + ":");

    try {
      const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, amount, paymentKey }),
      });

        // data.json()으로 받아서 비동기 처리를 해줘야 한다.
        const data = await response.json();
        console.log(data);
        
        // 결제 성공 비즈니스 로직을 구현

        // 결제 상태 확인
      if (!data.mId) { // 결제 성공 여부 확인
        const errorInfo = { code: data.code || "UNKNOWN_ERROR", message: data.message || "An error occurred" }; // 에러 정보 객체 생성
        throw { ...errorInfo }; // 사용자 정의 에러 객체 던지기
      }
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      const errorCode = error.code || "UNKNOWN_ERROR"; // 사용자 정의 에러 객체에서 code 가져오기
      const errorMessage = error.message || "An error occurred"; // 사용자 정의 에러 객체에서 message 가져오기

      return new Response(JSON.stringify({
        code: errorCode,
        message: errorMessage
      }), {
        status: 200, // 적절한 상태 코드로 수정
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});