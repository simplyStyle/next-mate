import { gql } from 'urql';

export const FRAGMENT_ADDRESS = gql`
  fragment Address on Address {
    id
    createdAt
    updatedAt
    fullName
    company
    streetLine1
    streetLine2
    province
    country {
      id
      code
      name
    }
    city
    phoneNumber
    customFields
    postalCode
    defaultBillingAddress
    defaultShippingAddress
  }
`;
