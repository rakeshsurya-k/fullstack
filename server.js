const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let entries = [];

app.get('/', (req, res) => {
let totalIncome = 0;
let totalExpense = 0;

entries.forEach(e => {
    if (e.type === 'income') totalIncome += e.amount;
    else if (e.type === 'expense') totalExpense += e.amount;
});

res.render('index', { entries, totalIncome, totalExpense, balance: totalIncome - totalExpense });
});

app.post('/add', (req, res) => {
const { desc, amount, type, category } = req.body;
if (!desc || !amount || !type || !category) {
    return res.redirect('/');
}

entries.push({
    id: Date.now(),
    desc,
    amount: parseFloat(amount),
    type,
    category
});

res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
const id = parseInt(req.params.id);
entries = entries.filter(e => e.id !== id);
res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
