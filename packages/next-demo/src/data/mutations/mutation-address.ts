import { gql } from 'urql';
import { FRAGMENT_ADDRESS } from '../fragments';
/**
 * Create a new Customer Address
 */
export const mutationCreateCustomerAddress = gql`
  mutation nextCreateCustomerAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      ...Address
    }
  }
  ${FRAGMENT_ADDRESS}
`;

/**
 * Update an existing Address
 */
export const mutationUpdateCustomerAddress = gql`
  mutation nextUpdateCustomerAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      ...Address
    }
  }
  ${FRAGMENT_ADDRESS}
`;

/**
 * Delete an existing Address
 */
export const mutationDeleteCustomerAddress = gql`
  mutation nextDeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      __typename
      ... on Success {
        success
      }
    }
  }
`;
