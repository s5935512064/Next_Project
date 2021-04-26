let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let cookie = require('cookie');
let app = express();
let passport = require('passport');

// app.use(cors());
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
 
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const jwt = require('jsonwebtoken');
 
let books = {
    Array: [
       { id: 1, title: 'Harry Potter', pages: 120, price: 200, amount: 20 },
       { id: 2, title: 'Bitcoin 101', pages: 100, price: 120, amount: 35 },
       { id: 3, title: 'Naruto', pages: 100, price: 120, amount: 35 },
       { id: 4, title: 'Reborn', pages: 100, price: 120, amount: 35 },
       { id: 5, title: 'Onepiece', pages: 100, price: 120, amount: 35 },
       { id: 6, title: 'Next.js', pages: 100, price: 120, amount: 35 }
    ]
 }
 
 
router.route('/books')
   .get((req, res) => res.json(books))
   .post((req, res) => {
    let newBook = {}
    newBook.id = (books.Array.length)?books.Array[books.Array.length - 1].id + 1:1
    newBook.title = req.body.title
    newBook.pages = req.body.pages
    newBook.price = req.body.price
    newBook.amount = req.body.amount
    books = { "Array": [...books.Array, newBook] }
    res.json(books)
})

router.route('/books/:book_id')
   .get((req, res) => {
       const book_id = req.params.book_id
       const id = books.Array.findIndex(item => +item.id === + book_id)
       res.json(books.Array[id])
   })
   .put((req, res) => {
       const book_id = req.params.book_id
       const id = books.Array.findIndex(item => +item.id === +book_id)
       books.Array[id].page = req.body.page
       books.Array[id].price = req.body.price
       books.Array[id].amount = req.body.amount
       res.json(books.Array[id])
   })
 
   .delete((req, res) => {
       const book_id = req.params.book_id
       books.Array = books.Array.filter(item => +item.id !== +book_id)
       res.json(books.Array)
   })

let income = 0
router.route('/income')
   .get((req, res) => res.json(income))


router.route('/purchase/:book_id')
    .post((req, res) => {
      
        const book_id = req.params.book_id
        const id = books.Array.findIndex(item => +item.id === +book_id)
        const newIncome = books.Array[id].price
        const NewAmount = books.Array[id].amount

        console.log(NewAmount)
        console.log(newIncome)
        console.log(book_id)
        console.log(id)

        if(id < 0){

            res.send("book not found")
        }
        else{
            if(NewAmount > 0)
            {
                income += newIncome
                // console.log(income)
                amount = NewAmount-1
                books.Array[id].amount = amount
                // console.log(amount)
                res.json(income)
            }
            else{
                books.Array = books.Array.filter(item => +item.id !== +book_id)
                res.send("The book is out of stock")
                res.json(books.list)
            }
        }
    })

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user, db.SECRET, {
                    expiresIn: req.body.remember?'7d':'1d' //short-hand condition
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token })
            } else
                return res.status(422).json(info)
        })(req, res, next)
    })
    
router.get('/logout', (req, res) => { 
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ message: 'Logout successful' })
    })
    router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});


app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

app.listen(4001, () => {
    console.log("Yey, your server is running on port 4001");
});