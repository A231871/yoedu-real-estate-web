# ListingUpsertRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ownerId** | **string** |  | [default to undefined]
**agentId** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**address** | **string** |  | [default to undefined]
**area** | **number** |  | [default to undefined]
**bedrooms** | **number** |  | [optional] [default to undefined]
**bathrooms** | **number** |  | [optional] [default to undefined]
**floors** | **number** |  | [optional] [default to undefined]
**listingType** | **string** |  | [default to undefined]
**propertyTypeId** | **string** |  | [default to undefined]
**wardCode** | **string** |  | [default to undefined]
**amenityIds** | **Set&lt;string&gt;** |  | [optional] [default to undefined]
**listingMediaDtos** | [**Set&lt;ListingMediaDto&gt;**](ListingMediaDto.md) |  | [optional] [default to undefined]
**price** | **number** |  | [default to undefined]

## Example

```typescript
import { ListingUpsertRequest } from './api';

const instance: ListingUpsertRequest = {
    ownerId,
    agentId,
    title,
    description,
    address,
    area,
    bedrooms,
    bathrooms,
    floors,
    listingType,
    propertyTypeId,
    wardCode,
    amenityIds,
    listingMediaDtos,
    price,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
