export async function onRequest(context) {
  const url = new URL(context.request.url);
  console.log('Requested URL:', url.toString());

  if (url.pathname === '/') {
    console.log('Serving index.html');
    return context.env.ASSETS.fetch(context.request);
  } else {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxXOicAa6Ro0s-Z3xrXp_4HJJe7UTqi8EhGH0OAZBqjpqe4HJDvbfrnX1RNr_yoptBi/exec';
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
