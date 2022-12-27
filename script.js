const apiUrl = 'https://my.api.mockaroo.com/yenga.json?key=72109a80'; // replace with your API URL

async function getData() {
  try {
    // make the API call and parse the response as JSON
    const response = await fetch(apiUrl);
    const data = await response.json();

    // create an HTML table
    let table = '<table><tr><th>ID</th><th>Name</th></tr>';
    
    // loop through the data and add rows to the table
    for (let item of data) {
      table += `<tr><td>${item.id}</td><td>${item.name}</td></tr>`;
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
getData();