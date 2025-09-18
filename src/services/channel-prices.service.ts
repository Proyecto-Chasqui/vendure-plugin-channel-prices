import { Injectable } from "@nestjs/common";
import {
  ID,
  ProductVariantPrice,
  RequestContext,
  TransactionalConnection,
  Channel
} from "@vendure/core";
import { ChannelPrice } from "../types";

@Injectable()
export class ChannelPricesService {
  constructor(private connection: TransactionalConnection) { }

  async getChannelPrices(
    ctx: RequestContext,
    productVariantId: ID,
  ): Promise<ChannelPrice[]> {
    const results = await this.connection
      .getRepository(ctx, ProductVariantPrice)
      .createQueryBuilder("pvp")
      .leftJoinAndMapOne(
        "pvp.channelData",
        Channel,
        "channel",
        "channel.id = pvp.channelId"
      )
      .where("pvp.variantId = :productVariantId", { productVariantId })
      .getMany();

    return results.map((pvp: any) => ({
      price: pvp.price,
      currencyCode: pvp.currencyCode,
      channel: pvp.channelData,
      createdAt: pvp.createdAt,
      updatedAt: pvp.updatedAt,
      customFields: pvp.customFields,
    })) as ChannelPrice[];
  }
}