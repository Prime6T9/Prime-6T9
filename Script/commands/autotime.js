// Script/commands/autotime.js

module.exports.config = {
  name: "autotime",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "CYBER TEAM",
  description: "Auto Time Message System (Bangladesh Time)",
  commandCategory: "system",
  usages: "",
  cooldowns: 5,
};

const messages = {
  "00:00": "এখন রাত ১২ টা বাজে, মোবাইল রাখ ঘুমা...! 😕",
  "01:00": "রাত ১টা বাজতে চললো, তোরা চ্যাটিং অফ কর...! 🙂",
  "04:00": "ভোর ৪টা বাজে, ফজরের নামাজ পড়ে নাও 🕌",
  "06:00": "সকাল ৬টা বাজে 🌸, ফ্রেশ হয়ে যাও সবাই",
  "08:00": "সকাল ৮টা বাজে 🏃, কাজে/ক্লাসে যাওয়ার টাইম",
  "12:00": "এখন দুপুর ১২টা ☀️, লাঞ্চ করার টাইম!",
  "15:00": "বিকাল ৩টা বাজে 📱, আড্ডার টাইম!",
  "18:00": "সন্ধ্যা ৬টা বাজে 🕌, মাগরিবের নামাজ পড়ো",
  "23:00": "রাত ১১টা বাজে 😴, ঘুমানোর সময় আসছে"
};

module.exports.onLoad = function({ api }) {
  setInterval(() => {
    const now = new Date();

    // Bangladesh Time (UTC+6)
    let hh = (now.getUTCHours() + 6) % 24;
    let mm = now.getUTCMinutes();
    hh = String(hh).padStart(2, "0");
    mm = String(mm).padStart(2, "0");

    const current = `${hh}:${mm}`;

    if (messages[current]) {
      global.data.allThreadID.forEach(tid => {
        api.sendMessage("⏰ " + messages[current], tid);
      });
    }
  }, 60 * 1000); // প্রতি মিনিটে চেক করবে
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage("✅ AutoTime চালু আছে (Bangladesh Time অনুযায়ী)।", event.threadID);
};
