# api base url resolver

Infers a url based on a current url, for instance, allows a front end to resolve a back-end api base url depending on it's running environment.

Its very useful when running a lot of environment stages and the front-end must match the back-end environment

## Installation

To install this package use `npm install api-base-url-resolver`

## Usage

```ts
subDomainResolver(origin: string, subDomain: string, options?: Options): string;
```

- `origin` : current domain, mostly `location.hostname`
- `subDomain` : the desired domain, mostly `api` subdomain is used
- `options` : 
  - `replace` : replaces the sub-domain to the provided one
  - `protocol` : changes the protocol
  - `conditions` : if there some specific condition to a specific env or url, useful for localhost developments envs
  - `envVar` : when provided, it will look for this env var and use it as url. useful for localhost developments envs or specific deploys like canary or beta

## Usage examples

```ts
import apiBaseUrlResolver from "api-base-url-resolver";

apiBaseUrlResolver("https://domain.com", "api"); // => "https://api.domain.com"

apiBaseUrlResolver("http://domain.com", "api"); // => "http://api.domain.com"

apiBaseUrlResolver("https://env.domain.com", "api"); // => "https://api.env.domain.com"

apiBaseUrlResolver("https://some.other.app.env.domain.com", "api"); // => "https://api.some.other.app.env.domain.com"

apiBaseUrlResolver("http://domain.com", "api", { protocol: "https" }); // => "https://api.domain.com"

apiBaseUrlResolver("https://domain.com", "api", { protocol: "http" }); // => "http://api.domain.com"

apiBaseUrlResolver("https://app.env.domain.com", "api", { replace: true }); // => "https://api.env.domain.com"

apiBaseUrlResolver("https://app.other.env.domain.com", "api", { replace: true }); // => "https://api.other.env.domain.com"

const conditions = {
    "localhost:8080": "https://custom.env.custom.com",
    "localhost:8081": "http://localhost:8080"
};

subDomainResolver("localhost:8080", "api", { conditions }); // => "https://custom.env.custom.com"
subDomainResolver("localhost:8081", "api", { conditions }); // => "http://localhost:8080"

const envVar = "MAIN_API";
process.env.MAIN_API = "https://env-var-defined-url.com";

subDomainResolver("localhost:8080", "api", { envVar }); // => "https://env-var-defined-url.com"
subDomainResolver("localhost:8081", "api", { envVar }); // => "https://env-var-defined-url.com"
subDomainResolver("https://otherDomain.com", "api", { envVar }); // => "https://env-var-defined-url.com"
```
