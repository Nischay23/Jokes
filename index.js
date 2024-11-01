import express from "express";
import axios from "axios";

const app = express();
const port = 3002;
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/joke", async(req,res)=>{
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
        res.render("joke.ejs", {
            joke: result.data,
        })
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.render('error', { message: "Could not retrieve a joke. Try again!" });
    }
});

app.listen(port, ()=>{
    console.log(`Server is listening at port:${port}`);
})