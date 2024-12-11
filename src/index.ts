const API_URL = 'https://api.sledge-app.com';

interface Env {
  settings: KVNamespace;
}

export default {
  async fetch(
    request: Request,
    env: Env, 
  ): Promise<Response> {
	const requestedUrl = new URL(request.url);
	const cacheUrl = new URL(`${API_URL}${requestedUrl.pathname}${requestedUrl.search}`);

    try {
      const processRequest = async () => {
        try {
          const response = await fetch(cacheUrl.toString());
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Simpan data ke KV
          await env.settings.put('last-response', JSON.stringify(data), {
            expirationTtl: 300 // 5 menit
          });

          return data;
        } catch (error) {
          return { 
            error: error instanceof Error ? error.message : 'Unknown error' 
          };
        }
      };

      // Proses dan dapatkan data
      const result: any = await processRequest();

      // Kembalikan respons
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: result?.error ? 500 : 200
      });

    } catch (error) {
      // Fallback ke data terakhir
      const fallbackData = await env.settings.get('last-response');
      
      return new Response(
        fallbackData || JSON.stringify({ 
          error: 'Gagal memproses permintaan',
          details: error instanceof Error ? error.message : 'Unknown error'
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
};

// Tambahan: Definisi event listener dengan tipe
addEventListener('fetch', (event) => {
  event.respondWith(
    // @ts-ignore
    handleRequest(event.request)
  );
});

// Fungsi handler request terpisah
async function handleRequest(request: Request): Promise<Response> {
  // Logika tambahan jika diperlukan
  return new Response('Request handled');
}