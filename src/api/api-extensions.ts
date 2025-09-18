import gql from "graphql-tag";

const channelPricesShopApiExtensions = gql`
  type ChannelPrice {
    price: Money!
    currencyCode: CurrencyCode!
    channel: Channel!
    customFields: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type ProductVariant {
    channelPrices: [ChannelPrice!]!
  }
`;
export const shopApiExtensions = gql`
  ${channelPricesShopApiExtensions}
`;
