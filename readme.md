# Shipment Tracking API

## Overview

The Shipment Tracking API allows you to retrieve detailed information about a shipment's tracking history and status.

## Endpoint

POST https://localhost:8080/track

## Request

- **Method**: POST
- **Content-Type**: application/json

### Request Body

```json
{
    "orderNumber": "9104223295"
}
```


## Response

The API responds with a JSON object containing tracking information. The main data is stored in the `data` field, which includes the following information:

- `id` (string): A unique identifier for the shipment tracking record.
- `tracking_number` (string): The tracking number associated with the shipment.
- `courier_code` (string): The code or identifier of the courier or shipping company.
- `order_number` (string): The order number associated with the shipment.
- `created_at` (string): Date and time when the tracking information was created.
- `update_at` (string): Date and time of the last tracking information update.
- `delivery_status` (string): The status of the shipment's delivery.
- `archived` (string): Indicates whether the tracking information is archived.
- `updating` (boolean): Whether the tracking information is currently being updated.
- `source` (string): The source of the tracking information (e.g., "API").
- `destination_city` (string): Destination city or location.
- `origin_city` (string): Origin city or location.
- `pieces` (number): Number of pieces or items in the shipment.
- `substatus` (string): Additional substatus information.
- `latest_event` (string): The latest event related to the shipment.
- `latest_checkpoint_time` (string): Timestamp of the latest checkpoint event.
- `transit_time` (number): Transit time in days.
- `origin_info` (object): Information about the shipment's origin, including:
  - `courier_code` (string): Courier code.
  - `weblink` (string): Web link to the courier's website.
  - `customs_received_date` (string): Date customs clearance was received.
- `destination_info` (object): Information about the shipment's destination (currently empty).
- `track_info` (array): An array of tracking information events, each containing details about checkpoints during the shipment's journey, including:
  - `checkpoint_date` (string): Timestamp of the checkpoint event.
  - `checkpoint_delivery_status` (string): Status of the delivery checkpoint.
  - `checkpoint_delivery_substatus` (string): Additional substatus information.
  - `tracking_detail` (string): Details of the tracking checkpoint.
  - `location` (string): Location where the checkpoint event occurred.

### Example Response

```json
{
    "data": [
        {
            "id": "9a71ac3628f63b843820bddbc9fb7e35",
            "tracking_number": "9104223295",
            "courier_code": "dhl",
            "order_number": "9104223295",
            "created_at": "2023-10-24T06:48:32+00:00",
            "update_at": "2023-10-24T06:50:41+00:00",
            "delivery_status": "delivered",
            "archived": "tracking",
            "updating": false,
            "source": "API",
            "destination_city": "SUZHOU & SURROUNDING AREA",
            "origin_city": "FREMONT",
            "pieces": 1,
            "substatus": "delivered001",
            "latest_event": "Delivered, SUZHOU & SURROUNDING AREA - CHINA MAINLAND, 2023-09-15 15:00:00",
            "latest_checkpoint_time": "2023-09-15T15:00:00",
            "transit_time": 5,
            "origin_info": {
                "courier_code": "dhl",
                "weblink": "http://www.dhl.com/",
                "customs_received_date": "2023-09-14T23:13:00"
            },
            "destination_info": {
                "trackinfo": []
            },
            "track_info": [
                {
                    "checkpoint_date": "2023-09-15T15:00:00",
                    "checkpoint_delivery_status": "delivered",
                    "checkpoint_delivery_substatus": "delivered001",
                    "tracking_detail": "Delivered",
                    "location": "SUZHOU & SURROUNDING AREA - CHINA MAINLAND"
                },
                {
                    "checkpoint_date": "2023-09-15T13:44:00",
                    "checkpoint_delivery_status": "pickup",
                    "checkpoint_delivery_substatus": "pickup003",
                    "tracking_detail": "Shipment is out with courier for delivery",
                    "location": "SUZHOU & SURROUNDING AREA - CHINA MAINLAND"
                },
                // Additional track_info entries...
            ]
        }
    ],
    "status": {
        "code": 200,
        "message": "Request response is successful"
    }
}
```