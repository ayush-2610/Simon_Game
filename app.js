let express = require('express');

let app = express();
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.listen(process.env.PORT||8000, function() {
    console.log('Server @ '+(process.env.PORT||8000));
});