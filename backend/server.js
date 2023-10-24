const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')



const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 100 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.get('/', (req, res) => {
    if (req.session.role) {
        return res.json({ valid: true, role: req.session.role, id: req.session.userId });
    } else {
        return res.json({ valid: false });
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.json("success");
})

app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({Message: "Error"});
        }

        return res.json(data);

    })
})

app.post('/admin/changeRole', (req, res) => {
    const userId = req.body.id;
    let sql = ''

    if (req.body.role === 'admin') {
         sql = "UPDATE users SET role = 'user' WHERE id = ?";
    } else if (req.body.role === 'user') {
         sql = "UPDATE users SET role = 'admin' WHERE id = ?";
    }

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json(result);
    });
});

app.post('/admin/delete', (req, res) => {
    const userId = req.body.id;
    let sql = 'DELETE FROM `users` WHERE id = ?'

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json(result);
    });
});

app.post('/user', (req, res) => {
    const userId = req.session.userId;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.json({Message: "Error"});
        }
        return res.json(data);
    })
})

app.post('/admin/changePassword', (req, res) => {
    let sql = 'UPDATE users SET password = ? WHERE id = ?'

    db.query(sql, [req.body.newPassword, req.body.id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json(result);
    });
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json({Message: "Error in Node"});
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? and `password` = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({Message: "Error inside server"});
        }
        if(data.length > 0) {
            req.session.role = data[0].role;
            req.session.userId = data[0].id;
            return res.json({Login: true});
        } else {
            return res.json({Login: false});
        }
    })
})

app.listen(8801, () => {
    console.log("listening");
});