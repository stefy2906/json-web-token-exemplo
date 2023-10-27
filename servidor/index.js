// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const crypto = require('./crypto');
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async (req, res) => {
  const u = await usuario.findOne({ where: { nome: req.body.nome, senha: crypto.encrypt(req.body.senha) } });
  if(u){
  const id = 1;
  const token = jwt.sign({id}, process.env.SECRET, {
    expiresIn: 300
  })

res.cookie('token', token, {httpOnly : true});
return res.json({
  usuário: req.body.usuário,
  token:token
})
  }
  res.status(500).json({mensagem:"Login Inválido"})
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly:true});
  res.json({
    deslogado:true
  })
})

app.get('/usuarios/cadastrar', function(req, res) {
  res.render('cadastrar');
})

app.post('/usuarios/cadastrar', async function(req, res){
  try {
      const louco = {
        nome: req.body.nome,
        senha: crypto.encrypt(req.body.senha)
      }
      if(req.body.senha == req.body.confirmesenha){
        const stef = await usuario.create(louco);
        res.redirect('/usuarios/listar')
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.😢' });
  }
})

  app.get('/usuarios/listar', async function(req,res){
    try{
    var stef = await usuario.findAll();
    res.render('home', { stef }); 
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.🤔' });
  }
  });


app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
  
});