const express = require('express');
const PORT = process.env.PORT || 3001;
// reinstate server
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// use all linked files index.html loads
app.use(express.static('public'));
// use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});