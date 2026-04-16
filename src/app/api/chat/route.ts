import { NextResponse } from 'next/server';
import { NETWORKTIC_KNOWLEDGE } from '@/lib/knowledge-base';

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
        max_tokens: 150,
        messages: [
          {
            role: 'system',
            content: "REGLA PRINCIPAL: Responde SIEMPRE en máximo 2 frases cortas. Sin listas, sin guiones, sin asteriscos. Solo texto plano conversacional.\n\n" + NETWORKTIC_KNOWLEDGE
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
