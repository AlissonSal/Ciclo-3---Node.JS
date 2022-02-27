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
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.ItemCompra;

app.get('/', function(req,res){
    res.send('Oi Alisson')
});

// inserir

app.post('/clientes', async(req,res)=>{
    await cliente.create(
        req.body
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
})

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
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
});

app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
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
})

app.post('/itenspedido', async(req,res)=>{
    await itempedido.create(
        req.body
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
})

app.post('/compras', async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra realizada com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro da compra"
        })
    });
});

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"        
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro no cadastro do produto"
        })
    });
});

app.post('/itenscompra', async(req,res)=>{
    await itemcompra.create(
        req.body
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
})

let port=process.env.PORT || 3001;

//listagem

app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true
        // order:[['nome','ASC']]
    })
    .then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        raw: true
        // order:[['nome','DESC']]
    }).then(function(servicos){
        res.json({servicos})
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

app.get('/listaitenspedido', async(req,res)=>{
    await itempedido.findAll({
        raw: true
    })
    .then(function(itenspedido){
        res.json({itenspedido})
    });
});

app.get('/listaprodutos', async(req,res)=>{
    await produto.findAll({
        raw: true
    }).then(function(produtos){
        res.json({produtos})
    });
});

app.get('/listacompras', async(req,res)=>{
    await compra.findAll({
        raw: true
    })
    .then(function(compras){
        res.json({compras})
    });
});

app.get('/listaitenscompra', async(req,res)=>{
    await itemcompra.findAll({
        raw: true
    })
    .then(function(itenscompra){
        res.json({itenscompra})
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

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped =>{
        return res.json({ped});
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

// atualizar e/ou editar

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

// exclusão

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