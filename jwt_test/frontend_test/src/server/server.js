// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 4000;
// const db = require('./config/db');

// app.post('forget-password', (req, res) => {
//     if (req.body.email === '') {
//         res.status(400).send('email required');
//     }
//     User.findOne({
//         where: {
//             email: {
//                 like: req.body.email
//             }
//         }
//     })
// });

// app.listen(PORT, () => {
//     console.log(`Server On : http://localhost:${PORT}/`);
// })

