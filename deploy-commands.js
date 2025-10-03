const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('blague').setDescription('Raconte une blague'),
  new SlashCommandBuilder().setName('insulte').setDescription('Te balance une insulte'),
  new SlashCommandBuilder().setName('ping').setDescription('Test de latence'),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Enregistrement des commandes slash...');
    await rest.put(Routes.applicationCommands('1423558768054243440'), {
      body: commands
    });
    console.log('Commandes enregistrées !');
  } catch (err) {
    console.error(err);
  }
})();
