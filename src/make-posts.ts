import { Bot } from "@skyware/bot";
import { LABELS } from "./constants.ts";
import { writeFile } from "node:fs/promises";

const bot = new Bot({service: "https://hooray.social"});
await bot.login({
  identifier: process.env.BSKY_IDENTIFIER,
  password: process.env.BSKY_PASSWORD,
});

const post = await bot.post({
  text: `Like the replies to this post to receive labels for ${process.argv[2].toUpperCase()} teams.`,
  threadgate: { allowLists: [] }
});

for (let label of LABELS) {
  if (label.identifier.startsWith(`${process.argv[2].toLowerCase()}-`)) {
    const reply = await post.reply({ text: label.locales[0].name });
    label.rkey = reply.uri.split("/").pop();
  }
}

await writeFile("newlabels.json", JSON.stringify(LABELS)).then(x => process.exit(0));
