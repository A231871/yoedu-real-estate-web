# UserProfileApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getProfile**](#getprofile) | **GET** /api/users/profile | Get User Profile|
|[**updateProfile**](#updateprofile) | **PUT** /api/users/profile | Update User Profile|

# **getProfile**
> ApiResponseUserProfileResponse getProfile()

Retrieves the profile of the currently authenticated user

### Example

```typescript
import {
    UserProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserProfileApi(configuration);

const { status, data } = await apiInstance.getProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseUserProfileResponse**

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

# **updateProfile**
> ApiResponseUserProfileResponse updateProfile(updateProfileRequest)

Updates contact information and avatar for the current user

### Example

```typescript
import {
    UserProfileApi,
    Configuration,
    UpdateProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserProfileApi(configuration);

let updateProfileRequest: UpdateProfileRequest; //

const { status, data } = await apiInstance.updateProfile(
    updateProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProfileRequest** | **UpdateProfileRequest**|  | |


### Return type

**ApiResponseUserProfileResponse**

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

