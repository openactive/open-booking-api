# OpenActive Open Booking API

## Introduction

The Open Booking API provides a simple unified guest-checkout API for OpenActive datasets. It provides a simple interface for third party "Broker" systems interacting with Booking Systems to place Orders and process cancellations for Orders, while requiring Brokers to handle invoicing, payments and refunds.

"Broker" - the third party system making the booking
"Booking System" - the system where the booking is made


## Which opportunities are bookable?

Where the Broker has permission to access an Open Booking API provided by the Booking System via an API key or similar token, an `Event`, `ScheduledSession`, `HeadlineEvent`, `Slot` or `CourseInstance` within an open feed is deemed to be 'bookable' via the Open Booking API if:

- `availableChannel` of a valid `Offer` includes `https://openactive.io/OpenBookingPrepayment`.

- The `endDate` is not already in the past (note that bookings are still possible after the `startDate`).

- The `eventStatus` of the `Event`, `ScheduledSession`, or `Slot` is not `https://schema.org/EventCancelled` or `https://schema.org/EventPostponed`.

- The `remainingAttendeeCapacity` or `remainingUses` is greater than the number required.

- The `potentialAction` of dataset site includes an `OpenBookingAction` object.

- The `validFromBeforeStartDate` duration (if provided) subtracted from the `startDate` in the past. This allows for a "bookahead" window to be specified.


## How do I make a booking?

In order to successfully make a booking, a third party Broker must make specific calls to the Booking System, and must also have a process in place to synchronise the state of Orders using the Orders feed of the Booking System.

### Setting up the Orders feed

Before any bookings can be made, you must set up harvesting of the Orders feed to ensure you can process refunds and cancellations.

The `DataFeed` within `OpenBookingAction` of the feed's dataset site provides a URL for the Orders feed whose state must be synchronised with the Broker.

```
{
  "@type": "DataFeed",
  "distribution": [
    {
        "@type": "DataDownload",
        "name": "Order",
        "additionalType": "https://schema.org/Order",
        "encodingFormat": ["application/vnd.openactive+json; model=2.0, booking=1.0, rpde=1.0"],
        "contentUrl": "https://example.com/api/feeds/offers"
    }
  ]
}
```

More information about how to continually harvest RPDE feeds to maintain up-to-date data is available here.

Each Order retrieved in the feed must be processed immediately:

1. Updates to existing Orders where the `totalPaymentDue` has changed (which will only be due to an OrderItem moving from `https://openactive.io/OrderConfirmed` to either `https://openactive.io/CustomerCancelled` or `https://openactive.io/SellerCancelled`) must trigger a refund of the difference.
2. New Orders or updates to existing Orders within the feed must generate an updated Invoice and VAT receipt for the associated Customer. The Customer should either be sent the Invoice directly via e-mail, or it can be accessible to them via your app or website.

### Identify the primary booking endpoint

The `EntryPoint` within `OpenBookingAction` of the feed's dataset site provides a `urlTemplate` which is used to `PUT` both `OrderQuote` and `Order` in order to complete a booking.

```
{
  "@type": "EntryPoint",
  "urlTemplate": "https://example.com/api/orders/{uuid}",
  "encodingType": ["application/vnd.openactive+jsonld; model=2.0, booking=1.0"],
  "httpMethod": "PUT"
}
```

### Making a booking

<figure>
 <img src="sequencediagram.png" alt="Sequence diagram">
 <figcaption>Sequence diagram showing API interactions</figcaption>
</figure>

i) "**1. Select**" - User browses broker site anonymously and adds something to basket

  - <a>Broker</a> generates session UUID

ii) **C1** - <a>Broker</a> call with `OrderQuote` including UUID without a `customer` object to check availability and that the combination of items requested can be purchased (call is idempotent), <a>Booking System</a> responds with an `OrderQuote`.

  - <a>Booking System</a> creates anonymous lease for that UUID if it is supported, otherwise it provides a simple availability and `totalPaymentDue` confirmation. Response 200 indicates quote has been successfully produced (which implies all requested items are available). Response may include a `lease` to indicate a lease has also been created against the UUID.
  - `OrderQuote` includes total pricing confirmation in response for basket to be updated, as well as enumerated `OrderItem`s with their respective details that can be rendered by the <a>Broker</a> to ensure accuracy (rather than relying on syncing with the open feed).
  - The <a>Booking System</a> MUST ensure that the data returned to the <a>Broker</a> in the `remainingAttendeeCapacity` and `remainingUses` properties are up-to-date, and only include places already booked and *not* places currently reserved by leases from competing `OrderQuote`s.

iii) "**2. Register / Login**" - User clicks checkout and enters personal details

iv) **C2** - <a>Broker</a> call with `OrderQuote` including UUID with a `customer` object to check viability (call is idempotent), <a>Booking System</a> responds with an `OrderQuote`.

  - <a>Booking System</a> creates named lease for that UUID if it is supported, otherwise it provides a simple availability and `totalPaymentDue` confirmation. Works exactly as **C1**.
  - <a>Broker</a> presents the contents of the `OrderQuote` to the `Customer` to ensure they have the most up-to-date price and availability before proceeding with the purchase.

//TODO: Add error state for "orderItem is reserved by another user, and may become available again shortly"

v) "**3. Book and Pay**" - User enters payment details and clicks Book

vi) **Authorise Payment** - <a>Broker</a> pre-authorises `totalPaymentDue` from <a>Payment Provider</a>

  - `Order` `id` (which includes the UUID) SHOULD be used as a reference in the <a>Payment Provider</a>, if possible.

vii) **B** - <a>Broker</a> call with `Order` including UUID with a Person object to check viability and with a Payment object for the total amount pre-authed (call is idempotent, can be retried if 500 returned), <a>Booking System</a> responds with an `Order`.

  - The `identifier` of the `Payment` is taken from the payment pre-authorization.

  - If the total payment amount in the `Payment` object is different to the current `totalPaymentDue` (which might have changed since **C2**, e.g. if the headline price is changed in the booking system between these two steps), the booking fails but the lease is sustained so that the user can be prompted whether they want to continue with the new amount.

  - If some of the leases have expired, or if leases are not supported, then the booking system attempts to make the booking anyway. If there are no spaces available the booking fails.

  - If the booking succeeds only for some basket items, the whole transaction is rolled back and the entire booking fails.

  - If there's a failure, e.g. no response from server, then <a>Broker</a> can resubmit with same UUID. As the call is idempotent, the Booking System will need to track the UUID supplied by <a>Broker</a> against any successful orders, to ensure that it can return the same `Order` for subsiquent requests. <a>Broker</a> MUST NOT reuse UUIDs across multiple `Order`s.

  - The booking is considered as complete and paid by the <a>Booking System</a> at this point

viii) **Capture Payment** - <a>Broker</a> captures `totalPaymentDue` from payment provider

  - If an error occurs during capture (very unlikely but possible due to system failure), and this may only be noticed after the event due to server failure and observation of logs, the <a>Broker</a> must either:
    - Initiate manual capture via e.g. the Stripe console. Note the pre-auth will typically last for 7 days, so manual capture is still possible after the event.
    - Capture the payment from the user manually.
    - Absorb the loss and make a new payment for the same amount with the same UUID in the payment provider (better for UX / customer service, if manual capture not possible).
    - Send a cancellation request to the booking system and notify the <a>Customer</a> of the error in good time before the event.

 - It is the <a>Broker</a>'s responsibility to ensure that payment has been captured.

ix) **Invoice Generation** and **Customer Notification** - <a>Broker</a> retrieves the `Order` that is generated by the <a>Booking System</a> on the <a>Orders feed</a>, generates invoices, and sends <a>Customer</a> notifications

  - A secure <a>Orders feed</a> of `Order`s MUST be provided by the <a>Booking System</a>, with the contents of the feed specific to the authenticating <a>Broker</a>. This allows the <a>Broker</a> to maintain an updated state of all their bookings across a number of <a>Booking Systems</a>, even when changes are made outside of the <a>Broker</a>. This also allows the <a>Broker</a> to handle refunds to cancellations, and process notifications to <a>Customers</a> in a consistent way.
  - The <a>Booking System</a> must ensure that the `Order`s in the <a>Orders feed</a> represent the current state of `OrderItem`s within the system.
  - The <a>Broker</a> uses these `Order`s to generate invoices, and send notifications to the <a>Customer</a>.
