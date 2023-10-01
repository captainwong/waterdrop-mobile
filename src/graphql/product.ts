import { gql } from '@apollo/client';

export const GET_PRODUCT_CATEGORY = gql`
  query getProductCategories{
    getProductCategories{
      code
      message
      data{
        key
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProductInfo($id: String!){
    getProductInfo(id: $id){
      code
      message
      data{
        id
        name
        desc
        category
        stock
        sales
        limit
        price
        originalPrice
        cover
        banner
        organization{
          id
          name
        }
        cards{
          id
          name
          type
          count
          duration
          course{
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProductsH5($latitude: Float!, $longitude: Float!, $page: PageInput!, $category: String, $name: String){
    getProductsH5(latitude: $latitude, longitude: $longitude, page: $page, category: $category, name: $name){
      code
      message
      page{
        page
        pageSize
        total
      }
      data{
        id
        name
        desc
        category
        status
        stock
        sales
        limit
        price
        originalPrice
        cover
        banner
        distance
        organization{
          id
          name
        }
        cards{
          id
          name
        }
      }
    }
  }
`;

export const GET_RPODUCTS_BY_ORGANIZATION = gql`
query getProductsByOrgH5($organizationId:String!){
  getProductsByOrgH5(organizationId: $organizationId){
    code
    message
    page{
      page
      pageSize
      total
    }
    data{
      id
      name
      desc
      category
      stock
      price
      originalPrice
      cover
      banner
      distance
      organization{
        id
        name
      }
      cards{
        id
        name
      }
    }
  }
}
`;
