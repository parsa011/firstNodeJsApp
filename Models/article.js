const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('domPurify');
const {JSDOM} = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);

mongoose.set('useCreateIndex', true);

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }

});

articleSchema.pre('validate',function(next){
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown){
        this.sanitizedHtml = domPurify.sanitize(marked(this.markdown));
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema);