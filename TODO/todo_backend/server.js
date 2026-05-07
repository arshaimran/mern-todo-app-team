const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://admin:admin123@ac-6prghdw-shard-00-00.zm2x6s5.mongodb.net:27017,ac-6prghdw-shard-00-01.zm2x6s5.mongodb.net:27017,ac-6prghdw-shard-00-02.zm2x6s5.mongodb.net:27017/todo?ssl=true&replicaSet=atlas-13p5s9-shard-0&authSource=admin&appName=punishmentmiffy')

.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err));


app.listen(5000,
    console.log('Server listening on port: 5000')
)

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
      .then(result => res.json(result))
      .catch(err => console.log(err));
   
});

app.get('/get',(req,res)=>{
  TodoModel.find()
  .then(result=> res.json(result))
  .catch(err=>console.log(err));
});
  
app.put('/edit/:id',(req,res)=>{
  const{id} = req.params;
  TodoModel.findByIdAndUpdate(id,{done:true},{new:true})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 });

app.put('/update/:id',(req,res)=>{
  const{id} = req.params;
  const{task} = req.body;
  TodoModel.findByIdAndUpdate(id,{task:task})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 });

app.delete('/delete/:id',(req,res)=>{
  const{id} = req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 }); 

module.exports=app;
