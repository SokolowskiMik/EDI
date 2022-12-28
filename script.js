// const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80';
const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=25ccbe90';
let y = 0
async function getData(x) {
    try {

        y += 1
        const response = await fetch(apiUrl);
        const data = await response.json();

        let table = '<table><tr><th>Ranking</th><th>Imie</th><th>Nazwisko</th><th>Plec</th><th>Pochodzenie</th><th>Wiek</th><th>Pseudonim</th><th>Wygrane partie</th><th>Przegrane partie</th></tr>';

        for (let i = 0; i < x + 5 * y; i++) {
            const item = data[i];
            if (item) {
                table += `<tr><td>${item.ranking}</td><td>${item.imie}</td><td>${item.nazwisko}</td><td>${item.plec}</td><td>${item.pochodzenie}</td><td>${item.wiek}</td><td>${item.pseudonim}</td><td>${item.wygrane_partie}</td><td>${item.przegrane_partie}</td></tr>`;
            }
        }

        table += '</table>';

        document.getElementById('zawodnicy').innerHTML = table;
    } catch (error) {
        console.error(error);

    }
}