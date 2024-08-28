export async function onRequest(context) {
  const url = new URL(context.request.url);
  console.log('Requested URL:', url.toString());

  if (url.pathname === '/') {
    console.log('Serving index.html');
    return context.env.ASSETS.fetch(context.request);
  } else {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzJqbUtTRV6r0OxfJQTWnYejo7BMX9d1k1rezXbWow4sHMoMWWvadEwunv9T8TA4HO-/exec';
    const newUrl = new URL(scriptUrl);
    newUrl.searchParams.set('path', url.pathname);
    console.log('Redirecting to:', newUrl.toString());
    const response = await fetch(newUrl, {
      headers: {
        'X-Frame-Options': 'ALLOWALL'
      }
    });
    const html = await response.text();
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
