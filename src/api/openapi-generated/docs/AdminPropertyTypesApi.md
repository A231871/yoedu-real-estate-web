# AdminPropertyTypesApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createPropertyType**](#createpropertytype) | **POST** /admin/property-types | Create property type|
|[**deletePropertyType**](#deletepropertytype) | **DELETE** /admin/property-types/{id} | Delete property type|
|[**getAllPropertyTypes**](#getallpropertytypes) | **GET** /admin/property-types | Get all property types|
|[**getPropertyTypeById**](#getpropertytypebyid) | **GET** /admin/property-types/{id} | Get property type by ID|
|[**updatePropertyType**](#updatepropertytype) | **PUT** /admin/property-types/{id} | Update property type|

# **createPropertyType**
> ApiResponsePropertyTypeResponse createPropertyType(updatePropertyTypeRequest)

Creates a new property type

### Example

```typescript
import {
    AdminPropertyTypesApi,
    Configuration,
    UpdatePropertyTypeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPropertyTypesApi(configuration);

let updatePropertyTypeRequest: UpdatePropertyTypeRequest; //

const { status, data } = await apiInstance.createPropertyType(
    updatePropertyTypeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePropertyTypeRequest** | **UpdatePropertyTypeRequest**|  | |


### Return type

**ApiResponsePropertyTypeResponse**

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

# **deletePropertyType**
> ApiResponseVoid deletePropertyType()

Deletes a property type by ID

### Example

```typescript
import {
    AdminPropertyTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPropertyTypesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deletePropertyType(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **getAllPropertyTypes**
> ApiResponseListPropertyTypeResponse getAllPropertyTypes()

Retrieves all property types ordered by sortOrder

### Example

```typescript
import {
    AdminPropertyTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPropertyTypesApi(configuration);

const { status, data } = await apiInstance.getAllPropertyTypes();
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

# **getPropertyTypeById**
> ApiResponsePropertyTypeResponse getPropertyTypeById()

Retrieves a specific property type by its ID

### Example

```typescript
import {
    AdminPropertyTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPropertyTypesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getPropertyTypeById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePropertyTypeResponse**

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

# **updatePropertyType**
> ApiResponsePropertyTypeResponse updatePropertyType(updatePropertyTypeRequest)

Updates an existing property type and publishes PropertyTypeUpdatedEvent

### Example

```typescript
import {
    AdminPropertyTypesApi,
    Configuration,
    UpdatePropertyTypeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPropertyTypesApi(configuration);

let id: number; // (default to undefined)
let updatePropertyTypeRequest: UpdatePropertyTypeRequest; //

const { status, data } = await apiInstance.updatePropertyType(
    id,
    updatePropertyTypeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePropertyTypeRequest** | **UpdatePropertyTypeRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePropertyTypeResponse**

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

