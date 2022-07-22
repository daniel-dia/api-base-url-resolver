import subDomainResolver from "../src";

describe("sub domain resolver", () => {
    it("should append sub domain to origin", async () => {
        expect(subDomainResolver("https://domain.com", "api")).toEqual("https://api.domain.com");
    });

    it("should append sub domain and keep http protocol when origin has http protocol ", async () => {
        expect(subDomainResolver("http://domain.com", "api")).toEqual("http://api.domain.com");
    });

    it("should append sub domain to origin when origin has another subdomain ", async () => {
        expect(subDomainResolver("https://env.domain.com", "api")).toEqual("https://api.env.domain.com");
    });

    it("should append sub domain to origin when origin has more then one subdomain", async () => {
        expect(subDomainResolver("https://some.other.app.env.domain.com", "api")).toEqual("https://api.some.other.app.env.domain.com");
    });

    it("should change url protocol to https when option protocol is https", async () => {
        expect(subDomainResolver("http://domain.com", "api", { protocol: "https" })).toEqual("https://api.domain.com");
    });

    it("should change url protocol to http when option protocol is http", async () => {
        expect(subDomainResolver("https://domain.com", "api", { protocol: "http" })).toEqual("http://api.domain.com");
    });

    it("should replace subdomain to origin when options set to replace", async () => {
        expect(subDomainResolver("https://app.env.domain.com", "api", { replace: true })).toEqual("https://api.env.domain.com");
    });

    it("should replace only last subdomain to origin when options set to replace", async () => {
        expect(subDomainResolver("https://app.other.env.domain.com", "api", { replace: true })).toEqual("https://api.other.env.domain.com");
    });

    it("should bypass options and domain when origin match conditions", async () => {
        const conditions = {
            "localhost:8080": "https://custom.env.custom.com",
            "localhost:8081": "http://localhost:8080"
        };

        expect(subDomainResolver("localhost:8080", "api", { conditions })).toEqual("https://custom.env.custom.com");
        expect(subDomainResolver("localhost:8081", "api", { conditions })).toEqual("http://localhost:8080");
    });

    it("should bypass all settings and conditions when match environment variable", async () => {
        const conditions = {
            "localhost:8080": "https://api.env.domain.com",
            "localhost:8081": "http://localhost:8080"
        };
        const envVar = "MAIN_API";
        process.env.MAIN_API = "https://env-var-defined-url.com";

        expect(subDomainResolver("localhost:8080", "api", { conditions, envVar })).toEqual("https://env-var-defined-url.com");
        expect(subDomainResolver("localhost:8081", "api", { conditions, envVar })).toEqual("https://env-var-defined-url.com");
        expect(subDomainResolver("https://otherDomain.com", "api", { conditions, envVar })).toEqual("https://env-var-defined-url.com");
    });

    it("should not bypass all settings and conditions when match environment variable but no variable provided", async () => {
        const conditions = {
            "localhost:8080": "https://api.env.domain.com",
            "localhost:8081": "http://localhost:8080"
        };
        const envVar = "OTHER_MAIN_API";
        process.env.MAIN_API = "https://env-var-defined-url.com";

        expect(subDomainResolver("localhost:8081", "api", { conditions, envVar })).toEqual("http://localhost:8080");
        expect(subDomainResolver("localhost:8080", "api", { conditions, envVar })).not.toBeNull();
        expect(subDomainResolver("localhost:8080", "api", { conditions, envVar })).not.toEqual("https://env-var-defined-url.com");
        expect(subDomainResolver("localhost:8081", "api", { conditions, envVar })).not.toEqual("https://env-var-defined-url.com");
        expect(subDomainResolver("https://otherDomain.com", "api", { conditions, envVar })).not.toEqual("https://env-var-defined-url.com");
    });

    it("should throw error for invalid domain", async () => {
        expect(() => subDomainResolver("invalidUrl", "api")).toThrow();
        expect(() => subDomainResolver("", "api")).toThrow();
    });
});
