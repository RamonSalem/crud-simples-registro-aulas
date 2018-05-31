const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser= require('body-parser');

const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

app.use(cors());

mongoose.connect('mongodb://localhost/registro_aulas', { useMongoClient: true });
mongoose.Promise = global.Promise;

const schema = {
    titulo : String,
    data : Date,
    atividades : String,
    alunosPresentes : [String]
};

const RegistrosModel = mongoose.model('Registros', schema);

const testRegistro = {
    titulo : 'Aula 2',
    data : Date.now(),
    atividades : 'Foram realizadas bla bla',
    alunosPresentes : ['Ramon', 'Aluno 2', 'Aluno 3']
}

const registro = new RegistrosModel(testRegistro);
  registro.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Criado');
    }
});

app.get('/atividade', (req, res)=>{
  res.sendFile(__dirname +'/page.html');
})





app.post('/registros', (req, res)=> {
    //Cria registros
    
    const newRegistro = {
      titulo : req.body.titulo,
      atividades : req.body.atividades,
      alunosPresentes : req.body.alunosPresentes,
      data : Date.now()
    };
    
    const registro = new RegistrosModel(newRegistro);

    registro.save()
    .then(resultado =>{
      return res.status(200).json(resultado);
    })
    .catch(err=>{
      return res.status(500).json(err);
    });
    
 });

 app.get('/registros', (req, res)=> {
  //Retorna registros
  RegistrosModel.find({})
  .then(resposta=>{
    return res.status(200).json(resposta);
  })
  .catch(err=>{
    return res.status(500).json(err);
  })

});

 app.put('/registros/:id_registro', (req, res)=> {
    //Edita registros

    const registroEditado = req.body.novoRegistro;

    RegistrosModel.findOneAndUpdate({_id : req.params.id_registro}, registroEditado, {new : true})
    .then(result=>{
      return res.status(200).json(result);
    })
    .catch(err=>{
      return res.status(500).json(err);
    });

 })

 app.delete('/registros/:id', (req, res)=>{
    //Deleta registros

    RegistrosModel.findOneAndRemove({_id : req.params.id})
    .then(result=>{
      return res.status(200).json(result);
    })
    .catch(err=>{
      return res.status(500).json(err);
    });
 })

const server = app.listen(3000, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Rodando em http://%s:%s", host, port)
})