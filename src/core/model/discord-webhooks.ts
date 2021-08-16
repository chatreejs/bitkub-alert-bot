// See infomation https://gist.github.com/Birdie0/78ee79402a4301b1faf412ab5f1cdcf9
export interface DiscordWebHookBody {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: DiscordEmbed[];
}

export interface DiscordEmbed {
  author?: DiscordEmbedAuthor;
  title?: string;
  url?: string;
  description?: string;
  color?: number;
  fields?: DiscordField[];
  thumbnail?: DiscordThumbnail;
  image?: DiscordImage;
  footer?: DiscordFooter;
}

export interface DiscordEmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface DiscordField {
  name?: string;
  value?: string;
  inline?: boolean;
}

export interface DiscordThumbnail {
  url?: string;
}

export interface DiscordImage {
  url?: string;
}

export interface DiscordFooter {
  text?: string;
  icon_url?: string;
}
