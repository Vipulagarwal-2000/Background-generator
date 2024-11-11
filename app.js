import express from "express";

const app = express();
const port = 3000;


// Serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Specify the folder where your HTML files (EJS templates) are stored
app.set('views', './views'); // by default, it looks in './views'



app.get('/', (req, res) =>
{
    res.render("index.ejs");

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});