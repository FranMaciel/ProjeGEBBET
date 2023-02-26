const express = require('express');
const app = express();
const PORT = 2000;

app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Está funcionando 3");
});