const express = require('express');
const cors = require('cors');

const { Sequelize } = require('./models');

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

app.post('/itenspedido', async(rep,res)=>{
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

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        raw: true
        // order:[['nome','DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true
        // order:[['nome','ASC']]
    })
    .then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        raw: true
        // order:[['nome','ASC']]
    })
    .then(function(pedidos){
        res.json({pedidos})
    });
});

app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/nossosclientes', async(req,res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

app.get('/nossospedidos', async(req,res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: código não cadastrado"
        });
    });
});

// app.get('/atualizaservico', async(req,res)=>{
//     await servico.findByPk(1)
//     .then(serv =>{
//         serv.nome = 'HTML/CSS/JS';
//         serv.descricao = 'Páginas estáticas e dinâmicas estelizadas';
//         serv.save();
//         return res.json({serv});
//     });
// });

app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message:"Serviço foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço"
        });
    });
});

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped =>{
        return res.json({ped});
    });
});

app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor 
    }

    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não encontrado."
        });
    };

    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "Serviço não encontrado"
        });
    };

    await itempedido.update(item,{
        where: Sequelize.and({ServicoId: req.body.ServicoId},
                        {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso!",
            itens
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message:"Erro: não foi possível fazer a alteração"
        });
    });
});

app.put('/clientes/:id/editarcliente', async(req,res)=>{
    const itemCliente = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento,
        clienteDesde: req.body.clienteDesde
    };

    if (!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não encontrado."
        });
    };

    await cliente.update(itemCliente,{
        where: {id: req.body.id}
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso!",
            itens
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message:"Erro: não foi possível fazer a alteração"
        });
    });
});



app.get('/excluircliente/:id', async(req,res)=>{
    await cliente.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao tentar excluir"
        });
    });
});

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})