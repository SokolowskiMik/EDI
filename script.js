const fetch = require('node-fetch')
const fs = require('fs')

function upload(apiKey, name, path) {
  fetch(`https://api.mockaroo.com/api/datasets/${encodeURIComponent(name)}?key=${encodeURIComponent(apiKey)}`, {
    method: 'post',
    body: fs.readFileSync(path),
    headers: {
      "content-type": "text/csv"
    }
  })
  .then(res => res.json())
  .then(result => console.log(result))
}