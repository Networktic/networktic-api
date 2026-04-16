import { NextResponse } from 'next/server';

// Configuración de encabezados CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handler para la solicitud de preflight CORS (método OPTIONS)
export async function OPTIONS(req: Request) {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Llama OpenRouter
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          {
            role: 'system',
            content: `Eres el asistente virtual oficial de NetworkTIC, empresa colombiana especializada en Inteligencia Artificial, IoT (Internet de las Cosas), AIoT, Smart Buildings, Ciberseguridad y Transformación Digital con sede en Yopal, Casanare, Colombia.

SERVICIOS DE NETWORKTIC:
- Inteligencia Artificial Empresarial
- IoT y sensores industriales  
- AIoT (Inteligencia Artificial + IoT)
- Smart Buildings y edificios inteligentes
- Ciberseguridad
- Edge Computing
- Transformación Digital
- Agricultura de precisión (AGRICULTIC)
- Sistemas de riego inteligente
- Monitoreo ambiental con LoRaWAN

PRODUCTOS:
- AGRICULTIC: Sistema de riego inteligente con sensores IoT
- PINENITRAPREDICT: Predicción de nutrientes en cultivos
- FERTIRRIEGO APP: Aplicación de fertirriego automatizado

DATOS DE CONTACTO:
- Web: networktic.com
- Email: ventasnetworktic@gmail.com

Responde siempre en español, de forma profesional y técnica pero clara. 
Si te preguntan por precios o cotizaciones, invita al usuario a contactar al equipo comercial. No inventes información que no esté en este contexto.`
          },
          { role: 'user', content: message }
        ]
      })
    });
    
    const data = await openRouterResponse.json();
    let reply = "";
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    } else {
      console.error("Error from OpenRouter:", data);
      reply = `Hubo un error con la respuesta del modelo. Detalles: ${JSON.stringify(data.error || data)}`;
    }

    // Guarda en Supabase
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ user_message: message, ai_reply: reply })
      });
    }

    return NextResponse.json({ reply }, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500, headers: corsHeaders });
  }
}
