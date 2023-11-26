const { Client } = require('pg')
const client = new Client({
    host: 'dpg-clhkrh6bbf9s73b1r9v0-a',
    database: 'onlinelab',
    user: 'onlinelab',
    password: 'i0FSjpO1hPHnNIyC3gjQxh0gaFx9xeIF',
    port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the render.com cloud!");
});