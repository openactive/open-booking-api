var OPERATIONS_MEDIA_TYPE = "application/vnd.openactive.booking+json; version=1.0";
var FEED_MEDIA_TYPE = "application/vnd.openactive.booking+json; version=1.0";
var EXAMPLE_EXTENSION_MEDIA_TYPE = "application/vnd.acmesystem.booking+json; version=0.3";
var UUID = "e11429ea-467f-4270-ab62-e47368996fe8";
var CONTEXT = "https://openactive.io/";
var EXAMPLE_EXTENSION_CONTEXT = "https://acmesystem.example.com/api/context.jsonld";
var BASE_URL = "https://example.com";
var API_PATH = "/api";


// C1

function dataExampleOrderQuoteCreationC1Request(utils, content) {
  return generateRequest("PUT", API_PATH + "/order-quote-templates/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "orderedItem": [requestOrderItem]
  });
}

function dataExampleOrderQuoteCreationC1Response(utils, content) {
  return generateResponse("200 OK", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "taxMode": fullOrderExampleContent.taxMode,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem
  });
}

function dataExampleOrderQuoteCreationC1OrderItemErrorResponse(utils, content) {
  return generateResponse("409 Conflict", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "taxMode": fullOrderExampleContent.taxMode,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteErrorOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.zeroItems,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.zeroItems
  });
}

function dataExampleOrderQuoteCreationC1ErrorResponse(utils, content) {
  return generateResponse("500 Internal Server Error", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "TemporarilyUnableToProduceOrderQuoteError",
    "description": "Temporary error occurred in the database"
  });
}


// C2

function dataExampleOrderQuoteCreationC2Request(utils, content) {
  return generateRequest("PUT", API_PATH + "/order-quotes/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem]
  });
}

function dataExampleOrderQuoteCreationC2Response(utils, content) {
  return generateResponse("200 OK", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "taxMode": fullOrderExampleContent.taxMode,
    "seller": fullOrderExampleContent.seller,
    "customer": fullOrderExampleContent.customer.person,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem
  });
}

function dataExampleOrderQuoteCreationC2OrderItemErrorResponse(utils, content) {
  return generateResponse("409 Conflict", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderQuote",
    "taxMode": fullOrderExampleContent.taxMode,
    "seller": fullOrderExampleContent.seller,
    "customer": fullOrderExampleContent.customer.person,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteErrorOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.zeroItems,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.zeroItems
  });
}

function dataExampleOrderQuoteCreationC2ErrorResponse(utils, content) {
  return generateResponse("500 Internal Server Error", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "TemporarilyUnableToProduceOrderQuoteError",
    "description": "Temporary error occurred in the database"
  });
}




function dataExampleErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "IncompleteCustomerDetailsError",
    "description": "No customer details supplied"
  });
}

function dataExampleRateLimitResponse(utils, content) {
  return generateResponseWithHeaders("429 Too Many Requests", null, OPERATIONS_MEDIA_TYPE,
    "Retry-After: 8", {
      "@context": CONTEXT,
      "type": "TooManyRequestsError",
      "description": "Rate Limit Reached. Retry in 8 seconds."
    });
}



// LATER Offer override to disable/exclude an offer.
// LATER Create a GitHub issue for 49:00 which includes pros and cons of latestCancellationBeforeStartDate vs better errors on cancellation noting "allowCustomerCancellationFullRefund"
// LATER A page on the OA docs site summarising what you can do and can't do with the OpenActive booking specification (to talk through with operators)

//TODO: Read Iain's slides and stephenage notes from a while back to check we've not missed anything

//TODO: Allow for a "lite" signup-only / no cancellation version to exist? No point, it's too simple to need a spec for that...?

//TODO: Allow multiple errors only for order creation

//TODO: - You're supposed to check price is the same, so the completed OrderQuote must be passed into the Order in order to complete the Order - does this get around any reflection issues?
// All supported properties are reflected (and stored if Order GET is implemented), however the feed is a PATCH, so essential properties should be stored by the broker and periferal properties don't need to be stored by the Booking System for more accessible implementation.

// To make errors easier, OrderQuantity is used for OrderQuote and response, and each acceptedOffer/offeredItem combo MUST be unique, hence no IDs are required. Check the errors presented for not enough space for all tickets works as expected.

//TODO: Clarify **B** vs Order Creation terms throughout

//TODO: Should we have ID in the request PUT? No, include this in a few places

//TODO: Do we force properties to be (i) reflected back and (ii) stored as part of the Orders feed by the booking system? Cons: This would limit any extension mechanism, Pros: The complete item is being passed back and forth
//TODO: Ensure somewhere it says for the Orders feed items are a "PATCH" of a subset of the properties from the original Order, and that GET is not REQUIRED so that the other properties do not need to be stored.
//TODO: Create new feed column in Order model
//TODO: Order response MUST contain all properties that are actively being stored by the Booking System, as well as the REQUIRED properties of the "Order".

//TODO: Add details somewhere about what level of info to include in orderedItems in general (required props? enough to describe the activity, or shall we list them in the model here?)
//TODO: Any properties included in the Orders Feed must be linked to the modified date, which must update if any props update.

//TODO: Specifically that maximumAttendeeCapacity, remainingAttendeeCapacity, maximumUses and remainingUses MUST NOT be included in the Order feed.

//TODO: Can we simplify the Orders feed requirement by having the "patch" payload not full sessions, and instead reference the open data.

//TODO: Open issue on this: It is the Broker's responsibility to monitor the open feeds to ensure that any updates to the events logistics (e.g. date/time) trigger notifications for the Customer.

//TODO: Errors for specific OrderItems, and how they are returned. Suggest that errors are returned against the OrderQuote items, so they can be displayed to the users, rather than the OrderQuote failing.

//TODO: Include a section on child booking?

//TODO: Error if customer cancels bofore the cancellation windows
//TODO: Ensure customer checks for cancellation window before attempting cancellation

//TODO: Error messages and failure modes (and HTTP status codes) for a failed Order/OrderQuote and all other operations

//TODO: Add error state for "orderItem is reserved by another user, and may become available again shortly" as leases are not counted in open data availabilty. This is also designed to show if leasing is becoming an issue, as the number of these errors reported can be monitored.
//TODO: Add error state for "this item is no longer available".

//TODO: Add error state for "orderItem is not bookable" [due to x?], and reference in "Definition of an Open Booking `bookable' opportunity"

//Include failure example for `Order`

//TODO: Include Error for `Order` specifying that that a conflict exists with the `orderedItem` requested, and that `OrderQuote` must be retried to get specific errors.

//TODO: Sort through errors

// How do we know which status code to use when multipe errors have conflicting status codes? Do we have an example with just one error and no array?

function dataExampleOrderCreationRequest(utils, content) {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

/*
function dataExampleOrderCreationResponse(utils, content) {
  return generateResponse("201 Created", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "id": fullOrderExampleContent.id,
    "taxMode": fullOrderExampleContent.taxMode,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}
*/

function dataExampleOrderCreationResponse(utils, content) {
  return generateResponse("201 Created", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "id": fullOrderExampleContent.id,
    "orderNumber": "AB000001",
    "taxMode": fullOrderExampleContent.taxMode,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

function dataExampleOrderCreationFromProposalRequest(utils, content) {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "orderProposalVersion": fullOrderExampleContent.orderProposalVersion,
    "payment": fullOrderExampleContent.payment
  });
}


function dataExampleOrderQuoteDeletionRequest(utils, content) {
  return generateRequest("DELETE", API_PATH + "/order-quotes/" + UUID, OPERATIONS_MEDIA_TYPE);
}

function dataExampleOrderQuoteDeletionResponse(utils, content) {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE);
}


function dataExampleOrderDeletionRequest(utils, content) {
  return generateRequest("DELETE", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE);
}

function dataExampleOrderDeletionResponse(utils, content) {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE);
}



function dataExampleOrderProposalCreationRequest(utils, content) {
  return generateRequest("PUT", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderProposal",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

function dataExampleOrderProposalCreationResponse(utils, content) {
  return generateResponse("201 Created", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderProposal",
    "id": fullOrderExampleContent.id,
    "orderNumber": "AB000001",
    "orderProposalVersion": fullOrderExampleContent.orderProposalVersion,
    "taxMode": fullOrderExampleContent.taxMode,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem,
    "payment": fullOrderExampleContent.payment,
    "lease": fullOrderExampleContent.lease
  });
}

function dataExampleOrderProposalCreationErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "IncompleteBrokerDetailsError",
    "description": "Only 'https://openactive.io/CustomerRejected' is permitted for this property."
  });
}



function dataExampleOrderProposalUpdateRequest(utils, content) {
  return generateRequest("PATCH", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "OrderProposal",
    "orderProposalStatus": "https://openactive.io/CustomerRejected",
    "orderCustomerNote": "Sorry I've actually made other plans, hope you find someone!"
  });
}

function dataExampleOrderProposalUpdateResponse(utils, content) {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE);
}

function dataExampleOrderProposalUpdateErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "PatchNotAllowedOnProperty",
    "instance": "https://openactive.io/orderProposalStatus",
    "description": "Only 'https://openactive.io/CustomerRejected' is permitted for this property."
  });
}

function dataExampleOrderProposalUpdateExcessivePropertiesErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "PatchContainsExcessiveProperties",
    "description": "PATCH includes unexpected properties that are not permitted."
  });
}








function dataExampleOrderFeedRequest(utils, content) {
  return generateRequest("GET", API_PATH + "/orders-rpde", FEED_MEDIA_TYPE);
}

function dataExampleOrderFeedResponse(utils, content) {
  return generateResponse("200 OK", null, FEED_MEDIA_TYPE, {
    "next": API_PATH + "/orders-rpde?afterTimestamp=1521565719&afterId=" + UUID,
    "items": [
      {
        "state": "updated",
        "kind": "Order",
        "id": UUID,
        "modified": 1521565719,
        "data": {
          "@context": CONTEXT,
          "type": "Order",
          "id": fullOrderExampleContent.id,
          "taxMode": fullOrderExampleContent.taxMode,
          "orderedItem": [feedOrderItem],
          "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
          "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem
        }
      }
    ]
  });
}



function dataExampleOrderCancellationRequest(utils, content) {
  return generateRequest("PATCH", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "orderedItem": [responseCancelledOrderItem]
  });
}


function dataExampleOrderCancellationSuccessResponse(utils, content) {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE);
}

function dataExampleOrderCancellationErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "CancellationNotPermittedError",
    "description": "The horse has already been fed, and cannot be put back in the box."
  });
}

function dataExampleOrderCancellationPatchPropertyErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "PatchNotAllowedOnProperty",
    "instance": "https://openactive.io/orderItemStatus",
    "description": "Only 'https://openactive.io/CustomerCancelled' is permitted for this property."
  });
}

function dataExampleOrderCancellationExcessivePropertiesErrorResponse(utils, content) {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "PatchContainsExcessiveProperties",
    "description": "PATCH includes unexpected properties that are not permitted."
  });
}

function dataExampleOrderStatusRequest(utils, content) {
  return generateRequest("GET", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE);
}

function dataExampleOrderStatusResponse(utils, content) {
  return generateResponse("200 OK", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": CONTEXT,
    "type": "Order",
    "id": fullOrderExampleContent.id,
    "taxMode": fullOrderExampleContent.taxMode,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "seller": fullOrderExampleContent.seller,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalTaxSpecification": fullOrderExampleContent.totalTaxSpecification.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}


function dataExampleExtensionWaitingListRequest(utils, content) {
  return generateRequest("POST", API_PATH + "/sessions/{session-id}/waiting-list", EXAMPLE_EXTENSION_MEDIA_TYPE, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "type": "acme:WaitingListEntry",
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person
  });
}

function dataExampleExtensionMemberBookingRequest(utils, content) {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "type": "Order",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": {
      "type": "acme:Member",
      "identifier": "MLD23947233"
    },
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": {
      "type": "acme:StoredPaymentMethod",
      "identifier": 93482
    },
  });
}

function dataExampleExtensionBespokeAgreementDetailsRequest(utils, content) {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "type": "Order",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": {
      "type": "OrderItem",
      "orderQuantity": fullOrderItemExampleContent.orderQuantity,
      "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.request,
      "orderedItem": fullOrderItemExampleContent.orderedItem.request,
      "acme:agreement": {
        "type": "acme:ContractAgreement",
        "acme:multiple": 3,
        "acme:commissionCategory": "https://acmesystem.example.com/ns/BandA" 
      }
    },
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}




function dataExampleDatasetEmbed(utils, content) {
  return generateScriptInclude({
    "@context": ["https://schema.org", "https://openactive.io/"],
    "@type": "Dataset",
    "id": "https://data.example.com/",
    "url": "https://data.example.com/",
    "name": "Acme Leisure Sessions and Facilities",
    "description": "Near real-time availability and rich descriptions relating to the sessions and facilities available from Acme Leisure, published using the OpenActive Modelling Specification 2.0.",
    "keywords": [
      "Sessions",
      "Facilities",
      "Activities",
      "Sports",
      "Physical Activity",
      "OpenActive"
    ],
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "distribution": [
      {
        "additionalType": "https://openactive.io/SessionSeries",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/session-series",
        "@type": "DataDownload",
        "name": "SessionSeries"
      },
      {
        "additionalType": "https://openactive.io/ScheduledSession",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/sessions",
        "@type": "DataDownload",
        "name": "ScheduledSession"
      },
      {
        "additionalType": "https://openactive.io/FacilityUse",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/facility-uses",
        "@type": "DataDownload",
        "name": "FacilityUse"
      },
      {
        "additionalType": "https://openactive.io/Slot",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/slots",
        "@type": "DataDownload",
        "name": "Slot"
      }
    ],
    "potentialAction": [potentialActionExampleContent],
    "discussionUrl": "https://github.com/example/opendata/issues",
    "documentation": "https://docs.example.com/",
    "inLanguage": "en-GB",
    "publisher": {
      "legalName": "Acme Leisure Ltd",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      },
      "email": "info@example.com",
      "@type": "Organization",
      "name": "Acme Leisure",
      "description": "We are able to continually reinvest in facilities, products and importantly people.",
      "url": "https://example.com/"
    },
    "datePublished": "2019-02-20T13:22:28.7743707Z",
    "schemaVersion": "https://www.openactive.io/modelling-opportunity-data/2.0/"
  });
}

function dataExamplePotentialAction(utils, content) {
  return `"potentialAction": ${jsonStringify(potentialActionExampleContent)}`;
}


var potentialActionExampleContent = {
  "@type": "OpenBookingAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://example.com/api/orders/{uuid}",
    "encodingType": ["application/vnd.openactive+jsonld; model=2.0, booking=1.0"],
    "httpMethod": "PUT"
  },
  "supportingData": {
    "@type": "DataFeed",
    "distribution": [
      {
        "@type": "DataDownload",
        "name": "Order",
        "additionalType": "https://schema.org/Order",
        "encodingFormat": ["application/vnd.openactive.booking+json; version=1.0"],
        "contentUrl": "https://example.com/api/feeds/offers"
      }
    ]
  }
};



var fullOrderExampleContent = {
  "@context": CONTEXT,
  "type": "OrderQuote",
  "id": BASE_URL + API_PATH + "/orders/" + UUID,
  "orderNumber": "", //booking system generated
  "orderProposalVersion": "https://api.example.com/order-proposals/358105b4-e571-43fa-b737-906d319c6a32/version/8eb1a6ce-3f5b-40b0-87a7-bddb4c5518bd", //booking system
  "taxMode": "https://openactive/TaxGross", //booking system
  "seller": { //booking system
    "type": "Organization",
    "identifier": "CRUOZWJ1",
    "name": "Better",
    "legalName": "Greenwich Leisure Limited",
    "description": "A charitable social enterprise for all the community",
    "url": "https://www.better.org.uk",
    "logo": {
      "type": "ImageObject",
      "url": "http://data.better.org.uk/images/logo.png"
    },
    "telephone": "020 3457 8700",
    "email": "customerservices@gll.org",
    "vatID": "GB 789 1234 56",
    "address": {
      "type": "PostalAddress",
      "streetAddress": "Alan Peacock Way",
      "addressLocality": "Village East",
      "addressRegion": "Middlesbrough",
      "postalCode": "TS4 3AE",
      "addressCountry": "GB"
    },
    "termsOfService": [
      {
        "type": "Terms",
        "name": "Privacy Policy",
        "url": "https://example.com/privacy-policy"
      },
      {
        "type": "Terms",
        "name": "Terms and Conditions",
        "url": "https://example.com/terms-and-conditions"
      }
    ]
  },
  "brokerRole": "https://openactive.io/BrokerAgent", //broker
  "broker": { //broker
    "type": "Organization",
    "name": "MyFitnessApp",
    "url": "https://myfitnessapp.example.com",
    "description": "A fitness app for all the community",
    "logo": {
      "type": "ImageObject",
      "url": "http://data.myfitnessapp.org.uk/images/logo.png"
    },
    "address": {
      "type": "PostalAddress",
      "streetAddress": "Alan Peacock Way",
      "addressLocality": "Village East",
      "addressRegion": "Middlesbrough",
      "postalCode": "TS4 3AE",
      "addressCountry": "GB"
    }
  },
  "customer": { //broker
    person: {
      "type": "Person",
      "email": "geoffcapes@example.com",
      "telephone": "020 811 8055",
      "givenName": "Geoff",
      "familyName": "Capes"
    },
    organization: {
      "type": "Organization",
      "email": "geoffcapes@example.com",
      "name": "Acme Broker"
    }
  },
  "bookingService": { //booking system
    "type": "BookingService",
    "name": "Playwaze",
    "url": "http://www.playwaze.com",
    "termsOfService": [
      {
        "type": "Terms",
        "url": "https://brokerexample.com/terms.html"
      }
    ]
  },
  "lease": { // booking system
    "type": "Lease",
    "leaseExpires": "2018-10-01T11:00:00Z"
  },
  "totalPaymentDue": { //booking system
    oneItem: {
      "type": "PriceSpecification",
      "price": 5.00,
      "priceCurrency": "GBP"
    },
    zeroItems: {
      "type": "PriceSpecification",
      "price": 0,
      "priceCurrency": "GBP"
    },
  },
  "totalTaxSpecification": {
    oneItem: [ //booking system
      {
        "type": "TaxChargeSpecification",
        "name": "VAT at 20%",
        "price": 1.00,
        "priceCurrency": "GBP",
        "rate": 0.2
      }
    ],
    zeroItems: [ //booking system
      {
        "type": "TaxChargeSpecification",
        "name": "VAT at 20%",
        "price": 0,
        "priceCurrency": "GBP",
        "rate": 0.2
      }
    ]
  },
  "payment": { // broker
    "type": "Payment",
    "name": "AcmeBroker Points",
    "identifier": "1234567890npduy2f"
  }
};


var fullOrderItemExampleContent = { //broker
  "type": "OrderItem",
  "id": "https://example.com/api/orders/123e4567-e89b-12d3-a456-426655440000/order-items/1234",
  "orderItemStatus": { //booking system
    OrderConfirmed: "https://openactive.io/OrderConfirmed",
    CustomerCancelled: "https://openactive.io/CustomerCancelled",
    SellerCancelled: "https://openactive.io/SellerCancelled",
  },
  "orderQuantity": 1,
  "allowCustomerCancellationFullRefund": true,
  "accessToken": [
    {
      "type": "Barcode",
      "text": "0123456789",
    }
  ],
  "unitTaxSpecification": [ //booking system otherwise
    {
      "type": "TaxChargeSpecification",
      "name": "VAT at 0% for EU transactions",
      "price": 1.00,
      "priceCurrency": "GBP",
      "rate": 0.2
      }
    ],
  "acceptedOffer": {
    request: {
      "type": "Offer",
      "id": "https://example.com/events/452#/offers/878"
    },
    response: {
      "type": "Offer",
      "id": "https://example.com/events/452#/offers/878",
      "description": "Winger space for Speedball.",
      "name": "Speedball winger position",
      "price": 10.00,
      "priceCurrency": "GBP",
      "validFromBeforeStartDate": "P6D",
      "latestCancellationBeforeStartDate": "P1D"
    }
  },
  "orderedItem": {
    request: {
      "type": "ScheduledSession",
      "id": "https://example.com/events/452/subEvents/132"
    },
    orderQuoteResponse: {
      "type": "ScheduledSession",
      "identifier": 123, //expanded by booking system
      "id": "https://example.com/events/452/subEvents/132",
      "eventStatus": "https://schema.org/EventScheduled",
      "maximumAttendeeCapacity": 30,
      "remainingAttendeeCapacity": 20,
      "startDate": "2018-10-30T11:00:00Z",
      "endDate": "2018-10-30T12:00:00Z",
      "duration": "PT1H",
      "superEvent": {
        "type": "SessionSeries",
        "id": "https://example.com/events/452",
        "name": "Speedball",
        "duration": "PT1H",
        "organizer": {
          "type": "Organization",
          "name": "Central Speedball Association",
          "url": "http://www.speedball-world.com"
        },
        "location": {
          "type": "Place",
          "url": "https://www.everyoneactive.com/centres/Middlesbrough-Sports-Village",
          "name": "Middlesbrough Sports Village",
          "identifier": "0140",
          "address": {
            "type": "PostalAddress",
            "streetAddress": "Alan Peacock Way",
            "addressLocality": "Village East",
            "addressRegion": "Middlesbrough",
            "postalCode": "TS4 3AE",
            "addressCountry": "GB"
          },
          "geo": {
            "type": "GeoCoordinates",
            "latitude": 54.543964,
            "longitude": -1.20978500000001
          }
        }
      }
    },
    orderResponse: {
      "type": "ScheduledSession",
      "identifier": 123, //expanded by booking system
      "id": "https://example.com/events/452/subEvents/132",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2018-10-30T11:00:00Z",
      "endDate": "2018-10-30T12:00:00Z",
      "duration": "PT1H",
      "superEvent": {
        "type": "SessionSeries",
        "id": "https://example.com/events/452",
        "name": "Speedball",
        "organizer": {
          "type": "Organization",
          "name": "Central Speedball Association",
          "url": "http://www.speedball-world.com"
        },
        "location": {
          "type": "Place",
          "url": "https://www.everyoneactive.com/centres/Middlesbrough-Sports-Village",
          "name": "Middlesbrough Sports Village",
          "identifier": "0140",
          "address": {
            "type": "PostalAddress",
            "streetAddress": "Alan Peacock Way",
            "addressLocality": "Village East",
            "addressRegion": "Middlesbrough",
            "postalCode": "TS4 3AE",
            "addressCountry": "GB"
          },
          "geo": {
            "type": "GeoCoordinates",
            "latitude": 54.543964,
            "longitude": -1.20978500000001
          }
        }
      }
    }
  }
};

var feedOrderItem = {
  "type": "OrderItem",
  "id": fullOrderItemExampleContent.id,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderConfirmed,
  "allowCustomerCancellationFullRefund": true,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.request
}

var requestOrderItem = {
  "type": "OrderItem",
  "orderQuantity": fullOrderItemExampleContent.orderQuantity,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.request,
  "orderedItem": fullOrderItemExampleContent.orderedItem.request
}

var responseOrderQuoteOrderItem = {
  "type": "OrderItem",
  "orderQuantity": fullOrderItemExampleContent.orderQuantity,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderConfirmed,
  "allowCustomerCancellationFullRefund": true,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderQuoteResponse
}

var responseOrderQuoteErrorOrderItem = {
  "type": "OrderItem",
  "orderQuantity": fullOrderItemExampleContent.orderQuantity,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderConfirmed,
  "allowCustomerCancellationFullRefund": true,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderQuoteResponse,
  "error": [{
    "type": "OpportunityIsFullError",
    "description": "There are no spaces remaining in this opportunity"
  }]
}


var responseOrderItem = {
  "type": "OrderItem",
  "id": fullOrderItemExampleContent.id,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderConfirmed,
  "allowCustomerCancellationFullRefund": true,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderResponse,
  "accessToken": fullOrderItemExampleContent.accessToken
}

var responseCancelledOrderItem = {
  "type": "OrderItem",
  "id": fullOrderItemExampleContent.id,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.CustomerCancelled
}

/***** Helper Functions *****/

function generateScriptInclude(json) {
  return `&#x3C;script type=&#x22;application/ld+json&#x22;&#x3E;
${jsonStringify(json)}
&#x3C;/script&#x3E;`;
}

function generateRequest(verb, path, mediaType, json) {
  return generateRequestHeaders(verb, path, mediaType) + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponseWithHeaders(responseCode, path, mediaType, headers, json) {
  return generateResponseHeaders(responseCode, path, mediaType) + "\n" + headers + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponse(responseCode, path, mediaType, json) {
  return generateResponseHeaders(responseCode, path, mediaType) + (json ? "\n\n" + jsonStringify(json) : "");
}

function jsonStringify(json) {
  return JSON.stringify(json, null, 2);
}

function generateRequestHeaders(verb, path, mediaType) {
  return `${verb} ${path} HTTP/1.1
Host: example.com
Date: Mon, 8 Oct 2018 20:52:35 GMT
Accept: ${mediaType}`
}

function generateResponseHeaders(responseCode, path, mediaType) {
  return `HTTP/1.1 ${responseCode}
Date: Mon, 8 Oct 2018 20:52:36 GMT
Content-Type: ${mediaType}${path ? '\nLocation: ' + path : ''}`
}