import { gql } from 'urql';

export const FRAGMENT_ASSET = gql`
  fragment Asset on Asset {
    id
    name
    source
    preview
    width
    height
  }
`;
