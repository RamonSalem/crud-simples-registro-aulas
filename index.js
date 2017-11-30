const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

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


app.get('/', (req, res)=> {
  //Retorna registros
});

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
    .then(result =>{
      return res.status(200).json(result);
    })
    .catch(err=>{
      return res.status(500).json(err);
    });
    
    //res.send('Hello World');
 });

 app.put('/', (req, res)=> {
    //Edita registros
 })

 app.delete('/', (req, res)=>{
    //Deleta registros
 })

const server = app.listen(3000, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Rodando em http://%s:%s", host, port)
})