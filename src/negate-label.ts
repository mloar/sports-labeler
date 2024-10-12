import { Bot } from "@skyware/bot";

const bot = new Bot({service: "https://hooray.social"});
await bot.login({
  identifier: process.env.BSKY_IDENTIFIER,
  password: process.env.BSKY_PASSWORD,
});

const profile = await bot.getProfile(process.argv[2]);
await profile.negateAccountLabels([process.argv[3]]);
process.exit(0);
