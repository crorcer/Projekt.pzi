// Kreirati vlastite get, post, put, delete metode za rad s objektom unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let proizvodi = [];


app.get('/proizvodi', (request, response) => {
    return response.json(proizvodi);
});


app.post('/proizvodi', (request, response) => {
    const noviProizvod = {
        id: proizvodi.length + 1,
        naziv: request.body.naziv,
        cijena: request.body.cijena,
        kolicina: request.body.kolicina
    };
    proizvodi.push(noviProizvod);
    return response.status(201).send('Proizvod dodan: ' + noviProizvod.naziv);
});


app.put('/idproizvoda', (request, response) => {
    const id = parseInt(request.params.id);
    const proizvod = proizvodi.find(p => p.id === id);
    
    if (!proizvod) {
        return response.status(404).send('Proizvod nije lociran');
    }

    proizvod.naziv = request.body.naziv || proizvod.naziv;
    proizvod.cijena = request.body.cijena || proizvod.cijena;
    proizvod.kolicina = request.body.kolicina || proizvod.kolicina;

    return response.send('Proizvod azuriran: ' + proizvod.naziv);
});


app.delete('/idproizvoda', (request, response) => {
    const id = parseInt(request.params.id);
    const index = proizvodi.findIndex(p => p.id === id);
    
    if (index === -1) {
        return response.status(404).send('Proizvod nije lociran');
    }

    const deletedProduct = proizvodi.splice(index, 1);
    return response.send('Proizvod obrisan: ' + deletedProduct[0].naziv);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
