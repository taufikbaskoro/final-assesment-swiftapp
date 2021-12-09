import {gql} from '@apollo/client';

const ProductFragment = {
  configurable: gql`
    fragment ConfigurableProduct on ConfigurableProduct {
      configurable_options {
        id
        attribute_id
        label
        position
        attribute_code
        values {
          value_index
          label
          default_label
          store_label
          use_default_value
        }
        product_id
      }

      variants {
        product {
          name
          id
          sku
          stock_status
          image {
            url
            label
          }
        }
      }
    }
  `,

  bundle: gql`
    fragment BundleProduct on BundleProduct {
      items {
        option_id
        title
        required
        type
        position
        sku
        options {
          id
          label
          quantity
          position
          price
          price_type
          product {
            id
            name
            sku
            description {
              html
            }
            image {
              url
              label
            }
            thumbnail {
              url
              label
            }
            price_range {
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
            stock_status
            url_key
          }
        }
      }
    }
  `,
};

export const GET_PRODUCTS_BY_CATEGORIES = gql`
  query getProductsByCategoryId(
    $categoryId: String
    $currentPage: Int
    $pageSize: Int
    $sortBy: ProductAttributeSortInput
  ) {
    products(
      filter: {category_id: {eq: $categoryId}}
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sortBy
    ) {
      total_count
      items {
        id
        name
        sku
        url_key
        small_image {
          url
          label
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
      page_info {
        page_size
        current_page
        total_pages
      }
    }
  }
`;

export const GET_PRODUCTS_BY_BRAND = gql`
  query getProductsByBrand(
    $attributeId: String
    $currentPage: Int
    $pageSize: Int
    $sortBy: ProductAttributeSortInput
  ) {
    products(
      filter: {brand: {eq: $attributeId}}
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sortBy
    ) {
      total_count
      items {
        id
        name
        sku
        url_key
        small_image {
          url
          label
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
      page_info {
        current_page
        total_pages
        page_size
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query searchProducts(
    $search: String
    $currentPage: Int
    $pageSize: Int
    $sortBy: ProductAttributeSortInput
  ) {
    products(
      search: $search
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sortBy
    ) {
      total_count
      items {
        id
        name
        sku
        url_key
        small_image {
          url
          label
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
      page_info {
        current_page
        total_pages
        page_size
      }
    }
  }
`;

export const GET_PRODUCT_BY_URL_KEY = gql`
  ${ProductFragment.configurable}
  ${ProductFragment.bundle}
  query getProductByURL(
    $url_key: String
    $currentPage: Int
    $pageSize: Int
    $sortBy: ProductAttributeSortInput
  ) {
    products(
      filter: {url_key: {eq: $url_key}}
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sortBy
    ) {
      items {
        __typename
        brand
        name
        id
        stock_status
        sku
        url_key
        description {
          html
        }
        price_range {
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            regular_price {
              value
              currency
            }
            final_price {
              currency
              value
            }
          }
        }
        image {
          url
        }
        media_gallery {
          label
          url
        }
        ...ConfigurableProduct
        ...BundleProduct
      }
    }
  }
`;

export const GET_PRODUCT_REVIEWS = gql`
  query getProductReviews($sku: String!, $currentPage: Int, $pageSize: Int) {
    getProductReviews(
      sku: $sku
      currentPage: $currentPage
      pageSize: $pageSize
    ) {
      totalCount
      items {
        entity_pk_value
        nickname
        id
        detail
        created_at
        title
        ratings {
          rating_name
          value
        }
      }
    }
  }
`;

export const ADD_PRODUCT_REVIEW = gql`
  mutation addProductReview($input: ReviewInput!) {
    addProductReview(input: $input) {
      items {
        id
        entity_pk_value
        nickname
        detail
        ratings {
          rating_name
          value
          percent
        }
      }
    }
  }
`;
