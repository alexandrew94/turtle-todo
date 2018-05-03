const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI =  process.env.MONGODB_URI || `mongodb://localhost/project-3-${env}`;
const secret = process.env.SECRET || 'G6^sk*/>alexandandrewarecool';

module.exports = { port, dbURI, secret };
