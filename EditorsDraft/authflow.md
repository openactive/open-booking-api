## Proposer

ODI

## Why is this needed?

Although the specification currently recommends OAuth2 for API implementation, it does not give concrete recommendations around how this should be implemented.

Such recommendations would allow for convergence of authentication between booking systems, which would greatly simplify the broker's integration requirements and lower the barrier to entry for them

## Proposal

This proposal suggests updates to the specification as follows, based on the prior work in this area within the [.NET tutorial](https://tutorials.openactive.io/open-booking-sdk/quick-start-guide/storebookingengine/day-8-authentication). The recommendation suggests use of OpenID Connect, which is a well established and widely used approach to the type of authentication.

### 11.7.1 API level authentication and data security

This specification does not mandate a particular authentication method, but its recommendation is that implementors should consider using [OAuth2] as it is well-defined, widely supported and can be used in a variety of different application flows (e.g. via a JavaScript web application or between servers). For <a>Booking Systems</a> that support multiple <a>Sellers</a>, OpenID Connect ([[OpenIdConnect]]) is recommended in addition to this for the <a>Booking Partner</a> to access a particular <a>Seller</a>.

### 11.7.4 OpenID Connect for Multiple Seller Systems

For <a>Booking Systems</a> that support multiple <a>Sellers</a>, OpenID Connect ([[OpenIdConnect]]) is recommended when providing the <a>Booking Partner</a> access to a particular <a>Seller</a>.

In order to support convergence amongst implementations, a number of recommendations are included below, which include recommended terms for names of <a>Scopes</a> and <a>Claims</a>.

#### OAuth Flows and Scopes

The objective of an OAuth flow is for the <a>Booking Partner</a> to aquire an <dfn>Access Token<dfn>, which is the <a>Authentication Credential</a> that allow for access to a subset the Open Booking API endpoints of the <a>Booking System</a> for a particular <a>Seller</a>.

The <a>Access Token</a> SHOULD be included in the `Authorization` header of the request to access the Open Booking API endpoints.

An expiry duration of 15 minutes is RECOMMENDED for <a>Access Token</a> expiry, to give the <a>Seller</a> control over the relationship.

The recommended flows are as following:

- <a>Authorization Code Flow</a> for <a>Sellers</a> to approve <a>Booking Partners</a> to interact with bookings.

- <a>Client Credentials Flow</a> to provide access to the <a>Orders feed</a>.

An OAuth <dfn>Scope<dfn> defines access to a set of endpoints, and also expectations about <a>Claims</a> returned. <a>Access Token</a> can be requested that includes a number of scopes, via the relevant OAuth flow.

The RECOMMENDED <a>Scopes</a> and flows are defined in the table below:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Scope</th>
      <th style="text-align:left">Endpoints</th>
      <th style="text-align:left">OAuth flow used to acquire Access Token</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>openactive-openbooking</code>
      </td>
      <td style="text-align:left">
        <p>OrderQuote Creation (C1)</p>
        <p>OrderQuote Creation (C2)</p>
        <p>OrderQuote Deletion</p>
        <p>Order Creation (B)</p>
        <p>Order Deletion</p>
        <p>Order Cancellation</p>
        <p>Order Status</p>
      </td>
      <td style="text-align:left"><a>Authorization Code Flow</p></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>openactive-ordersfeed</code>
      </td>
      <td style="text-align:left">Orders RPDE Feed</td>
      <td style="text-align:left"><a>Client Credentials Flow</a>
      </td>
    </tr>
  </tbody>
</table>

In order to implement functionality to suspend bookings temporarily, the <a>Booking System</a> SHOULD temporarily revoke access to the `openactive-openbooking` scope, so that only the <a>Orders Feed</a> is accessible (and hence <a>Customers</a> are still able to recieve refunds and notifications, but cannot make new bookings or initiate cancellations).


##### Authorization Code Flow

To access any of the [endpoints](#endpoints) defined in this specification other than the [Orders RPDE Feed](#orders-rpde-feed), the <a>Booking Partner</a> SHOULD first acquire a valid <a>Access Token<a> with an `openactive-openbooking` <a>Scope</a>, by having a particular <a>Seller</a> complete the <a>Authorization Code Flow</a>. <a>Sellers</a> will be familiar with this flow from websites that offer "Login with my social media account".

![Example authorization page for a booking partner, presented by a booking system.](../../../.gitbook/assets/seller-authentication-diagram-1.png)

A <dfn>Refresh Token</dfn> SHOULD also be also provided during this flow, which allows the <a>Booking Partner</a> to request another <a>Access Token</a> once it has expired, without the <a>Seller</a> needing to reauthenticate.

Additionally, a "one-time usage" <dfn>ID Token</dfn> SHOULD be provided during this flow which contains the `SellerId` and other details of the <a>Seller</a>. This allows the <a>Booking Partner</a> to store the <a>Access Token</a> and <a>Refresh Token</a> against the correct `SellerId` in their database, so they can use these when booking the <a>Seller</a>'s opportunities.

The Authorization Request of this flow SHOULD include the `openactive-openbooking`, `openid`, and `offline_access` <a>Scopes</a>, to ensure that an <a>Access Token</a>, <a>ID Token</a> and <a>Refresh Token</a> are all returned for the authenticating <a>Seller</a>.

For this flow, it is RECOMMENDED that the OpenID Connect subject is not the end user who is following the OAuth flow, but is instead the <a>Seller</a> that they represent - such that if, for example, the end user no longer works for the <a>Seller</a> and deletes their account, their authentication grants remain unaffected. This recommendation conforms with OpenID Connect from a technical perspective, which is useful when leveraging existing libraries.

![Authorization Code Flow](../../../.gitbook/assets/authorization-code-flow-1.png)


##### Client Credentials Flow

The straightforward <dfn>Client Credentials Flow</dfn> SHOULD be used to retrieve an <a>Access Token</a> with an `openactive-ordersfeed` <a>Scope</a>, which grants access to the <a>Orders Feed</a> endpoint as above.

The Authorization Request of the flow SHOULD include only the `openactive-ordersfeed` <a>Scope</a>.

![Client Credentials Flow](../../../.gitbook/assets/client-credentials-flow.png)


#### Custom Claims

<dfn>Claims</dfn> are simply key-value pairs that are included in <a>Access Tokens</a> and <a>ID Tokens</a>; each <a>Claim</a> is "claiming" a fact about the subject (in this case, the <a>Seller</a>). For example a token may include a "claim" that the <a>Seller</a> has a name of "Acme Leisure".

The OpenActive namespace includes a number of terms for use as Custom Claims.

##### ID Token claims

The <a>ID Token</a> is designed to be read by the <a>Booking Partner</a> to give them information about the <a>Seller</a> that has just authenticated.  This allows the <a>Booking Partner</a> to store the <a>Access Token</a> and <a>Refresh Token</a> against the correct `SellerId` in their database, so they can use these when booking the <a>Seller</a>'s opportunities.

It is RECOMMENDED that the `openactive-openbooking` <a>Scope</a> includes an implicit request that <a>Claims</a> listed below are included in the <a>ID Token</a>.

The following custom claims are for use by the <a>Booking Partner</a>, and must conform to the custom claim names specified below. The custom claim names are collision-resistant in accordance with [the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.5.1.2). 

| Custom claim | Description | Exactly matches |
| :--- | :--- | :--- |
| `https://openactive.io/sellerName` | The seller name. | `name` of  `seller` |
| `https://openactive.io/sellerLogo` | A URL of the logo of the Seller. | `logo` of  `seller` |
| `https://openactive.io/sellerUrl` | The URL of the website of the Seller. | `url` of  `seller` |
| `https://openactive.io/sellerId` | The Seller ID as a JSON-LD ID. Also allows for compatibility with existing authentication implementations which might be using "sub" to include a different identifier. Booking partners will use this to determine which Seller ID the provided accessToken is intended for.  | `id` of  `seller` |
| `https://openactive.io/bookingServiceName` | The `name` of the Booking System | `name` of  `bookingService` |
| `https://openactive.io/bookingServiceUrl` | The `url` of the website of the Booking System | `url` of  `bookingService` |

##### Access Token claims

To help simplify the implementation, it is recommended that <a>Access Tokens</a> include the following custom claims.

The <a>Access Token</a> is only read internally by the <a>Booking System</a>, and so these claims are simply a recommendation. Hence the claim names do not need to be standardised as long as they are internally consistent.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Custom claim</th>
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Scopes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>https://openactive.io/clientId</code>
      </td>
      <td style="text-align:left">The <a>Booking Partner</a> Client ID that requested
        the <a>Access Token</a>. Note that this claim is due to be featured in a <a
        href="https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-19#section-4.3">future OAuth 2.0 specification</a>, and it is RECOMMENDED that the newly specified claim is used in preference to this one, once ratified.</td>
      <td
      style="text-align:left">
        <p><code>openactive-openbooking</code> and <code>openactive-ordersfeed </code>
        </p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>https://openactive.io/sellerId</code>
      </td>
      <td style="text-align:left">Seller ID as a JSON-LD ID, which is useful to be provided
        to Open Booking API endpoints to determine which <a>Seller</a> the <a>Access Token</a> is intended
        for. It is consistent with the claim name used in the <a>ID Token</a>.</td>
      <td
      style="text-align:left"><code>openactive-openbooking</code>
        </td>
    </tr>
  </tbody>
</table>