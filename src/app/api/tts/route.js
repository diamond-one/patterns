export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const lang = searchParams.get('lang') || 'tr'; // Default to tr but should be passed
    const map = {
        'cs': 'cs-CZ',
        'ja': 'ja-JP',
        'tr': 'tr-TR'
    };
    const tl = map[lang] || map.tr;

    if (!text) {
        return new Response('Text parameter is required', { status: 400 });
    }

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(text)}`;

    try {
        // Mock user agent to ensure Google accepts the request
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            return new Response(`Error fetching from Google TTS: ${response.status}`, { status: response.status });
        }

        const audioBuffer = await response.arrayBuffer();

        return new Response(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=86400, mutable'
            },
        });
    } catch (error) {
        return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}
