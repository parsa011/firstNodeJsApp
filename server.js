const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog',
{useNewUrlParser : true,useUnifiedTopology : true});
3
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.set('view engine','ejs');

app.get('/',async (req,res) =>{
    const articles = await Article.find()
        .sort({ createdAt: 'desc' });

    res.render('articles/index',{articles :articles})
});

app.use('/articles',articleRouter);

app.listen(3000);