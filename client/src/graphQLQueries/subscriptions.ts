import { gql } from "@apollo/client";

export const NEWS_SUBSCRIPTION = gql`
  subscription NewsFeed {
    newsFeed {
      title
      description
    }
}
`;