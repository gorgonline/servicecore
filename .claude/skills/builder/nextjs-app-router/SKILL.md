---
name: nextjs-app-router
description: Next.js App Router rehberi. Server component, route, data fetching, metadata, API handler yazarken kullan.
user-invocable: false
---

# Next.js App Router Rehberi

Mevcut Next.js versiyonu:
!grep '"next"' website/package.json 2>/dev/null || echo "next bulunamadi"

## Dosya Konvansiyonlari

```
app/
  layout.tsx    — Root layout (zorunlu)
  page.tsx      — Sayfa UI
  loading.tsx   — Suspense boundary
  error.tsx     — Hata boundary
  not-found.tsx — 404
  route.ts      — API handler
```

## Server Components (varsayilan)

```tsx
async function Page() {
  const data = await fetchData();
  return <View data={data} />;
}
```

`'use client'` sadece state/effect/event gerektiginde.

## Paralel Fetch

```tsx
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

## Server Actions

```tsx
'use server';
export async function create(formData: FormData) {
  await db.create({ data: { title: formData.get('title') as string } });
  revalidatePath('/list');
}
```

## Route Izolasyonu

`(main)` ve `(orkestra)` arasi import YASAK. Ortak component: `src/components/shared/`.

## Kurallar

- Client component agacin yapraginda
- Server-Client arasi sadece serializable props
- loading.tsx ile route-level loading state
