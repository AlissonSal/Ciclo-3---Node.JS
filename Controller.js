const express = require('express');
const cors = require('cors');

const app =express();
app.use(cors());

app.get('/', function(rep,res){
    res.send('Oi Alisson')
});

app.get('/clientes', function(rep,res){
    res.send('Sejam bem-vindos(as) a ServicesTI.')
});

app.get('/servicos', function(rep,res){
    res.send('E ae galerinha!!! Bora serviçar')
});

app.get('/pedidos', function(rep,res){
    res.send('Olha o seu pedido chegando!!!')
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})