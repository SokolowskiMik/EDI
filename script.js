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



async function getData2() {
    const response = await fetch(apiUrl);
    console.log(response);
    const data = await response.json();
    console.log(data);
    length = data.length;
    console.log(length);

    labels = [];
    values = [];
    for (i = 0; i < length; i++) {
        labels.push(data[i].imie);
        values.push(data[i].ranking);
    }
    new Chart(document.getElementById("bar-chart"), {
        
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "ranking",
                backgroundColor: "whitesmoke",
                data: values
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'ranking graczy'
            }
        }
    });

}

async function getData3() {
  const response = await fetch(apiUrl);
  console.log(response);
  const data = await response.json();
  console.log(data);
  length = data.length;
  console.log(length);

  labels = [];
  values = [];
  for (i = 0; i < length; i++) {
      labels.push(data[i].imie);
      values.push(data[i].wiek);
  }
  new Chart(document.getElementById("line-chart"), {
      
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: "wiek",
              backgroundColor: "whitesmoke",
              data: values
          }]
      },
  });

}