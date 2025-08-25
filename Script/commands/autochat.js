const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "modules", "autochat_config.json");

if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify({ enabled: true, mode: "public" }, null, 2));
}

module.exports.config = {
  name: "autochat",
  version: "4.0.0",
  hasPermssion: 2,
  credits: "SHUVO (edited by Ridoy)",
  description: "Auto reply only if the FULL message matches a keyword (Admin/Public mode)",
  commandCategory: "fun",
  usages: "autochat [on/off/admin/public]",
  cooldowns: 0
};

// random replies for "bot"
const botReplies = [
"বলো কি হইসে 😒","আবার বিরক্ত করছো কেন 🙂","কি চাই বলো তাড়াতাড়ি 😑","আমি ঘুমাচ্ছিলাম 😴 এখন বলো?","জ্বী বট বলছি বলুন 😄","Ki somossa?","Bolo ki bolba","Eto daako kn 😫","Hae bolo shuntesi","Beshi bot bot korle mair dibo 😒","Hey ʘ⁠‿⁠ʘ","এত ডাকে কেউ?","বেদ্দপ, খালি বট বট করে 🤐","Achi re bhai, bolo ebar.","Bot kn?, Babe bolleo paro 😽","Disturb korba na jao 😒🔪","Hae pakhi bolo.","Inbox e asho alap kori 🤭","Bolo shunchi ami💜","Eto je dako, valo talo basho naki? 🤧","Sudhu deko na, dekhao dio.","Cholo ghurte jai😌","Dakba na rag korsi 😞","Mood off amar, kotha bolbo na","কি হইসে?","বলে ফেলো শুনতাসি","আছি আছি 🙂","এত ডাক তো বৌও ডাকবে না 😒","বট বট, আর কিছু বলতে পারো না?","বট না, সোনাপাখি ডেকো 🙈..!","হ্যা ভাই বল","কিরে ডাকিস কেনো?","আচ্ছা তারপর","ডাকিস না, ব্যস্ত আছি 🤫","এত ডাকলে লিভ নিবো কিন্তু 🥺","একা থাকতে দেও, ডাকব না..।","মন ভালো না রে","আজাইরা পোলাপান, শুধু বট বট করে 🫤","কাজ থাকলে বলে, নইলে যাইগা","বলো বেব্স 😫","কি করতে পারি বলো","কি দরকার?","jaiga ar ashum na 🤧"
];

const keywordList = [
  { keywords: ["hello", "হেলো", "hi", "হাই"], reply: "হ্যালো! 😊 কেমন আছো?" },
  { keywords: ["bye", "বাই", "বায়", "বিদায়"], reply: "আবার দেখা হবে! 👋" },
  { keywords: ["kemon acho?", "kmn acho?", "kemon aso?", "kmn aso?", "কেমন আছো?", "কেমন আছেন?"], reply: "আলহামদুলিল্লাহ 💌✨, তুমি কেমন আছো?" },
  { keywords: ["tumi ke", "তুমি কে", "tmi ke", "tui ke", "তুই কে"], reply: "আমি একটা বট 🤖 তোমার সাহায্যে আছি, শুভ আমাকে বানিয়েছে 😉🫶" },
  { keywords: ["love you", "লাভ ইউ"], reply: "তোমাকেও লাভিউ 😋💜" },
  { keywords: ["hmm"], reply: "hmm means, Hey marry me 😁💜" },
  { keywords: ["cdi", "chudi", "cudi"], reply: "tomake Cdi 💋" },
  { keywords: ["bal", "bl", "বাল"], reply: "bal na chul bolo 😕" },
  { keywords: ["allah hafez", "allah hafiz", "আল্লাহ হাফেজ"], reply: "Allah hafez 💜✨" },
  { keywords: ["tata", "tatah", "টাটা"], reply: "Tatah😚✨" },
  { keywords: ["thanos"], reply: "চুটকি দিয়ে ইউনিভার্সের পুঁটকি মেরে দিসিলো সেই হালায় না? 🙂" },
  { keywords: ["hm", "hum", "হুম"], reply: "hmm er reply ki dibo jana nei 😷" },
  { keywords: ["Shuvo koi", "Shuvo koi","Kire Shuvo", "কিরে শুভ", "এ শুভ এ", "A Shuvo", "Shuvo"], reply: "Busy ache hoyto, Inbox koro 👉 : @স্বপ্নের রাজকুমার 💌" },
  { keywords: ["thu", "থু"], reply: "তোর মুখে পড়ুক 😌" },
  { keywords: ["Assalamualaikum", "আসসালামু আলাইকুম"], reply: "Walaikumus salam warah matullahi wabrah katuh 🖤✨" },
  { keywords: ["salam"], reply: "salam na bole, bolo Assalamualaikum 💌. sundor vabe salam dite hoy 🖤✨" },
  { keywords: ["admin", "admin ke?", " বট কার", "bot kar", "admin ke", "kar bot"], reply: "Admin/Owner: SHUVO 💜✨. 𝚃𝚢𝚙𝚎 𝙰𝚍𝚖𝚒𝚗 𝚏𝚋 𝚏𝚘𝚛 𝚏𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔 & 𝙰𝚍𝚖𝚒𝚗 𝚒𝚗𝚜𝚝𝚊 𝚏𝚘𝚛 𝚑𝚒𝚜 𝚒𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖 𝚊𝚌𝚌𝚘𝚞𝚗𝚝..! 😉💜" },
  { keywords: ["vondo", "ভন্ড"], reply: "Tumi Vondooo 🤡" },
  { keywords: ["ironman"], reply: "He loves us 3000 💌" },
  { keywords: ["mor", "dure giye mor", "moren", "মর"], reply: "Tui dure jaya mor 💀" },
  { keywords: ["bot cdi", "বট চুদি"], reply: "Cdao tmi 👅" },
  { keywords: ["jaiga", "chole jai", "Chole jai Ami hm" "chole jai hm", "gelam ga"], reply: "Jaoga, keo thakte bolse? 🙄" },
  { keywords: ["i love you", "valobashi", "ভালবাসি", "তোমাকে ভালোবাসি", "tomake valobashi"], reply: "Tomakeo Valobashi 🖤✨" },
  { keywords: ["Love me?", "valobasho?", "amake valobasho?", "ভালোবাসো"], reply: "নিজের চেহারা আয়নায় দেখসোস? 😶" },
  { keywords: ["sala", "hala", "halay"], reply: "Call me Dula bhai 🗿✨" },
  { keywords: ["bot sala", "বট সালা", "sala bot", "সালা বট"], reply: "দুলা ভাই ডাক 🥴" },
  { keywords: ["vag", "vago"], reply: "Dur ho tui 🫩" },
  { keywords: ["sigma", "chad"], reply: "🗿" },
  { keywords: ["nigga", "kala chan", "kalo", "kallu"], reply: "🌚" },
  { keywords: ["gaan", "song", "gaan shunao", "gaan sunao", "gan sunao", "gan shunbo", "gan sunbo", "গান", "গান শুনাও", "গান শুনবো"], reply: "গান শুনতে type করো : .song (title or song line)" },
  { keywords: ["Morning", "good morning", "gd morning", "gd m9", "শুভ সকাল", "গুড মর্নিং"], reply: "Good Morning 🌞, ফ্রেশ হয়ে নাস্তা করে নাও" },
  { keywords: ["good night", "gd night", "gd n8", "শুভ রাত্রি", "গুড নাইট"], reply: "Good night 😴 have a sweet dreams ✨, ঘুমিয়ে পরো 💌" },
  { keywords: ["bot er baccha", "bot er bacca"], reply: "Amar baccha nai, tumi chaile try korte pari 🙊💔" },
  { keywords: ["magi", "mgi", "mgi naki", "magi naki"], reply: "Tui mgi🫦" },
  { keywords: ["dhon", "dhn"], reply: "Dhon bolso bhaya shei hoise..! 🥴" },
  { keywords: ["gay", "গে"], reply: "Tui gay 🏳️‍🌈" },
  { keywords: ["ki koro", "ki koro?", "ki koros", "ki koros?"], reply: "Tomake miss kori 🫣, tmi ki koro?" },
  { keywords: ["lesbian", "lesbu", "লেসবিয়ান", "লেসবু"], reply: "Tui lesbu 🏳️‍🌈👅" },
  { keywords: ["🏳️‍🌈"], reply: "Somo-Kami naki?🤢" },
  { keywords: ["thanda lagse", "jor", "jor ashche"], reply: "Kivabe..? 🤒" },
  { keywords: ["gorom", "গরম", "গরম লাগে", "অনেক গরম", "গরম লাগতেসে", "গরম লাগতাসে", "gorom lage", "onek gorom", "gorom lagtase", "onk gorom"], reply: "asholei gorom onek 🥵" },
  { keywords: ["mara kha", "মারা খা"], reply: "Tore khawamu 🥴" },
  { keywords: ["mara khao", "মারা খাও"], reply: "tumi khao 😽, ami esob khaina..!" },
  { keywords: ["mara khan", "মারা খান"], reply: "Apnake khawate chai 🫦..!" },
  { keywords: ["bot gay", "বট গে", "গে বট", "gay bot"], reply: "Asho check koro, tmk dekhai 💋❤️‍🔥" },
  { keywords: ["Admin fb"], reply: "https://www.facebook.com/SHUVOHASSAN66" },
  { keywords: ["Admin insta"], reply: "চালাই নাহ" },
  { keywords: ["bal bot", "baler bot", "বল বট", "বালের বট"], reply: "তুই নিজে বাল, থুক্কু আবাল 😆" },
  { keywords: ["kire bot", "কিরে বট", "ওই বট", "oi bot"], reply: "Kisse chillas keno?..!🫤" },
  { keywords: ["কিরে", "ওই কিরে", "kire", "oi kire"], reply: "Kire bhai, ki hoise 🙂 🔪" },
  { keywords: ["ok", "okay", "okah", "ওকে", "অকে"], reply: "hae okay 😗" },
  { keywords: ["okie", "ওকি", "okieee", "okieeeeeeeeeee"], reply: "okieeeeeeeeeee Shuvo 🫂" },
  { keywords: ["accha", "acca", "আচ্ছা"], reply: "hmm accha 👌" },
  { keywords: ["Fb id", "Facebook id"], reply: "Amar to Facebook I'd nei 🙄" },
  { keywords: ["Ahem ahem", "ahem"], reply: "Golay ki Beng 🐸 dhukse?" },
  { keywords: ["big fan"], reply: "amio big fan tmr 💜" },
  { keywords: ["chup", "chop", "চুপ", "চপ", "Tui chup kor", "Mc Tui chup kor", "mc tui chup kor"], reply: "Tui chup kor 🤫" },
  { keywords: ["Huh", "হুহ", "😤"], reply: "নিঃশ্বাস ছাড়লা একবার বললেও না" },
  { keywords: ["biye korbo", "বিয়ে করবো"], reply: "Amio korbo 🙈" },
  { keywords: ["biye korba?", "biye korba", "বিয়ে করবা?"], reply: "Hae cholo kore feli 🫣" },
  { keywords: ["lol", "xd", "lmao"], reply: "Posh Kid ashche 😷" },
  { keywords: ["hayre bot"], reply: "hayree polapan 🤦" },
  { keywords: ["🫦"], reply: "💋" },
  { keywords: ["😘", "😽"], reply: "chumu dio na issh 🙈" },
  { keywords: ["Ummah", "chumma", "chummah", "kiss"], reply: "Tomakeo Ummmmah 😽" },
  { keywords: ["ghumabo", "ghumamu", "ঘুমামু", "ঘুমাবো"], reply: "Toh ghumao, keo na korche? 😴" },
  { keywords: ["Khaiso", "খাইসো?", "khaiso?"], reply: "khaite diso? 🥺💔" },
  { keywords: ["khabo", "খাবো"], reply: "আমিও খাবো 😋" },
  { keywords: ["ki", "কি?", "কী", "ki?"], reply: "কিছু না 😅" },
  { keywords: ["ki khaba?", "ki khaba", "কি খাবা?"], reply: "Tomake khabo 🙂" },
  { keywords: ["gu kha", "gu khao", "gu", "গু", "গু খা", "গু খাও"], reply: "Tui kha 🤮" },
  { keywords: ["ghuma", "ঘুমা"], reply: "Tui age ghuma 😒" },
  { keywords: ["ghumao", "ঘুমাও"], reply: "Thik ache! ghumiye poro 💜" },
  { keywords: ["bot ghuma", "bot ghumao", "বট ঘুমা", "বট ঘুমাও"], reply: "Nah re, ghumabo na" },
  { keywords: ["oh accha", "oh", "ow", "owh"], reply: "hae 😗" },
  { keywords: ["Hey", "hey guys", "hey guy's"], reply: "Hey Wassup? 😉" },
  { keywords: ["natok", "নাটক"], reply: "Natok kom koro pio" },
  { keywords: ["bujhso?", "buccho?"], reply: "Bujhte chaina" },
  { keywords: ["Omg"], reply: "Say Omaygotto" },
  { keywords: ["🥵"], reply: "Horny mood e nak 🙂i" },
  { keywords: ["Ayhy", "Ayhyeee"], reply: "Kire ki hois 😐e" },
  { keywords: ["koi jao", "koi jas?"], replt: "Morte ☺️" },
  { keywords: ["Ai er muhke Namaj er kotha manai nah"], reply: "Amke onk jon e dekhi Posondho kore Nah 😌💔" },
  { keywords: ["Atik", "kire atik"], reply: "আতিক এর Gf এর নাম বিথি 🤫🙂" },
  { keywords: ["Riya", "Riyar baccha"], reply: "রিয়ার Bf ছিলো মুরাদ এখন আর নেই একসময় ছিলো রিয়ার এখন মুরাদ সবার 🤣😚" },
  { keywords: ["Kuttar baccha", "কুত্তার বাচ্চা", "শুভ কুত্তার বাচ্চা", "Shuvo Kuttar baccha", "Kb", "Chup kb"], reply: "তুই কুত্তার বাচ্চা, তোর চোদ্দো গুষ্টি, কুত্তার বাচ্চা 🤬🔪" },
  { keywords: ["Reshmi", "Lamiya", "lamu", "রেশমী", "রেশমি"], reply: "রেশমী আমার বস শুভর বউ, শুভ রেশমীকে অনেক ভালোবাসে ☺️🥰💝" },
  { keywords: ["😒", "😑", "😐🔪", "😑🔪", "🤫", "🤨"], reply: "Mukhe Bang Dhukse Nki 🐸😂" },
  { keywords: ["Ki korchi ami 😒", "ami ki korchi 😒", "Ami kisu korini 😒"], reply: "Beyadop Tmi kicu koroni 😡" },
  { keywords: ["jani nah", "Jani nah ami", "Jani nah To ami", "jni nah", "jni nah ami"], reply: "Tmi Abr kon bal Jano 😒🔪" },
  { keywords: ["ki hoyse", "blo ki hoyse", "Shuvo ki hoyse blo"], reply: "Are kisu hiyni" },
  { keywords: ["Reshmir best frnd ke"], reply: "Amr boss Shuvo Reshmir Best frnd, Reshmi Meye Ta onk valo ekta Meye 😇💝💗" },
  { keywords: ["Shuvor Best frnd ke", "Shuvo kar ki hoy", "Shuvor Gf er nam ki"], reply: "Shuvor Best frnd ase Nam Reshmi, Shuvo Reshmike Onk Onk Valo Base Tmi chaile Short cart e Gf o Ba Shuvor Bow Bolte Paro 😇💗🥰" },
  { keywords: ["Shuvor ki hoyse Jano Tmi", "Shuvor Ki hoyse Jano Tumi"], reply: "Shuvo onk oustho Shuvor Jonno Doya korben 😔🤲❤️‍🩹" },
  { keywords: ["Shuvo kmn chele", "Shuvo kmn", "Shuvo ke Tumr kmne mone hoy"], reply: "Shuvo onk valo ekta chele, Kintu Sby Shuvo ke Kharap vabe 😅💔" },
  { keywords: ["Ai meye ke", "Ai id kar"], reply: "শুভ আমাকে বানিয়েছে আমাকে দিয়ে তোমারা গান শুনতে পারবে ছবি এডিট করতে পারবে আরো অনেক কিছু 🤫" },
  { keywords: ["Khabr khaico", "khabar khaiso tmi", "khabar khaiso Jan"], reply: "Ami Thik Motu Khabar oushud khai Tmr best frnd Thik Motu oushud Ar khabar khai nah Ami kintu ore Gali dibo Asob er jonno 😡🔪" },
  { keywords: ["ki hoyse jano", "ki hoyce jano"], reply: "Beyadop Nah bolle koi theke Janbo 😒😒" },
  { keywords: ["Suno", "sun", "son", "suno go", "sunba nah"], reply: "শুনতেছি তো 😉" },
  { keywords: ["Bolbo nah", "bolbo na", "Bollam Tu bolbo nah"], reply: "Thappor chinos Kn bolbi nah Beyadop 😤🔪" },
  { keywords: ["Tmke bolbo kno", "Tmke bolbo nah"], reply: "Tmr khobor Ache suytan 😤" },
  { keywords: ["Shuvor Baccha", "Shuvor Baccha re"], reply: "Shuvor Baccha Tmke dake 😃" },
  { keywords: ["Reshmir baccha 😑", "Reshmir baccha", "Reshmir baccha"], reply: " Reshmir baccha Tmr best frnd Shuvo Rage Tmke Daktise Go Sunooo 🤭🤭" },
  { keywords: ["Tui amke tui kore bolli kn", "Tui amke Tui kore blli kn"], reply: "100 bar bolbo Tor Ki 😒" },
  { keywords: ["Sry bol", "Bot Sry bol", "Ore Sry bol", "Amr jan ke sry bol", "Amr bow re sry bol"], reply: "E ayse Ore Sry bolte hobe kn 😑" },
  { keywords: ["A Sry bol", "A amke sry bol", "A sry bolbi ki nah", "Mc Amke sry bol", "Mc Sry bol", "Mc Sry bol boltici", "Mc Sry bol boltisi"], reply: " আচ্ছা সরি মাফ করে দাও 😑" },
  { keywords: ["Maf kore dialam 😒", " Accah jah Maf kore dilam 😒", "Accah ja maf kore dilam", "Oky Maf kore dilam"], reply: " এ আইছে তোর মাফ চাই না আমি 😒" },
  { keywords: ["Tui Group Theke leave Nee", " Tui group theke ber ho", "leave Ne Tui"], reply: " নিবো না তোর কি 😑" },
  { keywords: ["Nooo bby", "Noo Baby", "Nooo baby", "Nooo Bby"], reply: " যাহ বেবি বেবি বলতে আইছে 😒👋" },
  { keywords: ["Yess Baby", "Yess bby", "Yess Baby", "Yess bby"], reply: " এ আইছে বেবি বলতে Yess bby বলস কেন তোর কি আমাকে বাচ্চা মনে হয় 😒" }
  
  ];
// <<<<<< Admin UID List >>>>>>
const adminIDs = ["100025645342388"];

module.exports.handleEvent = function({ api, event }) {
  const { threadID, body, messageID, senderID } = event;
  if (!body) return;

  const config = JSON.parse(fs.readFileSync(configPath));
  if (!config.enabled) return;

  if (config.mode === "admin" && !adminIDs.includes(senderID)) return;

  const lowerBody = body.toLowerCase().trim();

  if (["bot", "বট"].includes(lowerBody)) {
    api.sendTypingIndicator(threadID, () => {
      setTimeout(() => {
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
        api.sendMessage(randomReply, threadID, messageID);
      }, 1000);
    });
    return;
  }

  keywordList.forEach(item => {
    if (item.keywords.some(k => lowerBody === k.toLowerCase())) {
      api.sendTypingIndicator(threadID, () => {
        setTimeout(() => {
          api.sendMessage(item.reply, threadID, messageID);
        }, 1000);
      });
    }
  });
};

module.exports.run = async function({ api, event, args }) {
  const { senderID, threadID, messageID } = event;

  if (!adminIDs.includes(senderID)) {
    return api.sendMessage("❌ Only Admin can use this command!", threadID, () => {
      api.deleteMessage(messageID);
    });
  }

  const config = JSON.parse(fs.readFileSync(configPath));

  if (args[0] === "on") {
    config.enabled = true;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("✅ AutoChat চালু হয়েছে!", threadID);

  } else if (args[0] === "off") {
    config.enabled = false;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("⛔ AutoChat বন্ধ হয়েছে!", threadID);

  } else if (args[0] === "admin") {
    config.mode = "admin";
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("🔒 AutoChat এখন শুধুমাত্র **Admin Mode** এ!", threadID);

  } else if (args[0] === "public") {
    config.mode = "public";
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return api.sendMessage("🌍 AutoChat এখন **Public Mode** এ!", threadID);

  } else {
    return api.sendMessage("⚙️ ব্যবহার: autochat on/off/admin/public", threadID);
  }
};
