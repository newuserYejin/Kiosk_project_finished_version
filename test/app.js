const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'kiosk',
});

connection.connect((err) => {
    if(err) {
        console.error(err);
    }else {
        console.log('성공!');
    }
});

app.use(express.json());
app.use(cors());

app.get('/search', (req, res) => {
    const keyword = req.query.keyword;

    const sql = `select * from img inner join tb_menu
    on img.img_num = tb_menu.Menu_Num
    where tb_menu.Menu_Name LIKE '%${keyword}%'`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

// 서버를 시작하는 부분 (서버 포트에 맞게 변경)
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});