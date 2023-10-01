import { gql } from '@apollo/client';

export const GET_ORGANIZATION_INFO = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
        id
        businessLicense
        identityCardBackImg
        identityCardFrontImg
        tags
        desc
        name
        tel
        address
        longitude
        latitude
        logo
        frontImgs {
          id
          url
          remark
        }
        roomImgs {
          id
          url
          remark
        }
        otherImgs {
          id
          url
          remark
        }
      }
    }
  }
`;
