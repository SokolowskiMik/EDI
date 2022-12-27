const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80'; // replace with your API URL

async function getData() {
  try {
    // make the API call and parse the response as JSON
    const response = await fetch(apiUrl);
    const data = await response.json();

    // create an HTML table
    let table = '<table><tr><th>Ranking</th><th>Imie</th><th>Nazwisko</th><th>Plec</th><th>Pochodzenie</th><th>Wiek</th><th>Pseudonim</th><th>Wygrane partie</th><th>Przegrane partie</th></tr>';
    
    // loop through the data and add rows to the table
    for (let item of data) {
      table += `<tr><td>${item.ranking}</td><td>${item.imie}</td><td>${item.nazwisko}</td><td>${item.plec}</td><td>${item.pochodzenie}</td><td>${item.wiek}</td><td>${item.pseudonim}</td><td>${item.wygrane_partie}</td><td>${item.przegrane_partie}</td></tr>`;
    }
    table += '</table>';

    // insert the table into the DOM
    document.getElementById('zawodnicy').innerHTML = table;
  } catch (error) {
    // handle any errors
    console.error(error);
  }
}

// call the getData function