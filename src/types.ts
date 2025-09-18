import { Channel } from '@vendure/core';

export type ChannelPrice = {
  price: number;
  currencyCode: string;
  channel: Channel;
  createdAt: Date;
  updatedAt: Date;
  customFields?: { [key: string]: any };
};
