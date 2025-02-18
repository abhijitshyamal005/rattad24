import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const prompt = request.nextUrl.searchParams.get('prompt') || '';

  const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return new Response(JSON.stringify({ message: 'Failed to fetch data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contentType = res.headers.get('content-type');
    let generatedText = '';

    if (contentType?.includes('application/json')) {
      const data = await res.json();
      generatedText = data.text || '';
    } else {
      generatedText = await res.text();
    }

    const words = generatedText.split(' ');

    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
      start(controller) {
        async function sendChunks() {
          for (const word of words) {
            const chunk = `data: ${word}\n\n`;
            console.log('CHUNK->>>', chunk);
            controller.enqueue(new TextEncoder().encode(chunk));
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          controller.close();
        }
        sendChunks();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
