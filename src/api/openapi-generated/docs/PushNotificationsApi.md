# PushNotificationsApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deactivatePushToken**](#deactivatepushtoken) | **DELETE** /notifications/tokens/{deviceId} | Hủy Push Token theo deviceId|
|[**upsertPushToken**](#upsertpushtoken) | **POST** /notifications/tokens | Lưu hoặc cập nhật Push Token|

# **deactivatePushToken**
> ApiResponseVoid deactivatePushToken()

Vô hiệu hóa push token của thiết bị khi người dùng đăng xuất

### Example

```typescript
import {
    PushNotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PushNotificationsApi(configuration);

let deviceId: string; // (default to undefined)

const { status, data } = await apiInstance.deactivatePushToken(
    deviceId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deviceId** | [**string**] |  | defaults to undefined|


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

# **upsertPushToken**
> ApiResponsePushTokenResponse upsertPushToken(upsertPushTokenRequest)

Đăng ký hoặc cập nhật FCM/WEB push token cho thiết bị của người dùng hiện tại

### Example

```typescript
import {
    PushNotificationsApi,
    Configuration,
    UpsertPushTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PushNotificationsApi(configuration);

let upsertPushTokenRequest: UpsertPushTokenRequest; //

const { status, data } = await apiInstance.upsertPushToken(
    upsertPushTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertPushTokenRequest** | **UpsertPushTokenRequest**|  | |


### Return type

**ApiResponsePushTokenResponse**

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

