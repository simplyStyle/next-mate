import { gql } from 'urql';
import { FRAGMENT_ADDRESS } from './fragment-address';

export const FRAGMENT_CUSTOMER = gql`
  fragment Customer on Customer {
    id
    title
    firstName
    lastName
    emailAddress
    phoneNumber
    customFields {
      birthday
    }
    addresses {
      ...Address
    }
  }
  ${FRAGMENT_ADDRESS}
`;
