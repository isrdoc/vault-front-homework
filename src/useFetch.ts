import { useEffect, useState } from 'react'

type UseFetch = {
  url: string
}

type Return<T> = {
  isLoading: boolean
  error: Error | null
  results: T | null
}

export default function useFetch<T>({ url }: UseFetch): Return<T> {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [results, setResults] = useState<T | null>(null)

  useEffect(() => {
    const effect = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        const data = await response.json()
        setResults(data)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }
    effect()
  }, [url])

  return { isLoading, error, results }
}
