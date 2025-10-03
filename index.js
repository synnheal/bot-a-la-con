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

client.on(Events.MessageCreate, (message) => {
  if (!message.author.bot) {
    message.reply('tg');
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.commandName === 'blague') {
    const blagues = [
      'Pourquoi les canards ont-ils autant de plumes ? Pour couvrir leur derrière.',
      'Un jour, Dieu créa l’homme. Puis, ayant peur de la solitude, il lui donna une femme. Depuis, personne ne comprend plus rien.',
      'C’est l’histoire d’un pingouin qui respirait par les fesses. Un jour il s’assoit et il meurt.'
    ];
    const blague = blagues[Math.floor(Math.random() * blagues.length)];
    await interaction.reply(blague);
  }
});

client.login(token);
