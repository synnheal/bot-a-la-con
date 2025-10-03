const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const prefix = '!';

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Réponse automatique si "black" est dans le message
  if (content.includes('black')) {
    return message.reply('https://tenor.com/view/kunta-kinte-roots-gif-19853733');
  }

  // Commandes préfixées
  if (!content.startsWith(prefix)) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'blague') {
    const blagues = [
      'Pourquoi les canards ont-ils autant de plumes ? Pour couvrir leur derrière.',
      'C’est l’histoire d’un pingouin qui respirait par les fesses. Un jour il s’assoit et il meurt.',
      'J’ai une blague sur les chaises, mais elle est pliante.'
    ];
    message.reply(blagues[Math.floor(Math.random() * blagues.length)]);
  }

  else if (command === 'insulte') {
    const insultes = [
      'T’es plus inutile qu’un chargeur Apple sans fil.',
      'Même Clippy te trouve inutile.',
      'T’as la répartie d’un ticket de caisse.'
    ];
    message.reply(insultes[Math.floor(Math.random() * insultes.length)]);
  }

  else if (command === 'ping') {
    message.reply('🏓 pong');
  }
});



client.login(token);
