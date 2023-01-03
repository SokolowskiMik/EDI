const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80';
// const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=25ccbe90';


// pokazanie wybranej ilosci danych
async function no_elements() {
    let number = parseInt(prompt("How many results (out of 100)?")); 
    getData(number);
}

// kolory
let colors = [
    "#22223B",
    "#4A4E69",
    "#9A8C98",
    "#C9ADA7",
    "#F2E9E4"
]

// genruje liste kolorow w losowej kolejnosci
let randomColor = []
for (let i = 0; i < 100; i++) {
    let index = Math.floor(Math.random() * colors.length);
    randomColor.push(colors[index])
}

// wyswietlenie Tabeli oraz wykresów
async function getData(x) {

    // pobranie danych
    const response = await fetch(apiUrl);
    const data = await response.json();

    // tworzenie tabeli
    let table = '<table><tr><th>Ranking</th><th>Imie</th><th>Nazwisko</th><th>Plec</th><th>Pochodzenie</th><th>Wiek</th><th>Pseudonim</th><th>Wygrane partie</th><th>Przegrane partie</th></tr>';
    for (let i = 0; i < x; i++) {
        const item = data[i];
        if (item) {
            table += `<tr><td>${item.ranking}</td><td>${item.imie}</td><td>${item.nazwisko}</td><td>${item.plec}</td><td>${item.pochodzenie}</td><td>${item.wiek}</td><td>${item.pseudonim}</td><td>${item.wygrane_partie}</td><td>${item.przegrane_partie}</td></tr>`;
        }
    }
    table += '</table>';

    // przekazanie tabeli
    document.getElementById('zawodnicy').innerHTML = table

    // tworzenie dancyh do wykrsów 
    labels = [];
    values = [];
    for (i = 0; i < x; i++) {
        labels.push(data[i].pseudonim);
        values.push(data[i].wygrane_partie);
    }

    // ustawienia wykresu slupkowego
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "wygrane partie",
                backgroundColor: randomColor,
                data: values,
                borderColor: "black",
                borderWidth: 1
            }]
        },
        options: {
            layout: { padding: 10 },
            legend: {
                display: true,
                labels: {
                        fontSize: 14,
                        fontColor: "#f8f9fa"
                }
            },

            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "#f8f9fa"
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#f8f9fa"
                    }
                }]
            }
        }
    });
    

    // Ustawienia wykresu liniowego
    new Chart(document.getElementById("line-chart"), {


        options: {

            layout: { padding: 10 },

            legend: {
                labels: {
                    fontColor: "#f8f9fa",
                    fontSize: 14,
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "#f8f9fa"
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#f8f9fa"
                    }
                }]
            }

        },

        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "wiek",
                backgroundColor: "#4A4E69",
                data: values

                

            }]
        },
    });

}