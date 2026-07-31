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
> ApiResponsePageListingSummaryResponse getListings()


### Example

```typescript
import {
    ListingControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingControllerApi(configuration);

let listingType: 'FOR_SALE' | 'FOR_RENT'; // (default to undefined)
let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getListings(
    listingType,
    page,
    size,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingType** | [**&#39;FOR_SALE&#39; | &#39;FOR_RENT&#39;**]**Array<&#39;FOR_SALE&#39; &#124; &#39;FOR_RENT&#39;>** |  | defaults to undefined|
| **page** | [**number**] | Zero-based page index (0..N) | (optional) defaults to 0|
| **size** | [**number**] | The size of the page to be returned | (optional) defaults to 20|
| **sort** | **Array&lt;string&gt;** | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | (optional) defaults to undefined|


### Return type

**ApiResponsePageListingSummaryResponse**

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

