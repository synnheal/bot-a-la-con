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
"Chaque fois que tu utilises cringe, le bot répond : 'T’as écrit ça avec tes pieds ?'",
"Quand tu expressions françaises, le bot te répondra : 'Arrête le massacre'",
"Quand tu auto-correction, le bot te répondra : 'Ton orthographe pleure'",
"Quand tu faux compliments, le bot te répondra : 'Change de clavier stp'",
"Quand tu gifs, le bot te répondra : 'C’est gênant à lire'",
"Si tu fais expressions françaises, le bot va dire : 'C’est pas une faute, c’est une tragédie'",
"Chaque fois que tu utilises trigger words, le bot répond : 'On a perdu des neurones là'",
"Si tu fais pavé, le bot va dire : 'T'as demandé un ban ou quoi ?'",
"Le bot te clashe automatiquement quand tu cringe : 'Même Siri a honte'",
"Chaque fois que tu utilises faux compliments, le bot répond : 'T'es le bug de la matrice'",
"Le bot te clashe automatiquement quand tu faux compliments : 'On dirait un bot cassé'",
"Le bot te renvoie : 'T'es le bug de la matrice' si tu erreurs",
"Chaque fois que tu utilises emoji, le bot répond : 'C’est pas une faute, c’est une tragédie'",
"Le bot te renvoie : 'Tu t’auto-humilies là' si tu pavé",
"Quand tu anime, le bot te répondra : 'Tu t’auto-humilies là'",
"Le bot te renvoie : 'Tu t’auto-humilies là' si tu langage sms",
"Le bot te clashe automatiquement quand tu voix : 'C’est autorisé d’écrire ça ?'",
"Le bot te renvoie : 'T'as demandé un ban ou quoi ?' si tu pavé",
"Le bot te renvoie : 'Ton clavier a besoin de vacances' si tu gifs",
"Chaque fois que tu utilises erreurs, le bot répond : 'Faut consulter là'",
"Quand tu usurpation, le bot te répondra : 'Tu veux qu’on t’aide à te relire ?'",
"Quand tu blagues pourries, le bot te répondra : 'Change de clavier stp'",
"Le bot te clashe automatiquement quand tu pavé : 'Message inutile détecté'",
"Chaque fois que tu utilises spam, le bot répond : 'Tu t’auto-humilies là'",
"Quand tu expressions françaises, le bot te répondra : 'C’est autorisé d’écrire ça ?'",
"Chaque fois que tu utilises anime, le bot répond : 'Clavier cassé ou cerveau fatigué ?'",
"Le bot te renvoie : 'Même ton ombre te juge' si tu erreurs",
"Chaque fois que tu utilises auto-correction, le bot répond : 'Je suis un bot mais j’ai honte pour toi'",
"Le bot te renvoie : 'Tu t’auto-humilies là' si tu expressions françaises",
"Le bot te renvoie : 'Ton orthographe pleure' si tu copié-collé",
"Le bot te renvoie : 'Arrête le massacre' si tu copié-collé",
"Chaque fois que tu utilises usurpation, le bot répond : 'On a perdu des neurones là'",
"Le bot te clashe automatiquement quand tu anime : 'Tu fais peur à la syntaxe'",
"Le bot te clashe automatiquement quand tu langage sms : 'Je suis un bot mais j’ai honte pour toi'",
"Le bot te clashe automatiquement quand tu spam : 'On dirait une rédaction de CM1'",
"Chaque fois que tu utilises gifs, le bot répond : 'Ton clavier a besoin de vacances'",
"Le bot te clashe automatiquement quand tu emoji : 'Tu t’auto-humilies là'",
"Si tu fais questions relou, le bot va dire : 'On a perdu des neurones là'",
"Le bot te renvoie : 'Faut consulter là' si tu spam",
"Si tu fais cringe, le bot va dire : 'Tu t’auto-humilies là'",
"Si tu fais emoji, le bot va dire : 'Clavier cassé ou cerveau fatigué ?'",
"Chaque fois que tu utilises ping bot, le bot répond : 'C’est pas une faute, c’est une tragédie'",
"Si tu fais cringe, le bot va dire : 'Désinstalle-toi'",
"Le bot te clashe automatiquement quand tu emoji : 'Arrête le massacre'",
"Le bot te renvoie : 'T'as demandé un ban ou quoi ?' si tu cringe",
"Si tu fais langage sms, le bot va dire : 'Tu veux qu’on t’aide à te relire ?'",
"Le bot te renvoie : 'On dirait un bot cassé' si tu gifs",
"Le bot te clashe automatiquement quand tu questions relou : 'T'es le bug de la matrice'",
"Le bot te renvoie : 'Arrête le massacre' si tu cringe",
"Si tu fais générateur de hontes, le bot va dire : 'On est plusieurs à vouloir que tu te taises'",
"Le bot te renvoie : 'Je suis un bot mais j’ai honte pour toi' si tu copié-collé",
"Si tu fais cringe, le bot va dire : 'Ton clavier a besoin de vacances'",
"Le bot te clashe automatiquement quand tu générateur de hontes : 'C’est gênant à lire'",
"Quand tu questions relou, le bot te répondra : 'On dirait une rédaction de CM1'",
"Quand tu expressions françaises, le bot te répondra : 'T’as écrit ça avec tes pieds ?'",
"Si tu fais anime, le bot va dire : 'On dirait une rédaction de CM1'",
"Si tu fais générateur de hontes, le bot va dire : 'T'es devenu un meme à toi tout seul'",
"Le bot te clashe automatiquement quand tu expressions françaises : 'Je suis un bot mais j’ai honte pour toi'",
"Chaque fois que tu utilises erreurs, le bot répond : 'Ton orthographe pleure'",
"Chaque fois que tu utilises auto-correction, le bot répond : 'On dirait un bot cassé'",
"Quand tu langage sms, le bot te répondra : 'Message inutile détecté'",
"Le bot te clashe automatiquement quand tu générateur de hontes : 'On dirait un bot cassé'",
"Chaque fois que tu utilises capslock, le bot répond : 'On a perdu des neurones là'",
"Le bot te renvoie : 'T'es le bug de la matrice' si tu emoji",
"Le bot te clashe automatiquement quand tu faux compliments : 'Je suis un bot mais j’ai honte pour toi'",
"Quand tu langage sms, le bot te répondra : 'T'es le bug de la matrice'",
"Le bot te renvoie : 'Tu fais peur à la syntaxe' si tu usurpation",
"Si tu fais copié-collé, le bot va dire : 'On a perdu des neurones là'",
"Chaque fois que tu utilises erreurs, le bot répond : 'T’as écrit ça avec tes pieds ?'",
"Le bot te clashe automatiquement quand tu langage sms : 'T'as demandé un ban ou quoi ?'",
"Si tu fais blagues pourries, le bot va dire : 'On est plusieurs à vouloir que tu te taises'",
"Quand tu gifs, le bot te répondra : 'T'es le bug de la matrice'",
"Chaque fois que tu utilises voix, le bot répond : 'C’est gênant à lire'",
"Le bot te renvoie : 'T'as demandé un ban ou quoi ?' si tu voix",
"Le bot te renvoie : 'C’est gênant à lire' si tu expressions françaises",
"Quand tu spam, le bot te répondra : 'On a perdu des neurones là'",
"Si tu fais erreurs, le bot va dire : 'Tu fais peur à la syntaxe'",
"Quand tu emoji, le bot te répondra : 'C’est gênant à lire'",
"Le bot te renvoie : 'Même ton ombre te juge' si tu générateur de hontes",
"Le bot te renvoie : 'Change de clavier stp' si tu voix",
"Si tu fais copié-collé, le bot va dire : 'Désinstalle-toi'",
"Si tu fais emoji, le bot va dire : 'On dirait une rédaction de CM1'",
"Le bot te renvoie : 'Tu fais peur à la syntaxe' si tu copié-collé",
"Si tu fais gifs, le bot va dire : 'T'es devenu un meme à toi tout seul'",
"Quand tu spam, le bot te répondra : 'Ce message sent la défaite'",
"Quand tu emoji, le bot te répondra : 'T'as demandé un ban ou quoi ?'",
"Le bot te renvoie : 'Même Siri a honte' si tu voix",
"Le bot te renvoie : 'Clavier cassé ou cerveau fatigué ?' si tu copié-collé",
"Chaque fois que tu utilises ping bot, le bot répond : 'Clavier cassé ou cerveau fatigué ?'",
"Quand tu questions relou, le bot te répondra : 'C’est gênant à lire'",
"Le bot te clashe automatiquement quand tu anime : 'Désinstalle-toi'",
"Le bot te clashe automatiquement quand tu langage sms : 'Même ton ombre te juge'",
"Le bot te renvoie : 'T'as vu ton message ?' si tu expressions françaises",
"Chaque fois que tu utilises pavé, le bot répond : 'C’est pas une faute, c’est une tragédie'",
"Le bot te renvoie : 'T'as demandé un ban ou quoi ?' si tu blagues pourries",
"Chaque fois que tu utilises usurpation, le bot répond : 'Ton clavier a besoin de vacances'",
"Le bot te renvoie : 'Ce message sent la défaite' si tu expressions françaises",
"Chaque fois que tu utilises gifs, le bot répond : 'On est plusieurs à vouloir que tu te taises'",
"Chaque fois que tu utilises ping bot, le bot répond : 'T'as demandé un ban ou quoi ?'",
"Le bot te clashe automatiquement quand tu cringe : 'Clavier cassé ou cerveau fatigué ?'",
  // ...et 400+ autres punchlines ici...
];

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  const content = message.content.toLowerCase();

  if (config.pingbot && message.mentions.has(client.user)) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (config.insultes && ['tg', 'ftg', 'salope', 'pute', 'enculé'].some(w => content.includes(w))) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (config.pave && content.length > 150) {
    return message.reply('Abrege frère t’écris trop 💀');
  }

  if (config.caps && content === content.toUpperCase() && content.length > 6) {
    return message.reply('CRIE PAS GROS 🧏‍♂️');
  }

  if (config.trigger && ['quoi','hein','oui','non','mdr','ptdr','lol'].some(w => content.includes(w))) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (config.emoji && /[🤓🤡🫠😩😭]/.test(content)) {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

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

  if (!content.startsWith(prefix)) return;
  const args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'blague') {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (command === 'insulte') {
    return message.reply(punchlines[Math.floor(Math.random() * punchlines.length)]);
  }

  if (command === 'ping') {
    return message.reply('🏓 pong');
  }

  if (command === 'help') {
    return message.reply(`**Commandes :** !blague, !insulte, !ping, !help, !config\n**Modules :** insultes, spam, emoji, trigger, pave, pingbot, punchline, caps\n**Nombre de punchlines :** ${punchlines.length}`);
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
      return message.reply('❌ Module inconnu');
    }

    config[module] = !config[module];
    return message.reply(`🔁 Module \`${module}\` est maintenant ${config[module] ? '✅ activé' : '❌ désactivé'}`);
  }
});

client.login(token);
