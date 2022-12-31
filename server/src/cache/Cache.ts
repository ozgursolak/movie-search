const NodeCache = require("node-cache")
const cache = new NodeCache({ "stdTTL": 30});

export function addCache(key: string, value: any): boolean
{
    return cache.set(key, value);
}

export function getFromCache(key: string): Array<object>
{
    return cache.get(key);
}

export function existsInCache(key: string): boolean
{
    return cache.get(key) != null;
}

export function flushCache(): void
{
    cache.flushAll();
}
