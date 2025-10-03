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

// petit stockage anti-spam
const userMessages = new Map();

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // 🤬 si on ping le bot
  if (message.mentions.has(client.user)) {
    const insultes = [
      'Quoi ?! tu me ping encore sale clochard ?',
      'T’es lourd toi, va faire tes devoirs.',
      'Encore toi ?! J’t’ai dit arrête de me ping.',
      'Oh l’autre il croit j’ai que ça à faire…'
    ];
    return message.reply(insultes[Math.floor(Math.random() * insultes.length)]);
  }

  // 🤬 si le message est trop long
  if (content.length > 150) {
    return message.reply('Abrege frere t’écris trop 💤');
  }

  // 🤬 si "black" est dans le message
  if (content.includes('black')) {
    return message.reply('https://tenor.com/view/kunta-kinte-roots-gif-19853733');
  }

  // 🤬 si "quoi" dans le message
  if (content.includes('quoi')) {
    return message.reply('feur.');
  }

  // 🤬 si spam / trop de messages rapprochés
  const now = Date.now();
  if (!userMessages.has(message.author.id)) {
    userMessages.set(message.author.id, []);
  }
  const timestamps = userMessages.get(message.author.id);
  timestamps.push(now);
  // ne garde que les 10 dernières secondes
  const filtered = timestamps.filter(t => now - t < 10000);
  userMessages.set(message.author.id, filtered);

  if (filtered.length >= 5) {
    return message.reply('FTG tu spam trop 🤡');
  }

  // Commandes prefixées
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
