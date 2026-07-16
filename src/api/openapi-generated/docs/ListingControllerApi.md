# ListingControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createListing**](#createlisting) | **POST** /listing | |
|[**deleteListing**](#deletelisting) | **DELETE** /listing/{id} | |
|[**getListingDetail**](#getlistingdetail) | **GET** /listing/{id} | |
|[**getListings**](#getlistings) | **GET** /listing | |
|[**updateListing**](#updatelisting) | **PUT** /listing/{id} | |

# **createListing**
> ApiResponseString createListing(listingUpsertRequest)


### Example

```typescript
import {
    ListingControllerApi,
    Configuration,
    ListingUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

let listingUpsertRequest: ListingUpsertRequest; //

const { status, data } = await apiInstance.createListing(
    listingUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingUpsertRequest** | **ListingUpsertRequest**|  | |


### Return type

**ApiResponseString**

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

# **deleteListing**
> ApiResponseString deleteListing()


### Example

```typescript
import {
    ListingControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteListing(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseString**

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

# **getListingDetail**
> ApiResponseListingDetailResponse getListingDetail()


### Example

```typescript
import {
    ListingControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getListingDetail(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseListingDetailResponse**

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

# **getListings**
> ApiResponseListListingSummaryResponse getListings()


### Example

```typescript
import {
    ListingControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

const { status, data } = await apiInstance.getListings();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListListingSummaryResponse**

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

# **updateListing**
> ApiResponseString updateListing(listingUpsertRequest)


### Example

```typescript
import {
    ListingControllerApi,
    Configuration,
    ListingUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

let id: string; // (default to undefined)
let listingUpsertRequest: ListingUpsertRequest; //

const { status, data } = await apiInstance.updateListing(
    id,
    listingUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingUpsertRequest** | **ListingUpsertRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseString**

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

