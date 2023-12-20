import { gql } from "@apollo/client";

export const SEND_NEWS_EVENT = gql`
  mutation sendNewsEvent($title: String!, $description: String!) {
    sendNewsEvent(title: $title, description: $description) {
      title,
      description
    }
  }
`