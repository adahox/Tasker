// TODO: use Typescript
const cors = require('cors');
const express = require('express');
const routes = require('./routes/index');
const app = express()

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.listen(3001, () => console.log("running on 3001 port"));