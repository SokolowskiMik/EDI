const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80';
// const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=25ccbe90';

async function getData(x) {

    const response = await fetch(apiUrl);
    console.log(response)
    const data = await response.json();

    let table = '<table><tr><th>Ranking</th><th>Imie</th><th>Nazwisko</th><th>Plec</th><th>Pochodzenie</th><th>Wiek</th><th>Pseudonim</th><th>Wygrane partie</th><th>Przegrane partie</th></tr>';

    for (let i = 0; i < x; i++) {
        const item = data[i];
        if (item) {
            table += `<tr><td>${item.ranking}</td><td>${item.imie}</td><td>${item.nazwisko}</td><td>${item.plec}</td><td>${item.pochodzenie}</td><td>${item.wiek}</td><td>${item.pseudonim}</td><td>${item.wygrane_partie}</td><td>${item.przegrane_partie}</td></tr>`;
        }
    }

    table += '</table>';

    document.getElementById('zawodnicy').innerHTML = table

}

async function no_elements() {
    let number = parseInt(prompt("How many elements:"));
    getData(number);
}

let colors = [
    "#22223B",
    "#4A4E69",
    "#9A8C98",
    "#C9ADA7",
    "#F2E9E4"
]

let randomColor = []

for (let i = 0; i < 100; i++) {
    let index = Math.floor(Math.random() * colors.length);
    randomColor.push(colors[index])
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
        labels.push(data[i].pseudonim);
        values.push(data[i].wygrane_partie);
    }
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
                display: false,
                labels: {
                    font: {
                        fontColor: "white"
                    }
                }
            },
            title: {
                display: true,
                text: 'Wygrane Partie',
                fontColor: "white",

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


        options: {
            layout: { padding: 10 },
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