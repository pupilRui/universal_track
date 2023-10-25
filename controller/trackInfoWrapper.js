import axios from 'axios';
export const trackInfoWrapper = async (orderNumber) => {
    console.log("Trying to get track info from upstream API");
    const trackingMoreAPIKey = process.env.TRACKING_MORE_API_KEY;

    // Set the API key in the request headers
    const trackingMoreHeaders = {
        'Tracking-Api-Key': trackingMoreAPIKey,
        'Content-Type': 'application/json',
    };

    // TrackingMore API endpoint for courier detection
    const detectApiUrl = 'https://api.trackingmore.com/v3/trackings/detect';

    // Request data
    const detectRequestData = {
        tracking_number: orderNumber,
    };

    // console.log(trackingMoreHeaders);

    const courierDetected = await axios.post(detectApiUrl, detectRequestData, { headers: trackingMoreHeaders });
    if (courierDetected?.data?.data?.length === 0) {
        console.log("Courier not detected");
        throw new Error('Courier not detected');
    }

    const courierCode = courierDetected.data.data[0].courier_code;

        // TrackingMore API endpoint for creating a tracking event
    const createTrackApiUrl = 'https://api.trackingmore.com/v4/trackings/create';

    // Request data
    const createTrackRequestData = {
        tracking_number: orderNumber,
        courier_code: courierCode,
    };

    const trackingMoreHeaders2 = {
        'Tracking-Api-Key': trackingMoreAPIKey,
        'Content-Type': 'application/json',
    };

    try
    {
        await axios.post(createTrackApiUrl, createTrackRequestData, { headers: trackingMoreHeaders2 });
    }
    catch (error)
    {
        console.log("ignore if already exists");
    }


    const trackingMoreApiUrl = `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${orderNumber}`;
    console.log(trackingMoreApiUrl);

    const trackingMoreHeaders3 = {
        'Tracking-Api-Key': trackingMoreAPIKey,
        'Content-Type': 'application/json',
    };

    

    // Make the GET request to the TrackingMore API
    const trackingMoreResponse = await axios.get(trackingMoreApiUrl, { headers: trackingMoreHeaders3 });
    return trackingMoreResponse?.data;
}