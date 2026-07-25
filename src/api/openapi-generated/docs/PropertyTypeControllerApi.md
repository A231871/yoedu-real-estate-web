# PropertyTypeControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPropertyTypes**](#getpropertytypes) | **GET** /property-type | |

# **getPropertyTypes**
> ApiResponseListPropertyTypeResponse getPropertyTypes()


### Example

```typescript
import {
    PropertyTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PropertyTypeControllerApi(configuration);

const { status, data } = await apiInstance.getPropertyTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListPropertyTypeResponse**

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

