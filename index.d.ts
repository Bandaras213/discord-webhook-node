export type WebhookOptions = {
  url: string;
  throwErrors?: boolean;
  retryOnLimit?: boolean;
};

export class Webhook {
  constructor(options: string | WebhookOptions);
  setUsername(username: string): void;
  setAvatar(avatar: string): void;
  sendFile(filePath: string): Promise<void>;
  send(message: MessageBuilder | string): Promise<void>;
  info(
    title: string,
    fields: Array<Object>
  ): Promise<void>;
  success(
    title: string,
    fields: Array<Object>
  ): Promise<void>;
  warning(
    title: string,
    fields: Array<Object>
  ): Promise<void>;
  error(
    title: string,
    fields: Array<Object>
  ): Promise<void>;
}

export type WebhookField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type WebhookEmbed = {
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
  };
  title?: string;
  url?: string;
  thumbnail?: {
    url?: string;
  };
  image?: {
    url?: string;
  };
  timestamp?: Date;
  color?: number;
  description?: string;
  fields: WebhookField[];
  footer?: {
    text: string;
    icon_url?: string;
  };
};

export type WebhookPayload = {
  embeds: WebhookEmbed[];
};

export class MessageBuilder {
  constructor();
  getJSON(): WebhookPayload;
  setText(text: string): this;
  setAuthor(author?: string, authorImage?: string, authorUrl?: string): this;
  setTitle(title: string): this;
  setURL(url: string): this;
  setThumbnail(thumbnailUrl: string): this;
  setImage(image: string): this;
  setTimestamp(): this;
  setColor(color: number): this;
  setDescription(description: string): this;
  addField(fields: Array<Object>): this;
  setFooter(footer: string, footerImage?: string): this;
}