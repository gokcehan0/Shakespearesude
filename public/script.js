document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    if (!query.trim()) return;

    if (query.toLowerCase().includes('asude')) {
        document.getElementById('search-results').innerHTML = '<h1 class="text-2xl font-bold mb-2 text-red-500">askim</h1> <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4QxDOjgpYtQDxxbWPuEJOy?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
        return; 
    }
    if (query.toLowerCase().includes('askim')) {
        document.getElementById('search-results').innerHTML = '<h1 class="text-2xl font-bold mb-2 text-red-500">asu</h1> ';
        return; 
    }
    document.getElementById('random-sonnet-result').innerHTML = '';

    const response = await fetch(`/search?query=${query}`);
    const data = await response.json();
    let resultsHtml = '';

    data.results.forEach(result => {
        resultsHtml += `
        <div class="mb-4">
            <h1 class="text-2xl font-bold mb-2">Sonnet</h1>
            <p class="italic mb-2">"${result.line}"</p>
            <h1 class="text-2xl font-bold mb-2">Title</h1>
            <p class="font-bold mb-2">"${result.title} (Line ${result.sonnetLineIndex + 1})"</p>
            <h1 class="text-2xl font-bold mb-2">Sonnet</h1>
            <pre class="mt-2 whitespace-pre-wrap mb-2">${result.sonne.join('\n')}</pre>
        </div>
        `;
    });

    document.getElementById('search-results').innerHTML = resultsHtml || '<h1 class="text-2xl font-bold mb-2">asudecım</h1>';
});

async function getRandomSonnet() {
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-query').value = '';

    const response = await fetch('/apisude');
    const data = await response.json();
    const resultDiv = document.getElementById('random-sonnet-result');
    resultDiv.innerHTML = `
        <h1 class="text-2xl font-bold mb-2">Sonnet</h1>
        <p class="italic mb-2">"${data.line}"</p>
        <h1 class="text-2xl font-bold mb-2">Title</h1>
        <p class="font-bold mb-2">${data.title}</p>
        <h1 class="text-2xl font-bold mb-2">Sonnet</h1>
        <pre class="mt-2 whitespace-pre-wrap mb-2">${data.sonne.join('\n')}</pre>
    `;
}
