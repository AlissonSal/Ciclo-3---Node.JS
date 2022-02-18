const express = require('express');
const cors = require('cors');

const models = require('./models');

const app =express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let servico = models.Servico;
let pedido = models.Pedido;
let itempedido = models.ItemPedido;

app.get('/', function(rep,res){
    res.send('Oi Alisson')
});

app.post('/servicos', async(rep,res)=>{
    await servico.create(
        rep.body
        // nome: "Delphi",
        // descricao: "Manutenção e suporte a sustemas legados em Delphi",
        // createAt: new Date(),
        // uptadeAt: new Date()
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro do serviço"
        })
    });
    // res.send('Serviço criado com sucesso!');
});

app.post('/clientes', async(rep,res)=>{
    await cliente.create(
        rep.body
        // nome: "Alisson Henrique",
        // endereco: "Rua Mandaguari, 182",
        // cidade:"Maringá",
        // uf: "PR",
        // nascimento: "1992-19/12",
        // clienteDesde: "2022-16/02"
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro do cliente"
        })
    });
    // res.send('Cliente criado com sucesso!');
})

app.post('/pedidos', async(rep,res)=>{
    await pedido.create(
        rep.body
        // ClienteId: 1,
        // dataPedido: "2022-16-02",
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro do pedido"
        })
    });
    // res.send('Pedido criado com sucesso!');
})

app.post('/itemPedidos', async(rep,res)=>{
    await itempedido.create(
        rep.body
        // PedidoId: 1,
        // ServicoId: 2,
        // quantidade: 3,
        // valor: 100.0
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro do item"
        })
    });
    // res.send('Item criado com sucesso!');
})

// app.get('/clientes', function(rep,res){
//     res.send('Sejam bem-vindos(as) a ServicesTI.')
// });

// app.get('/servicos', function(rep,res){
//     res.send('E ae galerinha!!! Bora serviçar')
// });

// app.get('/pedidos', function(rep,res){
//     res.send('Olha o seu pedido chegando!!!')
// });

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})