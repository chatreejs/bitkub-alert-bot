import { BitkubApi } from './api/bitkub-api';
import { DiscordApi } from './api/discord-api';
import { DiscordWebHookBody } from './core/model/discord-webhooks';

export class App {
  private bitkub = new BitkubApi();
  private discord = new DiscordApi();

  private threshold: number = 5;
  private lastestPrice: number = 0;

  constructor() {}

  public async init(symbol: string): Promise<void> {
    console.log('Initializing App...');
    console.log(`Watching price for symbol ${symbol}`);

    const discordWebhookBody: DiscordWebHookBody = {
      username: 'Sigmoid Bot',
      avatar_url:
        'https://pancakeswap.finance/images/nfts/stormy-easter-21-lg.png',
      content: 'Price alert!!',
      embeds: [
        {
          author: {
            name: 'Bitkub Price Alert',
            url: 'https://www.bitkub.com/market',
            icon_url:
              'https://pbs.twimg.com/profile_images/1208011682141757441/trKTxjGT_400x400.jpg',
          },
          title: 'BTC/THB',
          url: `https://www.bitkub.com/market/${symbol.split('/')[0]}`,
          color: 15258703,
          fields: [
            {
              name: '24H Low',
              value: 'x',
              inline: true,
            },
            {
              name: '24H High',
              value: 'x',
              inline: true,
            },
          ],
        },
      ],
    };

    while (true) {
      const symbolArray = symbol.split('/');
      const ticker = await this.bitkub.loadTickerData(
        `${symbolArray[1]}_${symbolArray[0]}`,
      );
      if (ticker) {
        // Init latest hight
        if (this.lastestPrice == 0) {
          this.lastestPrice = ticker.last;
        }
        const percentage =
          ((ticker.last - this.lastestPrice) / this.lastestPrice) * 100;
        console.log(
          `Current percentage is ${percentage.toFixed(
            2,
          )}% at ${ticker.last.toLocaleString('en-US')}`,
        );

        if (percentage >= this.threshold) {
          const msg = `${symbol} increase ${percentage.toFixed(
            2,
          )}% at ${ticker.last.toLocaleString('en-US')}`;
          console.log(msg);
          discordWebhookBody.embeds[0].description = msg;
          this.discord.sendMessage(discordWebhookBody);
          this.lastestPrice = ticker.last;
        } else if (percentage <= -this.threshold) {
          const msg = `${symbol} decrease ${percentage.toFixed(
            2,
          )}% at ${ticker.last.toLocaleString('en-US')}`;
          console.log(msg);
          discordWebhookBody.embeds[0].description = msg;
          this.discord.sendMessage(discordWebhookBody);
          this.lastestPrice = ticker.last;
        }
      } else {
        console.error(`Cannot get ticker ${symbol}`);
        return;
      }
      await sleep(5000);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
