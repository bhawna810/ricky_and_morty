const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/characters', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit) || 7;

        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&limit=${limit}`);
        const characters = response.data.results.map(character => ({
            id: character.id,
            name: character.name,
            image: character.image,
            species: character.species,
            status: character.status,
            origin: character.origin.name,
            location: character.location.name
        }));

        res.json({
            characters,
            page,
            totalPages: Math.ceil(response.data.info.count / limit)
        });
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/character/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const character = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.image,
            species: response.data.species,
            status: response.data.status,
            origin: response.data.origin.name,
            location: response.data.location.name
        };
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
