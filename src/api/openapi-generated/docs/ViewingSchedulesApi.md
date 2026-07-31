# ViewingSchedulesApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**cancelSchedule**](#cancelschedule) | **PUT** /viewing-schedules/{id}/cancel | Huỷ lịch hẹn|
|[**confirmSchedule**](#confirmschedule) | **PUT** /viewing-schedules/{id}/confirm | Xác nhận lịch hẹn|
|[**createSchedule**](#createschedule) | **POST** /viewing-schedules | Đặt lịch hẹn xem nhà|
|[**getById**](#getbyid) | **GET** /viewing-schedules/{id} | Lấy chi tiết lịch hẹn|
|[**getManagedSchedules**](#getmanagedschedules) | **GET** /viewing-schedules/managed | Lấy lịch hẹn quản lý|
|[**getRequestedSchedules**](#getrequestedschedules) | **GET** /viewing-schedules/requested | Lấy lịch hẹn đã yêu cầu|

# **cancelSchedule**
> ApiResponseViewingScheduleResponse cancelSchedule(cancelViewingScheduleRequest)

Client hoặc Host/Agent huỷ lịch hẹn kèm lý do (cancel_reason)

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration,
    CancelViewingScheduleRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let id: string; // (default to undefined)
let cancelViewingScheduleRequest: CancelViewingScheduleRequest; //

const { status, data } = await apiInstance.cancelSchedule(
    id,
    cancelViewingScheduleRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cancelViewingScheduleRequest** | **CancelViewingScheduleRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseViewingScheduleResponse**

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

# **confirmSchedule**
> ApiResponseViewingScheduleResponse confirmSchedule()

Xác nhận lịch hẹn đang ở trạng thái PENDING_CONFIRMATION

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.confirmSchedule(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseViewingScheduleResponse**

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

# **createSchedule**
> ApiResponseViewingScheduleResponse createSchedule(createViewingScheduleRequest)

Renter tạo yêu cầu xem nhà cho listing có trạng thái APPROVED

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration,
    CreateViewingScheduleRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let createViewingScheduleRequest: CreateViewingScheduleRequest; //

const { status, data } = await apiInstance.createSchedule(
    createViewingScheduleRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createViewingScheduleRequest** | **CreateViewingScheduleRequest**|  | |


### Return type

**ApiResponseViewingScheduleResponse**

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

# **getById**
> ApiResponseViewingScheduleResponse getById()

Xem thông tin một lịch hẹn cụ thể — chỉ client hoặc host/agent mới có quyền

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseViewingScheduleResponse**

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

# **getManagedSchedules**
> ApiResponsePageViewingScheduleResponse getManagedSchedules()

Xem danh sách lịch hẹn của các listing đang được quản lý, lọc theo status tuỳ chọn

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let pageable: Pageable; // (default to undefined)
let status: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.getManagedSchedules(
    pageable,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **status** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**ApiResponsePageViewingScheduleResponse**

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

# **getRequestedSchedules**
> ApiResponsePageViewingScheduleResponse getRequestedSchedules()

Xem danh sách lịch hẹn đã yêu cầu, lọc theo status tuỳ chọn

### Example

```typescript
import {
    ViewingSchedulesApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewingSchedulesApi(configuration);

let pageable: Pageable; // (default to undefined)
let status: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.getRequestedSchedules(
    pageable,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **status** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**ApiResponsePageViewingScheduleResponse**

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

