import express from 'express';
import session from 'express-session';
import nunjucks from 'nunjucks';
import bodyParser from'body-parser';

import db from './models/index.js';

import * as loginController from './controller/loginController.js';
import * as postController from './controller/postController.js';
import * as memberController from './controller/memberController.js';
import { imageController } from './controller/imageController.js';

const app = express();
let port = process.env.PROT || 8080;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.set('view engine', 'html'); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.COOKIE_SECRET || 'test',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('/uploads/image', imageController);

app.get('/', (req, res) => {
  if (req.session.memberId == null) {
    return res.redirect('/login');
  }
  return res.redirect('/rank');
});

app.get('/login', (req, res) => {
  return res.render('login.html');
});

app.post('/login', (req, res) => {
  loginController.loginMember(req, res);
});

app.get('/join', (req, res) => {
  return res.render('join.html');
});

app.post('/join', (req, res) => {
  loginController.joinMember(req, res);
});

app.get('/rank', async (req, res) => {
  if (req.session.memberId == null) {
    return res.redirect('/login');
  }
  const rankers = await memberController.getRanker(req, res);
  return res.render('rank.html',{"ranking_list": rankers});
});

app.get('/certification', (req, res) => {
  if (req.session.memberId == null) {
      return res.redirect('/login');
    }
  return res.render('certification.html');
});

app.post('/post', (req, res) => {
  if (req.session.memberId == null) {
      return res.redirect('/login');
    }
    postController.saveNewPost(req, res);  
});

app.get('/mypage', async (req, res) => {
  if (req.session.memberId == null) {
      return res.redirect('/login');
    }
    const mypageData = await memberController.getMemberMypage(req, res);
    return res.render('mypage.html', {"mypageData": mypageData, "memberId": req.session.memberId});
});

app.get('/status', async (req, res) => {
  const posts = await postController.getAllPost(req, res);
  return res.render('status.html', {"post_list": posts});
});

app.delete('/member/withdraw', (req, res) => {
  if (req.session.memberId == null) {
      return res.redirect('/login');
    }
    memberController.withdrawMember(req, res);
});

app.get('/post/:postId', async (req, res) => {
  if (req.session.memberId == null) {
      return res.redirect('/login');
    }
    const { postId } = req.params;
    const post = await postController.getPostDetail(req, res, postId);
    console.log(post[0]);
    return res.render('post.html', {"post": post[0]});
});

app.get('/preSgined', async (req, res) => {
  const { exten } = req.query;
  const url = await imageController.createPreSignedUrl(exten);
  return url;
});

app.get('/request', (req, res) => {
  return res.render('request.html');
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render('404.html', {"message": error.message});
  }
});

const server = app.listen(port, () => {
    console.log(`Server listen on ${port}`);
});