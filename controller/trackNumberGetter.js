const info = [{
    orderNumber: "TBA309367834145",
    trackingNumber: "TBA309367834145",
},
{
    orderNumber: "2000003155272",
    trackingNumber: "2000003155272",
},{
    orderNumber: "114-0292795-2405840",
    trackingNumber: "TBA308626148196",
},{
    orderNumber: "04-10144-80286",
    trackingNumber: "772354242262",
},{
    orderNumber: "123456789",
    trackingNumber: "6860010537552",
},{
    orderNumber: "9104223295",
    trackingNumber: "9104223295",
}
];

export const getTrackingNumber = (orderNumber) => {
    console.log(`Trying to get tracking number for order ${orderNumber}`);
    for (const order of info) {
        console.log(`Checking order ${order.orderNumber}`);
        if (order.orderNumber === orderNumber) {
            const trackingNumber = order.trackingNumber;
            return trackingNumber;
        }
    }
    return null; // Return null if no matching order number is found
}