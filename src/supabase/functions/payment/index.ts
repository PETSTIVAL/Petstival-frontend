import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const widgetSecretKey = Deno.env.get('WIDGET_SECRET_KEY');

Deno.serve(async (req) => {
  console.log(req.method);

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    console.log('CORS preflight request received');
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://petstival.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Handle the actual POST request
  if (req.method === "POST" && req.url.includes("/payment")) {
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

      const data = await response.json();
      console.log(data);

      // CORS headers should be included in every response
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://petstival.vercel.app',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          code: error.code || "UNKNOWN_ERROR",
          message: error.message || "An error occurred",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});
