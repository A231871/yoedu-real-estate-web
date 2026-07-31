# ListingViewsApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**registerView**](#registerview) | **POST** /listing/{listingId}/views | Ghi nhận lượt xem|

# **registerView**
> ApiResponseVoid registerView()

Dedup theo IP/ngày UTC (chống F5 bot), INCR Redis buffer kèm metadata IP/user. Cron flush: Lua GETDEL count + snapshot events → INSERT listing_views.

### Example

```typescript
import {
    ListingViewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ListingViewsApi(configuration);

let listingId: string; // (default to undefined)

const { status, data } = await apiInstance.registerView(
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

