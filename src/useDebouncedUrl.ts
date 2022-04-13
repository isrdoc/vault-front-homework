import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

const API = 'http://localhost:5001'

type Return = {
  searchUrl: string
  setSearchUrlDebounced: (nextSearchText: string) => void
}

export default function useDebouncedUrl(delay = 500): Return {
  const [searchUrl, setSearchUrl] = useState('')

  const setSearchUrlDebounced = useCallback(
    debounce((nextSearchText) => setSearchUrl(`${API}/search?type=${nextSearchText}`), delay, {
      leading: false,
      trailing: true,
    }),
    []
  )

  return { searchUrl, setSearchUrlDebounced }
}
