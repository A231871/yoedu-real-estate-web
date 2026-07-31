# FavoritesApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addFavorite**](#addfavorite) | **POST** /favorites | Thêm tin đăng vào yêu thích|
|[**getMyFavorites**](#getmyfavorites) | **GET** /favorites | Lấy danh sách yêu thích của user hiện tại|
|[**removeFavorite**](#removefavorite) | **DELETE** /favorites/{listingId} | Xóa tin đăng khỏi yêu thích|

# **addFavorite**
> ApiResponseFavoriteResponse addFavorite(addFavoriteRequest)


### Example

```typescript
import {
    FavoritesApi,
    Configuration,
    AddFavoriteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoritesApi(configuration);

let addFavoriteRequest: AddFavoriteRequest; //

const { status, data } = await apiInstance.addFavorite(
    addFavoriteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addFavoriteRequest** | **AddFavoriteRequest**|  | |


### Return type

**ApiResponseFavoriteResponse**

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

# **getMyFavorites**
> ApiResponsePageFavoriteResponse getMyFavorites()


### Example

```typescript
import {
    FavoritesApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoritesApi(configuration);

let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getMyFavorites(
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**ApiResponsePageFavoriteResponse**

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

# **removeFavorite**
> ApiResponseVoid removeFavorite()


### Example

```typescript
import {
    FavoritesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoritesApi(configuration);

let listingId: string; // (default to undefined)

const { status, data } = await apiInstance.removeFavorite(
    listingId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

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

