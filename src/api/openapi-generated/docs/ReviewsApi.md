# ReviewsApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createReview**](#createreview) | **POST** /reviews | Create a verified review|
|[**getListingFeedback**](#getlistingfeedback) | **GET** /reviews/listing/{listingId}/feedback | Get paginated feedback for a listing|
|[**getReviews**](#getreviews) | **GET** /reviews | List reviews|
|[**replyToReview**](#replytoreview) | **POST** /reviews/{reviewId}/reply | Host replies to a review|
|[**reportListing**](#reportlisting) | **POST** /reports | Report a listing|

# **createReview**
> ApiResponseReviewResponse createReview(createReviewRequest)

Submit a review for a listing. A COMPLETED viewing schedule for that listing is required.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    CreateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let createReviewRequest: CreateReviewRequest; //

const { status, data } = await apiInstance.createReview(
    createReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReviewRequest** | **CreateReviewRequest**|  | |


### Return type

**ApiResponseReviewResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getListingFeedback**
> ApiResponsePageReviewResponse getListingFeedback()

Returns all visible, non-hidden reviews for the given listing, paginated.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let listingId: string; // (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getListingFeedback(
    listingId,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingId** | [**string**] |  | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**ApiResponsePageReviewResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReviews**
> ApiResponsePageReviewResponse getReviews()

Retrieve paginated reviews filtered by listingId or hostId. Provide exactly one of the two query parameters.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let pageable: Pageable; // (default to undefined)
let listingId: string; //Filter reviews by listing ID (optional) (default to undefined)
let hostId: string; //Filter reviews by host user ID (optional) (default to undefined)

const { status, data } = await apiInstance.getReviews(
    pageable,
    listingId,
    hostId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **listingId** | [**string**] | Filter reviews by listing ID | (optional) defaults to undefined|
| **hostId** | [**string**] | Filter reviews by host user ID | (optional) defaults to undefined|


### Return type

**ApiResponsePageReviewResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **replyToReview**
> ApiResponseReviewResponse replyToReview(replyToReviewRequest)

The host of the listing may post a single reply to a review. Only the listing host is authorised. Editing an existing reply is not supported.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    ReplyToReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: string; // (default to undefined)
let replyToReviewRequest: ReplyToReviewRequest; //

const { status, data } = await apiInstance.replyToReview(
    reviewId,
    replyToReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **replyToReviewRequest** | **ReplyToReviewRequest**|  | |
| **reviewId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseReviewResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportListing**
> ApiResponseVoid reportListing(createReportRequest)

Submit a fraud / inaccuracy / inappropriate-content report for a listing. Allowed reasons: FRAUD, DUPLICATE, WRONG_INFO, INAPPROPRIATE_CONTENT, WRONG_PRICE, ALREADY_RENTED, OTHER.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    CreateReportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let createReportRequest: CreateReportRequest; //

const { status, data } = await apiInstance.reportListing(
    createReportRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReportRequest** | **CreateReportRequest**|  | |


### Return type

**ApiResponseVoid**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

