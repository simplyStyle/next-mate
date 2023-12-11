import { gql } from 'urql';

export const queryMe = gql`
  query nextMe {
    me {
      id
      identifier
    }
  }
`;
