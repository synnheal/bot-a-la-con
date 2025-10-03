const { Client, GatewayIntentBits, Partials, Events, InteractionType } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Répond "tg" à chaque message non-bot
client.on(Events.MessageCreate, (message) => {
  if (!message.author.bot) {
    message.reply('tg');
  }
});

// Gère les commandes slash
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  // /blague
  if (interaction.commandName === 'blague') {
    const blagues = [
      'Pourquoi les canards ont-ils autant de plumes ? Pour couvrir leur derrière.',
      'Un jour, Dieu créa l’homme. Puis, ayant peur de la solitude, il lui donna une femme. Depuis, personne ne comprend plus rien.',
      'C’est l’histoire d’un pingouin qui respirait par les fesses. Un jour il s’assoit et il meurt.'
    ];
    const blague = blagues[Math.floor(Math.random() * blagues.length)];
    await interaction.reply(blague);
  }

  // /insulte
  else if (interaction.commandName === 'insulte') {
    const insultes = [
      'T’es aussi utile qu’un chargeur Nokia en 2025.',
      'Ton QI est en mode avion.',
      'Même un bot écrit mieux que toi.'
    ];
    const insulte = insultes[Math.floor(Math.random() * insultes.length)];
    await interaction.reply(insulte);
  }

  // /ping
  else if (interaction.commandName === 'ping') {
    await interaction.reply('pong');
  }
});

client.login(token);
