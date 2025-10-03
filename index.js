const { Client, GatewayIntentBits, Partials, Events, InteractionType } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.commandName === 'blague') {
    const blagues = [
      'Pourquoi les canards ont-ils autant de plumes ? Pour couvrir leur derrière.',
      'C’est l’histoire d’un pingouin qui respirait par les fesses. Un jour il s’assoit et il meurt.',
      'J’ai une blague sur les chaises, mais elle est pliante.'
    ];
    const blague = blagues[Math.floor(Math.random() * blagues.length)];
    await interaction.reply(blague);
  }

  if (interaction.commandName === 'insulte') {
    const insultes = [
      'T’es plus inutile qu’un chargeur Apple sans fil.',
      'Même Clippy te trouve inutile.',
      'T’as la répartie d’un ticket de caisse.'
    ];
    const insulte = insultes[Math.floor(Math.random() * insultes.length)];
    await interaction.reply(insulte);
  }

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 pong');
  }
});

client.login(token);
