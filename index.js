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
const userMessages = new Map();

// === CONFIGURATION DES MODULES ===
const config = {
  insultes: true,
  spam: true,
  emoji: true,
  trigger: true,
  pave: true,
  pingbot: true,
  punchline: true,
  caps: true
};

const punchlines = [
  "Inutile est ton deuxième prénom rejeté de Windows Vista, change de pseudo.",
  "J'ai mal au cerveau quand tu parles fantôme de MSN, personne te respecte.",
  "Ferme-la création accidentelle, on te mute ?",
  "Tu sers à rien mec de 2009, change de pseudo.",
  "J'ai mal au cerveau quand tu parles clone de Patrick l'étoile, on te mute ?",
  "Retourne à la maternelle clone de Patrick l'étoile, on te mute ?",
  "Inutile est ton deuxième prénom mec de 2009 et j'suis gentil.",
  "T'as été élevé par un grille-pain déchet de l'internet, laisse Internet tranquille.",
  "Ferme-la pseudo-intello et j'suis gentil.",
  "T'as été élevé par un grille-pain majordome raté, personne te respecte."
  // ... tu peux ajouter ici les 190 autres punchlines
];

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  // === COMPORTEMENTS TOXIQUES PAR MODULE ===

  if (config.pingbot && message.mentions.has(client.user)) {
    return message.reply("T'as cru t'étais qui à me ping ?");
  }

  if (config.insultes && ['tg', 'ftg', 'salope', 'pute', 'enculé'].some(w => content.includes(w))) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (config.pave && content.length > 150) {
    return message.reply('Abrege frère, on est pas sur Wattpad.');
  }

  if (config.caps && content === content.toUpperCase() && content.length > 6) {
    return message.reply('CRIE PAS FDP');
  }

  if (config.trigger && content.includes('quoi')) return message.reply('feur');
  if (config.trigger && content.includes('hein')) return message.reply('deux');
  if (config.trigger && content.includes('oui')) return message.reply('stiti');
  if (config.trigger && content.includes('non')) return message.reply('bril');
  if (config.trigger && content.includes('mdr')) return message.reply("T'as ri ? Non.");
  if (config.trigger && content.includes('ptdr')) return message.reply("clown détecté 🎪");
  if (config.trigger && content.includes('?') && (content.match(/\?/g) || []).length > 3) return message.reply("T'as fini avec tes questions ?");
  if (config.trigger && content.includes('...')) return message.reply("Parle bordel 🙄");

  if (config.trigger && content.includes('black')) return message.reply('https://tenor.com/view/kunta-kinte-roots-gif-19853733');

  if (config.emoji && content.includes('🤓')) return message.reply("T pas drôle. 🤡");

  if (config.spam) {
    const now = Date.now();
    const timestamps = userMessages.get(message.author.id) || [];
    timestamps.push(now);
    userMessages.set(message.author.id, timestamps.filter(t => now - t < 10000));
    if (timestamps.length >= 5) return message.reply('FTG tu spam trop 🧼');
  }

  if (config.punchline && Math.random() < 0.05) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  // === COMMANDES PREFIXÉES ===
  if (!content.startsWith(prefix)) return;
  const args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'blague') {
    const blagues = [
      'Pourquoi les canards ont-ils autant de plumes ? Pour couvrir leur derrière.',
      'Un jour, Dieu créa l’homme. Puis il regretta.',
      'J’ai une blague sur les chaises, mais elle est pliante.'
    ];
    return message.reply(blagues[Math.floor(Math.random() * blagues.length)]);
  }

  if (command === 'insulte') {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (command === 'ping') {
    return message.reply('🏓 pong');
  }

  if (command === 'help') {
    return message.reply(`**Commandes et modules disponibles :**
!blague, !insulte, !ping, !help, !config
Modules : insultes, spam, emoji, trigger, pave, pingbot, punchline, caps`);
  }

  if (command === 'config') {
    if (!args[0]) {
      const state = Object.entries(config)
        .map(([k, v]) => `- ${k} : ${v ? '✅ activé' : '❌ désactivé'}`)
        .join('\n');
      return message.reply(`**Modules activés :**\n${state}`);
    }

    const module = args[0].toLowerCase();
    if (!(module in config)) {
      return message.reply(`❌ Module inconnu : \`${module}\`
**Modules activables :**
- \`insultes\` : Répond aux insultes (tg, ftg, etc.)
- \`spam\` : Détecte et réagit au spam (≥5 messages/10s)
- \`emoji\` : Réagit à certains emojis relous (ex: 🤓)
- \`trigger\` : Répond à 'quoi', 'hein', 'oui', etc.
- \`pave\` : Réagit aux messages trop longs
- \`pingbot\` : Insulte si on ping le bot
- \`punchline\` : Envoie des punchlines aléatoires
- \`caps\` : Hurle si tu cries en MAJUSCULES`);
    }

    config[module] = !config[module];
    return message.reply(`🔁 Module \`${module}\` est maintenant ${config[module] ? '✅ activé' : '❌ désactivé'}`);
  }
});

client.login(token);
