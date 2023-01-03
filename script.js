const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80';
// const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=25ccbe90';


// pokazanie wybranej ilosci danych
async function no_elements() {
    let number = parseInt(prompt("How many results (out of 100)?")); 
    getData(number);
}

// zamienia liste w slownik
function counter(arr) {
    const count = {"male": 0, "female": 0};
    arr.forEach(item => {
      if (item in count) {
        count[item] += 1;
      } else {
        count[item] = 1;
      }
    });
    return count;
  }

// ile dziesiatek lat
function ages(arr) {
    const count = {
        "10's": 0,
        "20's": 0,
        "30's": 0,
        "40's": 0,
        "50's": 0,
        "60's+": 0,
    };

    arr.forEach(item => {
        if (item >= 10 && item < 20) {
        count["10's"] += 1;
        } else if (item >= 20 && item < 30) {
        count["20's"] += 1;
        } else if (item >= 30 && item < 40) {
        count["30's"] += 1;
        } else if (item >= 40 && item < 50) {
        count["40's"] += 1;
        } else if (item >= 50 && item < 60) {
        count["50's"] += 1;
        } else if (item >= 60) {
        count["60's+"] += 1;
        }
    });
    return count;
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

    // tworzenie dancyh do wykresów 
    labels1 = [];
    values1 = [];

    labels2 = [];
    values2 = [];

    values3 = [];

    values4 = [];

    for (i = 0; i < x; i++) {
        labels1.push(data[i].pseudonim);
        values1.push(data[i].wygrane_partie);

        labels2.push(data[i].pseudonim);
        values2.push(data[i].przegrane_partie);

        values3.push(data[i].plec);

        values4.push(data[i].wiek);
    }


    // wykres slupkowy
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: labels1,
            datasets: [{
                label: "wygrane partie",
                backgroundColor: randomColor,
                data: values1,
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
    
    // wykres liniowy
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
            labels: labels2,
            datasets: [{
                label: "przegrane partie",
                backgroundColor: "#4A4E69",
                data: values2

                

            }]
        },
    });

    // wykres donut
    values3 = counter(values3)
    new Chart(document.getElementById("donut-chart"), {

        options: {
            layout: { padding: 10 },
            legend: {
                labels: {
                    fontColor: "#f8f9fa",
                    fontSize: 14,
                }
            },

        },

        type: 'doughnut',
        data: {

            labels: Object.keys(values3),
            datasets: [{
                backgroundColor: [
                    "#22223B",
                    "#4A4E69",
                    "#9A8C98",
                    "#C9ADA7",
                    "#F2E9E4",
                    "#22223B",
                    "#4A4E69",
                    "#9A8C98",
                    "#C9ADA7",
                    "#F2E9E4",
                ],
                data: Object.values(values3)

            }]
        },
    });

    // wykres ciasto
    values4 = ages(values4)
    new Chart(document.getElementById("pie-chart"), {

        options: {
            layout: { padding: 10 },
            legend: {
                labels: {
                    fontColor: "#f8f9fa",
                    fontSize: 14,
                }
            },

        },

        type: 'pie',
        data: {

            labels: Object.keys(values4),
            datasets: [{
                backgroundColor: colors,
                data: Object.values(values4)

            }]
        },
    });
        


}