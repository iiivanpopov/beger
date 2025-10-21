export async function withCache<T>(key: string, loader: () => Promise<T>, ttl: number) {
  const cached = await Bun.redis.get(key)
  if (cached)
    return JSON.parse(cached) as T

  const data = await loader()

  await Bun.redis.setex(key, ttl, JSON.stringify(data))

  return data
}
