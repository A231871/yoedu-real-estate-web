# MessagingApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getConversations**](#getconversations) | **GET** /messages/conversations | List user conversations|
|[**getMessages**](#getmessages) | **GET** /messages/conversations/{conversationId}/messages | Get message history|
|[**markAsRead1**](#markasread1) | **PUT** /messages/conversations/{conversationId}/read | Mark messages as read|
|[**sendMessage**](#sendmessage) | **POST** /messages/conversations/{conversationId}/messages | Send message (REST)|
|[**startConversation**](#startconversation) | **POST** /messages/conversations | Start or get conversation|

# **getConversations**
> ApiResponseListConversationResponse getConversations()

Returns all active conversations for the authenticated user with per-user unreadCount.

### Example

```typescript
import {
    MessagingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagingApi(configuration);

const { status, data } = await apiInstance.getConversations();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListConversationResponse**

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

# **getMessages**
> ApiResponseSliceMessageResponse getMessages()

Returns a paginated Slice of messages (sorted DESC by createdAt to show newest first).

### Example

```typescript
import {
    MessagingApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagingApi(configuration);

let conversationId: string; // (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getMessages(
    conversationId,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conversationId** | [**string**] |  | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**ApiResponseSliceMessageResponse**

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

# **markAsRead1**
> ApiResponseVoid markAsRead1()

Marks all unread messages (sent by others) in the conversation as read and resets the caller\'s unread counter.

### Example

```typescript
import {
    MessagingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagingApi(configuration);

let conversationId: string; // (default to undefined)

const { status, data } = await apiInstance.markAsRead1(
    conversationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conversationId** | [**string**] |  | defaults to undefined|


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

# **sendMessage**
> ApiResponseMessageResponse sendMessage(sendMessageRequest)

Saves a message and broadcasts it to /topic/conversation/{conversationId} via STOMP.

### Example

```typescript
import {
    MessagingApi,
    Configuration,
    SendMessageRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagingApi(configuration);

let conversationId: string; // (default to undefined)
let sendMessageRequest: SendMessageRequest; //

const { status, data } = await apiInstance.sendMessage(
    conversationId,
    sendMessageRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sendMessageRequest** | **SendMessageRequest**|  | |
| **conversationId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseMessageResponse**

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

# **startConversation**
> ApiResponseConversationResponse startConversation()

Returns an existing conversation or creates one. Handles both client-initiated and host-initiated starts.

### Example

```typescript
import {
    MessagingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagingApi(configuration);

let listingId: string; // (default to undefined)
let participantId: string; // (default to undefined)

const { status, data } = await apiInstance.startConversation(
    listingId,
    participantId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **listingId** | [**string**] |  | defaults to undefined|
| **participantId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseConversationResponse**

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

