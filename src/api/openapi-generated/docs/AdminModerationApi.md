# AdminModerationApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getListingAuditHistory**](#getlistingaudithistory) | **GET** /admin/moderation/listings/{id}/audit | Get listing audit history|
|[**getListingAuditHistory1**](#getlistingaudithistory1) | **GET** /admin/moderation/listings/{id}/audit-history | Get listing audit history|
|[**getListingStatus**](#getlistingstatus) | **GET** /admin/moderation/listings/{id}/status | Get listing status for polling|
|[**getPendingListings**](#getpendinglistings) | **GET** /admin/moderation/listings/pending | Get pending listings|
|[**getReports**](#getreports) | **GET** /admin/moderation/reports | Get user reports|
|[**getSystemAuditLogs**](#getsystemauditlogs) | **GET** /admin/moderation/audit-logs | Get system audit logs|
|[**purgeUserGdpr**](#purgeusergdpr) | **DELETE** /admin/moderation/users/{userId}/gdpr-purge | Purge user PII under GDPR (Right to be Forgotten)|
|[**resolveReport**](#resolvereport) | **PUT** /admin/moderation/reports/{id}/resolve | Resolve a user report|
|[**suspendListing**](#suspendlisting) | **POST** /admin/moderation/listings/{id}/suspend | Suspend a listing|

# **getListingAuditHistory**
> ApiResponseListListingAuditHistoryResponse getListingAuditHistory()

Retrieves Envers revision history for a specific listing. Accessible via both /audit and /audit-history paths.

### Example

```typescript
import {
    AdminModerationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getListingAuditHistory(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseListListingAuditHistoryResponse**

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

# **getListingAuditHistory1**
> ApiResponseListListingAuditHistoryResponse getListingAuditHistory1()

Retrieves Envers revision history for a specific listing. Accessible via both /audit and /audit-history paths.

### Example

```typescript
import {
    AdminModerationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getListingAuditHistory1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseListListingAuditHistoryResponse**

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

# **getListingStatus**
> ApiResponseListingStatusResponse getListingStatus()

Lightweight status endpoint for frontend polling following suspension requests

### Example

```typescript
import {
    AdminModerationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getListingStatus(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseListingStatusResponse**

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

# **getPendingListings**
> ApiResponsePageModerationListingSummaryResponse getPendingListings()

Retrieves paginated listings with PENDING status for admin moderation

### Example

```typescript
import {
    AdminModerationApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getPendingListings(
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**ApiResponsePageModerationListingSummaryResponse**

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

# **getReports**
> ApiResponsePageReportResponse getReports()

Retrieves paginated user reports filtered by status (default PENDING)

### Example

```typescript
import {
    AdminModerationApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let pageable: Pageable; // (default to undefined)
let status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED'; // (optional) (default to 'PENDING')

const { status, data } = await apiInstance.getReports(
    pageable,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **status** | [**&#39;PENDING&#39; | &#39;UNDER_REVIEW&#39; | &#39;RESOLVED&#39; | &#39;DISMISSED&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;UNDER_REVIEW&#39; &#124; &#39;RESOLVED&#39; &#124; &#39;DISMISSED&#39;>** |  | (optional) defaults to 'PENDING'|


### Return type

**ApiResponsePageReportResponse**

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

# **getSystemAuditLogs**
> ApiResponsePageAuditLogResponse getSystemAuditLogs()

Retrieves paginated system audit logs with optional actorId and entity filters

### Example

```typescript
import {
    AdminModerationApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let pageable: Pageable; // (default to undefined)
let actorId: string; // (optional) (default to undefined)
let entityType: string; // (optional) (default to undefined)
let entityId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSystemAuditLogs(
    pageable,
    actorId,
    entityType,
    entityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **actorId** | [**string**] |  | (optional) defaults to undefined|
| **entityType** | [**string**] |  | (optional) defaults to undefined|
| **entityId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ApiResponsePageAuditLogResponse**

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

# **purgeUserGdpr**
> ApiResponseGdprPurgeResponse purgeUserGdpr()

Executes Native SQL queries to scrub PII from both users and Envers users_aud tables for a soft-deleted user.

### Example

```typescript
import {
    AdminModerationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.purgeUserGdpr(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseGdprPurgeResponse**

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

# **resolveReport**
> ApiResponseReportResponse resolveReport(resolveReportRequest)

Marks a report as RESOLVED or DISMISSED. If resolution=RESOLVED and suspendListing=true, directly sets the listing status to SUSPENDED within the same transaction and publishes a ListingSuspendedEvent after commit to notify the listing owner.

### Example

```typescript
import {
    AdminModerationApi,
    Configuration,
    ResolveReportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let id: string; // (default to undefined)
let resolveReportRequest: ResolveReportRequest; //

const { status, data } = await apiInstance.resolveReport(
    id,
    resolveReportRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resolveReportRequest** | **ResolveReportRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseReportResponse**

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

# **suspendListing**
> ApiResponseVoid suspendListing(suspendListingRequest)

Directly suspends the listing within the current transaction, publishes a ListingSuspendedEvent after commit to notify the listing owner, and returns 202 ACCEPTED.

### Example

```typescript
import {
    AdminModerationApi,
    Configuration,
    SuspendListingRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminModerationApi(configuration);

let id: string; // (default to undefined)
let suspendListingRequest: SuspendListingRequest; //

const { status, data } = await apiInstance.suspendListing(
    id,
    suspendListingRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **suspendListingRequest** | **SuspendListingRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

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

