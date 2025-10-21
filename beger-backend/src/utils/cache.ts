import { redis } from 'bun'

export async function withCache<T>(key: string, loader: () => Promise<T>, ttl: number) {
  const cached = await redis.get(key)
  if (cached)
    return JSON.parse(cached) as T

  const data = await loader()

  await redis.setex(key, ttl, JSON.stringify(data))

  return data
}
