import Discord from 'discord.js';
import fs from 'fs';
import weatherData from './commands/weather.js';
const json = JSON.parse(fs.readFileSync("./config/config.json"));
const APIAuth = json.APIKEY;
const token = json.token;
const prefix = json.prefix;
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Updated ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: ".WeatherHelp for info" }, status: "idle" }).catch(console.error)
});

// .WeatherHelp Embed
const weatherHelpEmbed = {
  color: 0x0099ff,
  author: {
    name: 'View a given cities current weather conditions:',
  },
  fields: [
    {
      name: 'Example use:',
      value: '*.Weather Miami* \n Will return Miami Florida\'s weather',
    },
    {
      name: 'Github open Source:',
      value: 'https://github.com/JordonGarcia/WeatherBotDiscord',
    },
    {
      name: 'Data API Provider:',
      value: 'https://openweathermap.org',
    }
  ],
  timestamp: new Date(),
  footer: {
    text: 'Weather Live',
  },
};

// Basic Commands
client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  let args = message.content.toLowerCase().substring(prefix.length).slice().split(/ /);
  let command = args.shift();

  switch (command) {
    case 'weatherhelp':
      message.channel.send({ embed: weatherHelpEmbed });
      break;

    case 'weather':
      weatherData(message, args, APIAuth);
      break;
  }
});

client.login(token);

// TODO:

// Add API request cool down to prevent overuse and spam.
// Require users to specify country / state / province, to make sure they are getting the right location.
// Add weatherHelp command that contains a key of all commands.
// Add more information such as .weather exampleCity sunset", or .weather exampleCity All" which display all weather information.
// Add ability to selectively choose cities and save them to "you" for example, .weatherAdd New York adds new york to your profile,
// Only you have access to see your cities for privacy reasons, and only works via DM.So you can do .weather myCities and it displays all your cities weather.
// Add weather maps and live radar and updated satellite imagery.