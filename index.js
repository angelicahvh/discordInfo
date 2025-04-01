const express = require(`express`);
const axios = require('axios');
const app = express();
const port = 3000;
const BOT_TOKEN = process.env.dctoken;

app.get(`/pfp/:id`, async (req, res) => {
    const userID = req.params.id;

    const response = await axios.get(`https://discord.com/api/v10/users/${userID}`, {
        headers: {
            "Authorization": `Bot ${BOT_TOKEN}`
        }});

    const avatarHash = response.data.avatar;

    const avatarURL = `https://cdn.discordapp.com/avatars/${userID}/${avatarHash}.png`;
    console.log(avatarURL);
    const avatarResponse = await axios.get(avatarURL, {responseType: 'arraybuffer',});

    res.setHeader("Content-Type", "image/png")
    res.send(avatarResponse.data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;