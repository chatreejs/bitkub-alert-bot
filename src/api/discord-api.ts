import axios from 'axios';
import { DiscordWebHookBody } from '../core/model/discord-webhooks';
import { environment } from '../environment/environment';

export class DiscordApi {
  constructor() {}

  public sendMessage(body: DiscordWebHookBody): void {
    axios.post(
      `${environment.discordWebHookUrl}/${environment.discordWebHookId}`,
      body,
    );
  }
}
