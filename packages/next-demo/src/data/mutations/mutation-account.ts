import { gql } from 'urql';
import { FRAGMENT_CUSTOMER } from '../fragments';
/**
 * Verify a Customer email address with the token sent to that address.
 * Only applicable if authOptions.requireVerification is set to true.
 * If the Customer was not registered with a password in the registerCustomerAccount mutation, the a password must be provided here.
 */
export const mutationVerifyCustomerAccount = gql`
  mutation nextVerifyCustomerAccount($token: String!, $password: String) {
    verifyCustomerAccount(password: $password, token: $token) {
      __typename
      ... on CurrentUser {
        id
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const mutationUpdateCustomer = gql`
  mutation nextUpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      ...Customer
    }
  }
  ${FRAGMENT_CUSTOMER}
`;

export const mutationUpdateCustomerPassword = gql`
  mutation nextUpdateCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    updateCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

// https://www.vendure.io/docs/graphql-api/shop/object-types/#registercustomeraccountresult
export const mutationRegisterCustomerAccount = gql`
  # Register a Customer account with the given credentials. There are three possible registration flows
  mutation nextRegisterCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
