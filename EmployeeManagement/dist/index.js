"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exp = require('express');
const app = exp();
const port = 5000;
app.get('/', (req, res) => {
    const response = "Hello WOrld";
    res.send({ response }).status(200);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map