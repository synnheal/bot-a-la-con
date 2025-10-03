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

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // 1. Ping = insulte
  if (message.mentions.has(client.user)) {
    const insultes = [
      'Quoi encore ? Besoin d’attention pauv’ tâche ?',
      'Me ping pas, je bosse sur rien.',
      'T’as un ping facile, mais t’as pas de talent.',
      'Si tu me ping encore, je ping ta daronne.'
    ];
    return message.reply(insultes[Math.floor(Math.random() * insultes.length)]);
  }

  // 2. Pavé = “Abrege”
  if (content.length > 150) {
    return message.reply('Abrege frère, on est pas sur Wattpad.');
  }

  // 3. “black” = GIF Kunta
  if (content.includes('black')) {
    return message.reply('https://tenor.com/view/kunta-kinte-roots-gif-19853733');
  }

  // 4. “quoi” = “feur”
  if (content.includes('quoi')) return message.reply('feur');

  // 5. “hein” = “deux”
  if (content.includes('hein')) return message.reply('deux');

  // 6. “oui” = “stiti”
  if (content.includes('oui')) return message.reply('stiti');

  // 7. “non” = “bril”
  if (content.includes('non')) return message.reply('bril');

  // 8. Spam = FTG
  const now = Date.now();
  if (!userMessages.has(message.author.id)) userMessages.set(message.author.id, []);
  const timestamps = userMessages.get(message.author.id);
  timestamps.push(now);
  const recent = timestamps.filter(t => now - t < 10000);
  userMessages.set(message.author.id, recent);
  if (recent.length >= 5) return message.reply('FTG tu spam trop 🧼');

  // 9. Caps lock = “crie pas”
  if (content === content.toUpperCase() && content.length > 6) {
    return message.reply('CRIE PAS FDP');
  }

  // 10. Répète mot 3 fois = “On a compris”
  const words = content.split(/\s+/);
  const counts = {};
  for (const w of words) counts[w] = (counts[w] || 0) + 1;
  if (Object.values(counts).some(c => c >= 3)) return message.reply('On a compris gros force pas 😭');

  // 11. Émoji 🤓 = “t pas drôle”
  if (content.includes('🤓')) return message.reply('T pas drôle. 🤡');

  // 12. “mdr” = “t’as ri ?”
  if (content.includes('mdr')) return message.reply('T’as ri ? Non.');

  // 13. “ptdr” = “clown détecté”
  if (content.includes('ptdr')) return message.reply('clown détecté 🎪');

  // 14. “?” = “t’as cru j’allais répondre ?”
  if (content.includes('?')) return message.reply('T’as cru j’allais répondre ?');

  // 15. “help” sans ! = “mets un !”
  if (content === 'help') return message.reply('mets un ! frère');

  // 16. insulte aléatoire à chaque 10 messages
  if (Math.random() < 0.1) {
    const trashTalk = [
      't’as rien à dire mais tu parles quand même',
      'ferme-la et réfléchis, dans cet ordre',
      'c’est pas parce que t’as un clavier qu’il faut t’en servir'
    ];
    return message.reply(trashTalk[Math.floor(Math.random() * trashTalk.length)]);
  }

  // 17. Si l’utilisateur dit "lol", il répond “t’es mort de rire tout seul ?”
  if (content.includes('lol')) return message.reply('T’es mort de rire tout seul ?');

  // 18. “je” + “suis” = “non t’es pas”
  if (content.includes('je suis')) return message.reply('non t’es pas.');

  // 19. “t ki” = “meilleur que toi”
  if (content.includes('t ki')) return message.reply('meilleur que toi.');

  // 20. “ok” = “ok boomer”
  if (content === 'ok') return message.reply('ok boomer.');

  // 21. “bg” = “t pas si beau frero”
  if (content.includes('bg')) return message.reply('t pas si beau frero 😐');

  // 22. “jpp” = “on a jamais commencé”
  if (content.includes('jpp')) return message.reply('on a jamais commencé frr');

  // 23. “j’arrive” = “on t’a rien demandé”
  if (content.includes("j'arrive")) return message.reply("on t'a rien demandé");

  // 24. “?” plusieurs fois = “t’as fini ?”
  if ((content.match(/\?/g) || []).length > 3) return message.reply("T'as fini avec tes questions là ?");

  // 25. “…” = “Parle bordel”
  if (content.includes('...')) return message.reply('Parle bordel 🙄');

  // 📜 Commandes classiques
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
    const insultes = [
      'T’es plus inutile qu’un chargeur Apple sans fil.',
      'Même Clippy te trouve inutile.',
      'T’as la répartie d’un ticket de caisse.'
    ];
    return message.reply(insultes[Math.floor(Math.random() * insultes.length)]);
  }

  if (command === 'ping') {
    return message.reply('🏓 pong');
  }

  if (command === 'help') {
    return message.reply(
      '**Fonctions du bot relou :**\n' +
      '- !blague → blague pas drôle\n' +
      '- !insulte → t’humilie\n' +
      '- !ping → pong\n' +
      '- Réagit à "quoi", "hein", "oui", "non", "black", "lol", "mdr", "ptdr", etc.\n' +
      '- Te casse si tu spam, si tu cries, ou si tu racontes ta vie\n' +
      '- T’envoie des punchlines gratos au hasard\n' +
      '- T’agresse quand tu poses des questions ou que tu le ping\n' +
      '- Et bien plus…'
    );
  }
});

client.login(token);
