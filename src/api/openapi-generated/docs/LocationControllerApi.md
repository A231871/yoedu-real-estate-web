# LocationControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getProvinces**](#getprovinces) | **GET** /location/provinces | |
|[**getWards**](#getwards) | **GET** /location/wards/{provinceCode} | |

# **getProvinces**
> ApiResponseListProvinceResponse getProvinces()


### Example

```typescript
import {
    LocationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationControllerApi(configuration);

const { status, data } = await apiInstance.getProvinces();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProvinceResponse**

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

# **getWards**
> ApiResponseListWardResponse getWards()


### Example

```typescript
import {
    LocationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationControllerApi(configuration);

let provinceCode: string; // (default to undefined)

const { status, data } = await apiInstance.getWards(
    provinceCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **provinceCode** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseListWardResponse**

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

