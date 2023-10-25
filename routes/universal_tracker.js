import express from 'express';
import {trackInfoWrapper} from '../controller/trackInfoWrapper.js';
import {getTrackingNumber} from '../controller/trackNumberGetter.js';

export const universalTracker = express.Router();

// Define a function to refine the trackingInfo object
function refineTrackingInfo(trackingInfo, orderNumber) {
    // Make a deep copy of the trackingInfo object to avoid modifying the original
    const refinedInfo = JSON.parse(JSON.stringify(trackingInfo));

    // Change the key from "meta" to "status"
    refinedInfo.status = refinedInfo.meta;
    delete refinedInfo.meta;

    // Add the orderNumber field to the first element in the data array
    refinedInfo.data[0].order_number = orderNumber;

    return refinedInfo;
}

universalTracker.post('/track', (req, res) => {
    // console.log(req.body);
    const orderNumber = req.body.orderNumber;
    try {
        if (orderNumber) {
            console.log(`Order ${orderNumber} has been received`);
            const trackNumber = getTrackingNumber(orderNumber);
            if (!trackNumber) {
                throw new Error('Tracking number not found');
            }
            console.log(`Tracking number for order ${orderNumber} is ${trackNumber}`);
            trackInfoWrapper(trackNumber).then((trackingInfo) => {
                // Refine the trackingInfo object
                const refinedTrackingInfo = refineTrackingInfo(trackingInfo, orderNumber);

                // Send the refined trackingInfo as the response
                res.status(200).json(refinedTrackingInfo);
            });
        }
        else {
            throw new Error('Order number is required');
        }
    } catch (error) {
        // Handle other errors and send an error response
        res.status(400).json({
            status: {
                code: 400,
                message: error.message,
            }
        });
    }
});