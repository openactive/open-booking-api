var OPERATIONS_MEDIA_TYPE = "application/vnd.openactive.booking+json; version=1";
var FEED_MEDIA_TYPE = "application/vnd.openactive.booking+json; version=1";
var EXAMPLE_EXTENSION_MEDIA_TYPE = "application/vnd.acmesystem.booking+json; version=0.3";
var UUID = "e11429ea-467f-4270-ab62-e47368996fe8";
var CONTEXT = "https://openactive.io/";
var EXAMPLE_EXTENSION_CONTEXT = "https://acmesystem.example.com/api/context.jsonld";
var BASE_URL = "https://example.com";
var API_PATH = "/api";

// Stub window if not running in the browser
var window = window || {};


// C1

window.dataExampleOrderQuoteCreationC1Request = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/order-quote-templates/" + UUID, OPERATIONS_MEDIA_TYPE, "c1_request_example_1", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.request,
    "orderedItem": [requestOrderItem]
  });
}

window.dataExampleOrderQuoteCreationC1Response = (utils, content) => {
  return generateResponse("200 OK", null, OPERATIONS_MEDIA_TYPE, "c1_response_example_1", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "@id": fullOrderExampleContent['@id'].orderQuote,
    "orderRequiresApproval": fullOrderExampleContent.orderRequiresApproval,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.response,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem
  });
}

window.dataExampleOrderQuoteCreationC1OrderItemErrorResponse = (utils, content) => {
  return generateResponse("409 Conflict", null, OPERATIONS_MEDIA_TYPE, "c1_response_example_2_error", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "@id": fullOrderExampleContent['@id'].orderQuote,
    "orderRequiresApproval": fullOrderExampleContent.orderRequiresApproval,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.response,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteErrorOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.zeroItems,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.zeroItems
  });
}

window.dataExampleOrderQuoteCreationC1ErrorResponse = (utils, content) => {
  return generateResponse("500 Internal Server Error", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "TemporarilyUnableToProduceOrderQuoteError",
    "description": "Temporary error occurred in the database"
  });
}


// C2

window.dataExampleOrderQuoteCreationC2Request = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/order-quotes/" + UUID, OPERATIONS_MEDIA_TYPE, "c2_request_example_1", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.request,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem]
  });
}

window.dataExampleOrderQuoteCreationC2Response = (utils, content) => {
  return generateResponse("200 OK", null, OPERATIONS_MEDIA_TYPE, "c2_response_example_1", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "@id": fullOrderExampleContent['@id'].orderQuote,
    "orderRequiresApproval": fullOrderExampleContent.orderRequiresApproval,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.response,
    "customer": fullOrderExampleContent.customer.person,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem
  });
}

window.dataExampleOrderQuoteCreationC2OrderItemErrorResponse = (utils, content) => {
  return generateResponse("409 Conflict", null, OPERATIONS_MEDIA_TYPE, "c2_response_example_2_error", {
    "@context": CONTEXT,
    "@type": "OrderQuote",
    "@id": fullOrderExampleContent['@id'].orderQuote,
    "orderRequiresApproval": fullOrderExampleContent.orderRequiresApproval,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.response,
    "customer": fullOrderExampleContent.customer.person,
    "bookingService": fullOrderExampleContent.bookingService,
    "lease": fullOrderExampleContent.lease,
    "orderedItem": [responseOrderQuoteErrorOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.zeroItems,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.zeroItems
  });
}

window.dataExampleOrderQuoteCreationC2ErrorResponse = (utils, content) => {
  return generateResponse("500 Internal Server Error", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "TemporarilyUnableToProduceOrderQuoteError",
    "description": "Temporary error occurred in the database"
  });
}




window.dataExampleErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "IncompleteCustomerDetailsError",
    "description": "No customer details supplied"
  });
}

window.dataExampleRateLimitResponse = (utils, content) => {
  return generateResponseWithHeaders("429 Too Many Requests", null, OPERATIONS_MEDIA_TYPE, null,
    "Retry-After: 8", {
      "@context": CONTEXT,
      "@type": "TooManyRequestsError",
      "description": "Rate Limit Reached. Retry in 8 seconds."
    });
}


// LATER Offer override to disable/exclude an offer.
// LATER Create a GitHub issue for 49:00 which includes pros and cons of latestCancellationBeforeStartDate vs better errors on cancellation noting "allowCustomerCancellationFullRefund"
// LATER A page on the OA docs site summarising what you can do and can't do with the OpenActive booking specification (to talk through with operators)
// LATER Consider allowing price in Offers to be supplied at B (taken from C2) to double-check the price of each item hasn't changed.
// LATER All supported properties are reflected (and stored if Order GET is implemented), however the feed is a PATCH, so essential properties should be stored by the broker and periferal properties don't need to be stored by the Booking System for more accessible implementation.
// LATER Ensure somewhere it says for the Orders feed items are a "PATCH" of a subset of the properties from the original Order, and that GET is not REQUIRED so that the other properties do not need to be stored.

//After release: TODO: Create new feed column in Order model
//After release: TODO: Add details somewhere about what level of info to include in orderedItems in general (required props? enough to describe the activity, or shall we list them in the model here?)
//After release: TODO: Sort through errors, check all error states are covered
//After release: TODO: Full read-through
//After release: TODO: Fix all examples to be sensible
//After release: TODO: Error messages and failure modes (and HTTP status codes) for all operations, ensuring that all types of failure are covered
//After release: TODO: Extensive list of test cases for spec - what would the spec validator do? Do it in .NET and build up OA.NET at the same time.
// - Create a: - Reference implementation of the booking spec, in .NET
//             - Support in OA.NETs
//             - Front-end that tests against this


window.dataExampleOrderCreationRequest = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "b_request_example_1", {
    "@context": CONTEXT,
    "@type": "Order",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.request,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

/*
window.dataExampleOrderCreationResponse = (utils, content) => {
  return generateResponse("201 Created", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "b_request_example_2", {
    "@context": CONTEXT,
    "@type": "Order",
    "@id": fullOrderExampleContent['@id'].order,
    "seller": fullOrderExampleContent.seller.response,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}
*/

window.dataExampleOrderCreationResponse = (utils, content) => {
  return generateResponse("201 Created", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "b_response_example_1", {
    "@context": CONTEXT,
    "@type": "Order",
    "@id": fullOrderExampleContent['@id'].order,
    "orderNumber": "AB000001",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "seller": fullOrderExampleContent.seller.response,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

window.dataExampleOrderCreationFromProposalRequest = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "b_response_example_2_proposal", {
    "@context": CONTEXT,
    "@type": "Order",
    "orderProposalVersion": fullOrderExampleContent.orderProposalVersion,
    "payment": fullOrderExampleContent.payment
  });
}

window.dataExampleOrderCreationErrorResponse = (utils, content) => {
  return generateResponse("409 Conflict", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "UnableToProcessOrderItemError",
    "description": "An error occurred while processing the items within this booking."
  });
}



window.dataExampleOrderQuoteDeletionRequest = (utils, content) => {
  return generateRequest("DELETE", API_PATH + "/order-quotes/" + UUID, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderQuoteDeletionResponse = (utils, content) => {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE, null);
}


window.dataExampleOrderDeletionRequest = (utils, content) => {
  return generateRequest("DELETE", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderDeletionResponse = (utils, content) => {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderDeletionNotFoundResponse = (utils, content) => {
  return generateResponse("404 Not Found", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "NotFoundError",
    "description": "This Order does not exist."
  });
}



window.dataExampleOrderProposalCreationRequest = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, "p_request_example_1", {
    "@context": CONTEXT,
    "@type": "OrderProposal",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.request,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}

window.dataExampleOrderProposalCreationResponse = (utils, content) => {
  return generateResponse("201 Created", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, "p_response_example_1", {
    "@context": CONTEXT,
    "@type": "OrderProposal",
    "@id": BASE_URL + API_PATH + "/order-proposals/" + UUID,
    "orderNumber": "AB000001",
    "orderProposalVersion": fullOrderExampleContent.orderProposalVersion,
    "orderProposalStatus": fullOrderExampleContent.orderProposalStatus,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.response,
    "customer": fullOrderExampleContent.customer.person,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [responseOrderProposalOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem,
    "payment": fullOrderExampleContent.payment,
    "lease": fullOrderExampleContent.lease
  });
}

window.dataExampleOrderProposalCreationErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, "error_response_example_1", {
    "@context": CONTEXT,
    "@type": "IncompleteBrokerDetailsError",
    "description": "Only 'https://openactive.io/CustomerRejected' is permitted for this property."
  });
}



window.dataExampleOrderProposalUpdateRequest = (utils, content) => {
  return generateRequest("PATCH", API_PATH + "/order-proposals/" + UUID, OPERATIONS_MEDIA_TYPE, "orderproposal_patch_example_1", {
    "@context": CONTEXT,
    "@type": "OrderProposal",
    "orderProposalStatus": "https://openactive.io/CustomerRejected",
    "orderCustomerNote": "Sorry I've actually made other plans, hope you find someone!"
  });
}

window.dataExampleOrderProposalUpdateResponse = (utils, content) => {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderProposalUpdateErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "PatchNotAllowedOnProperty",
    "description": "Only 'https://openactive.io/CustomerRejected' is permitted for this property."
  });
}

window.dataExampleOrderProposalUpdateExcessivePropertiesErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "PatchContainsExcessiveProperties",
    "description": "PATCH includes unexpected properties that are not permitted."
  });
}








window.dataExampleOrderFeedRequest = (utils, content) => {
  return generateRequest("GET", API_PATH + "/orders-rpde", FEED_MEDIA_TYPE, null);
}

window.dataExampleOrderFeedResponse = (utils, content) => {
  return generateResponse("200 OK", null, FEED_MEDIA_TYPE, "order_feed_example_1", {
    "next": BASE_URL + API_PATH + "/orders-rpde?afterTimestamp=1521565719&afterId=" + UUID,
    "items": [
      {
        "state": "updated",
        "kind": "Order",
        "@id": UUID,
        "modified": 1521565719,
        "data": {
          "@context": CONTEXT,
          "@type": "Order",
          "@id": fullOrderExampleContent['@id'].order,
          "identifier": UUID,
          "orderedItem": [feedOrderItem],
          "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
          "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem
        }
      }
    ]
  });
}



window.dataExampleOrderCancellationRequest = (utils, content) => {
  return generateRequest("PATCH", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "order_patch_example_1", {
    "@context": CONTEXT,
    "@type": "Order",
    "orderedItem": [requestCancelledOrderItem]
  });
}


window.dataExampleOrderCancellationSuccessResponse = (utils, content) => {
  return generateResponse("204 No Content", null, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderCancellationErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "CancellationNotPermittedError",
    "description": "The horse has already been fed, and cannot be put back in the box."
  });
}

window.dataExampleOrderCancellationPatchPropertyErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "PatchNotAllowedOnProperty",
    "description": "Only 'https://openactive.io/CustomerCancelled' is permitted for this property."
  });
}

window.dataExampleOrderCancellationExcessivePropertiesErrorResponse = (utils, content) => {
  return generateResponse("400 Bad Request", null, OPERATIONS_MEDIA_TYPE, null, {
    "@context": CONTEXT,
    "@type": "PatchContainsExcessiveProperties",
    "description": "PATCH includes unexpected properties that are not permitted."
  });
}

window.dataExampleOrderStatusRequest = (utils, content) => {
  return generateRequest("GET", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, null);
}

window.dataExampleOrderStatusResponse = (utils, content) => {
  return generateResponse("200 OK", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, "orderstatus_example_1", {
    "@context": CONTEXT,
    "@type": "Order",
    "@id": fullOrderExampleContent['@id'].order,
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person,
    "seller": fullOrderExampleContent.seller.response,
    "bookingService": fullOrderExampleContent.bookingService,
    "orderedItem": [persistedOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "totalPaymentTax": fullOrderExampleContent.totalPaymentTax.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}


window.dataExampleExtensionWaitingListRequest = (utils, content) => {
  return generateRequest("POST", API_PATH + "/sessions/{session-id}/waiting-list", EXAMPLE_EXTENSION_MEDIA_TYPE, null, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "@type": "acme:WaitingListEntry",
    "broker": fullOrderExampleContent.broker,
    "customer": fullOrderExampleContent.customer.person
  });
}

window.dataExampleExtensionMemberBookingRequest = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, null, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "@type": "Order",
    "brokerRole": "https://openactive.io/NoBroker",
    "customer": {
      "@type": "acme:Member",
      "identifier": "MLD23947233"
    },
    "orderedItem": [requestOrderItem],
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": {
      "@type": "acme:StoredPaymentMethod",
      "identifier": 93482
    },
  });
}

window.dataExampleExtensionBespokeAgreementDetailsRequest = (utils, content) => {
  return generateRequest("PUT", API_PATH + "/orders/" + UUID, OPERATIONS_MEDIA_TYPE, null, {
    "@context": [ CONTEXT, EXAMPLE_EXTENSION_CONTEXT ],
    "@type": "Order",
    "brokerRole": fullOrderExampleContent.brokerRole,
    "broker": fullOrderExampleContent.broker,
    "seller": fullOrderExampleContent.seller.request,
    "customer": fullOrderExampleContent.customer.person,
    "orderedItem": {
      "@type": "OrderItem",
      "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.request,
      "orderedItem": fullOrderItemExampleContent.orderedItem.request,
      "acme:agreement": {
        "@type": "acme:ContractAgreement",
        "acme:multiple": 3,
        "acme:commissionCategory": "https://acmesystem.example.com/ns/BandA" 
      }
    },
    "totalPaymentDue": fullOrderExampleContent.totalPaymentDue.oneItem,
    "payment": fullOrderExampleContent.payment
  });
}


var fullOrderExampleContent = {
  "@context": CONTEXT,
  "@type": "OrderQuote",
  "@id": {
    order: BASE_URL + API_PATH + "/orders/" + UUID,
    orderQuote: BASE_URL + API_PATH + "/order-quotes/" + UUID
  },
  "orderNumber": "", //booking system generated
  "orderRequiresApproval": false,
  "orderProposalVersion": BASE_URL + API_PATH + "/order-proposals/" + UUID + "/versions/8eb1a6ce-3f5b-40b0-87a7-bddb4c5518bd", //booking system
  "orderProposalStatus": "https://openactive.io/AwaitingSellerConfirmation",
  "seller": { //booking system
    request: {
      "@type": "Organization",
      "@id": "https://example.com/api/organisations/123"
    },
    response: {
      "@type": "Organization",
      "@id": "https://example.com/api/organisations/123",
      "identifier": "CRUOZWJ1",
      "name": "Better",
      "taxMode": "https://openactive.io/TaxGross", //booking system
      "legalName": "Greenwich Leisure Limited",
      "description": "A charitable social enterprise for all the community",
      "url": "https://www.better.org.uk",
      "logo": {
        "@type": "ImageObject",
        "url": "http://data.better.org.uk/images/logo.png"
      },
      "telephone": "020 3457 8700",
      "email": "customerservices@gll.org",
      "vatID": "GB 789 1234 56",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alan Peacock Way",
        "addressLocality": "Village East",
        "addressRegion": "Middlesbrough",
        "postalCode": "TS4 3AE",
        "addressCountry": "GB"
      },
      "termsOfService": [
        {
          "@type": "PrivacyPolicy",
          "name": "Privacy Policy",
          "url": "https://example.com/privacy-policy",
          "requiresExplicitConsent": false
        },
        {
          "@type": "TermsOfUse",
          "name": "Terms and Conditions",
          "url": "https://example.com/terms-and-conditions",
          "dateModified": "2019-04-16T20:31:13Z",
          "requiresExplicitConsent": true
        }
      ]
    }
  },
  "brokerRole": "https://openactive.io/AgentBroker", //broker
  "broker": { //broker
    "@type": "Organization",
    "name": "MyFitnessApp",
    "url": "https://myfitnessapp.example.com",
    "description": "A fitness app for all the community",
    "logo": {
      "@type": "ImageObject",
      "url": "http://data.myfitnessapp.org.uk/images/logo.png"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alan Peacock Way",
      "addressLocality": "Village East",
      "addressRegion": "Middlesbrough",
      "postalCode": "TS4 3AE",
      "addressCountry": "GB"
    }
  },
  "customer": { //broker
    person: {
      "@type": "Person",
      "email": "geoffcapes@example.com",
      "telephone": "020 811 8055",
      "givenName": "Geoff",
      "familyName": "Capes"
    },
    organization: {
      "@type": "Organization",
      "email": "geoffcapes@example.com",
      "name": "Acme Broker"
    }
  },
  "bookingService": { //booking system
    "@type": "BookingService",
    "name": "Playwaze",
    "url": "http://www.playwaze.com",
    "termsOfService": [
      {
        "@type": "Terms",
        "name": "Terms of Service",
        "url": "https://brokerexample.com/terms.html",
        "requiresExplicitConsent": false
      }
    ]
  },
  "lease": { // booking system
    "@type": "Lease",
    "leaseExpires": "2018-10-01T11:00:00Z"
  },
  "totalPaymentDue": { //booking system
    oneItem: {
      "@type": "PriceSpecification",
      "price": 5.00,
      "priceCurrency": "GBP"
    },
    zeroItems: {
      "@type": "PriceSpecification",
      "price": 0,
      "priceCurrency": "GBP"
    },
  },
  "totalPaymentTax": {
    oneItem: [ //booking system
      {
        "@type": "TaxChargeSpecification",
        "name": "VAT at 20%",
        "price": 1.00,
        "priceCurrency": "GBP",
        "rate": 0.2
      }
    ],
    zeroItems: [ //booking system
      {
        "@type": "TaxChargeSpecification",
        "name": "VAT at 20%",
        "price": 0,
        "priceCurrency": "GBP",
        "rate": 0.2
      }
    ]
  },
  "payment": { // broker
    "@type": "Payment",
    "name": "AcmeBroker Points",
    "identifier": "1234567890npduy2f"
  }
};


var fullOrderItemExampleContent = { //broker
  "@type": "OrderItem",
  "@id": "https://example.com/api/orders/" + UUID + "#/orderedItem/1234",
  "position": 0,
  "orderItemStatus": { //booking system
    OrderItemConfirmed: "https://openactive.io/OrderItemConfirmed",
    OrderItemProposed: "https://openactive.io/OrderItemProposed",
    CustomerCancelled: "https://openactive.io/CustomerCancelled",
    SellerCancelled: "https://openactive.io/SellerCancelled",
  },
  "accessPass": [
    {
      "@type": "Barcode",
      "text": "0123456789",
    }
  ],
  "unitTaxSpecification": [ //booking system otherwise
    {
      "@type": "TaxChargeSpecification",
      "name": "VAT at 20%",
      "price": 1.00,
      "priceCurrency": "GBP",
      "rate": 0.2
    }
  ],
  "acceptedOffer": {
    request: {
      "@type": "Offer",
      "@id": "https://example.com/events/452#/offers/878"
    },
    response: {
      "@type": "Offer",
      "@id": "https://example.com/events/452#/offers/878",
      "description": "Winger space for Speedball.",
      "name": "Speedball winger position",
      "price": 10.00,
      "priceCurrency": "GBP",
      "validFromBeforeStartDate": "P6D",
      "allowCustomerCancellationFullRefund": true,
      "latestCancellationBeforeStartDate": "P1D"
    }
  },
  "orderedItem": {
    request: {
      "@type": "ScheduledSession",
      "@id": "https://example.com/events/452/subEvents/132"
    },
    orderQuoteResponse: {
      "@type": "ScheduledSession",
      "@id": "https://example.com/events/452/subEvents/132",
      "identifier": 123, //expanded by booking system
      "eventStatus": "https://schema.org/EventScheduled",
      "maximumAttendeeCapacity": 30,
      "remainingAttendeeCapacity": 20,
      "startDate": "2018-10-30T11:00:00Z",
      "endDate": "2018-10-30T12:00:00Z",
      "duration": "PT1H",
      "superEvent": {
        "@type": "SessionSeries",
        "@id": "https://api.example.com/events/452",
        "name": "Bodypump",
        "activity": [
          {
            "type": "Concept",
            "id": "https://openactive.io/activity-list#5e78bcbe-36db-425a-9064-bf96d09cc351",
            "prefLabel": "Bodypump™",
            "inScheme": "https://openactive.io/activity-list"
          }
        ],
        "duration": "PT1H",
        "url": "https://example.com/events/452",
        "location": {
          "@type": "Place",
          "url": "https://www.everyoneactive.com/centres/Middlesbrough-Sports-Village",
          "name": "Middlesbrough Sports Village",
          "identifier": "0140",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Alan Peacock Way",
            "addressLocality": "Village East",
            "addressRegion": "Middlesbrough",
            "postalCode": "TS4 3AE",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 54.543964,
            "longitude": -1.20978500000001
          }
        }
      }
    },
    orderResponse: {
      "@type": "ScheduledSession",
      "@id": "https://example.com/events/452/subEvents/132",
      "identifier": 123, //expanded by booking system
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2018-10-30T11:00:00Z",
      "endDate": "2018-10-30T12:00:00Z",
      "duration": "PT1H",
      "superEvent": {
        "@type": "SessionSeries",
        "@id": "https://api.example.com/events/452",
        "name": "Bodypump",
        "activity": [
          {
            "type": "Concept",
            "id": "https://openactive.io/activity-list#5e78bcbe-36db-425a-9064-bf96d09cc351",
            "prefLabel": "Bodypump™",
            "inScheme": "https://openactive.io/activity-list"
          }
        ],
        "url": "https://example.com/events/452",
        "location": {
          "@type": "Place",
          "url": "https://www.everyoneactive.com/centres/Middlesbrough-Sports-Village",
          "name": "Middlesbrough Sports Village",
          "identifier": "0140",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Alan Peacock Way",
            "addressLocality": "Village East",
            "addressRegion": "Middlesbrough",
            "postalCode": "TS4 3AE",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 54.543964,
            "longitude": -1.20978500000001
          }
        }
      }
    }
  }
};

var feedOrderItem = {
  "@type": "OrderItem",
  "@id": fullOrderItemExampleContent['@id'],
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderItemConfirmed,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.request,
  "accessPass": fullOrderItemExampleContent.accessPass
}

var persistedOrderItem = {
  "@type": "OrderItem",
  "@id": fullOrderItemExampleContent['@id'],
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderItemConfirmed,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderResponse,
  "accessPass": fullOrderItemExampleContent.accessPass
}

var requestOrderItem = {
  "@type": "OrderItem",
  "position": fullOrderItemExampleContent.position,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.request,
  "orderedItem": fullOrderItemExampleContent.orderedItem.request
}

var responseOrderQuoteOrderItem = {
  "@type": "OrderItem",
  "position": fullOrderItemExampleContent.position,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderQuoteResponse
}

var responseOrderQuoteErrorOrderItem = {
  "@type": "OrderItem",
  "position": fullOrderItemExampleContent.position,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderItemConfirmed,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderQuoteResponse,
  "error": [{
    "@type": "OpportunityIsFullError",
    "description": "There are no spaces remaining in this opportunity"
  }]
}


var responseOrderItem = {
  "@type": "OrderItem",
  "@id": fullOrderItemExampleContent['@id'],
  "position": fullOrderItemExampleContent.position,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderItemConfirmed,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderResponse,
  "accessPass": fullOrderItemExampleContent.accessPass
}

var responseOrderProposalOrderItem = {
  "@type": "OrderItem",
  "position": fullOrderItemExampleContent.position,
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.OrderItemProposed,
  "unitTaxSpecification": fullOrderItemExampleContent.unitTaxSpecification,
  "acceptedOffer": fullOrderItemExampleContent.acceptedOffer.response,
  "orderedItem": fullOrderItemExampleContent.orderedItem.orderResponse
}

var requestCancelledOrderItem = {
  "@type": "OrderItem",
  "@id": fullOrderItemExampleContent['@id'],
  "orderItemStatus": fullOrderItemExampleContent.orderItemStatus.CustomerCancelled
}

/***** Helper Functions *****/

function generateScriptInclude(json) {
  return `&#x3C;script type=&#x22;application/ld+json&#x22;&#x3E;
${jsonStringify(json)}
&#x3C;/script&#x3E;`;
}

function generateRequest(verb, path, mediaType, filename, json) {
  storeJson(filename, json);
  return generateRequestHeaders(verb, path, mediaType) + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponseWithHeaders(responseCode, path, mediaType, filename, headers, json) {
  storeJson(filename, json);
  return generateResponseHeaders(responseCode, path, mediaType) + "\n" + headers + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponse(responseCode, path, mediaType, filename, json) {
  storeJson(filename, json);
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


/***** Saving Examples To Filesystem *****/

// usage: node examples.js

var DATA_MODEL_OUTPUT_DIR = "../../validator/data-models/versions/2.x/examples/booking_spec_examples/";

// If this is running in Node.js, then save the examples

// Each generateRequest* function will write its contents if in the Node.js environment
function storeJson(filename, json) {
  if (typeof process === 'object' && typeof filename === 'string') {
    writeFile(filename, jsonStringify(json));
  }
}

var fs = null;

if (typeof process === 'object') {
  fs = require('fs');
  
  // Run all dataExample* functions
  for (property in window) {
    if(typeof window[property] === 'function' && property.indexOf('dataExample') == 0) {
      window[property]();
    }
  };
}

function writeFile(name, content) {
  var filename = name + ".json";
  
  console.log("NAME: " + filename);
  console.log(content);

  console.log("FILE SAVED: " + filename);
  
  fs.writeFile(DATA_MODEL_OUTPUT_DIR + filename, content, function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("FILE SAVED: " + filename);
  });
}