import express from 'express';

const app = express();

const PORT = 3000;

// middlewares
app.use(express.json());


app.get('/', (req, res) => {
    res.send({message: 'welome to express server!'})
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((x) => x.id === id);

    res.json(user);
})

app.put('/users/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({ errror: 'Name and emaeil are required fields!'});
    }

    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({ error: 'User not found!'});
    }

    try{
        users[userIndex] = { ...users[userIndex], name, email };

        res.json({message: 'user updated succesfuly', user: users[userIndex]})
    }catch(error){
        console.log('Error: ' + error);
    }

})

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})



const users = [
    {
        id: 1,
        name: 'Drin',
        email: 'dcerkini@gmail.com'
    },
    {
        id: 2,
        name: 'filan',
        email: 'filan@gmail.com'
    }
]

