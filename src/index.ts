export default function subDomainResolver(origin: string, subDomain: string, options?: { replace?: boolean; protocol?: string; envVar?: string; conditions?: Record<string, string> }): string {
    const url = new URL(origin);

    if (options) {
        if (options.envVar && process.env[options.envVar]) return process.env[options.envVar];
        if (options.conditions?.[origin]) return options.conditions[origin];
        if (options.replace) url.hostname = url.hostname.slice(url.hostname.indexOf(".") + 1);
        if (options.protocol) url.protocol = options.protocol.toString();
    }

    url.hostname = subDomain + "." + url.hostname;
    return url.origin;
}
