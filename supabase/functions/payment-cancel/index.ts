import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const widgetSecretKey = Deno.env.get('WIDGET_SECRET_KEY');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method === "POST" && req.url.endsWith("/payment-cancel")) {
    try {
      const { paymentKey } = await req.json();

      const encryptedSecretKey = "Basic " + btoa(widgetSecretKey + ":");

      const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancelReason: "고객 변심" }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.status === 'CANCELED') {
        return new Response(JSON.stringify({ message: "Payment cancelled successfully", data }), {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      } else {
        return new Response(JSON.stringify({
          code: data.code || "UNKNOWN_ERROR",
          message: data.message || "Cancellation failed",
        }), {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        code: "SERVER_ERROR",
        message: error.message || "An internal error occurred",
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }
  }
  return new Response("Method Not Allowed", { status: 405 });
});