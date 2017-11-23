const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

app.post('/', (req, res)=> {
    //Cria registros
    
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
   
   console.log("Example app listening at http://%s:%s", host, port)
})