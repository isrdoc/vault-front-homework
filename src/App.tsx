import React, { useState } from 'react'
import styled from 'styled-components'

import Input from './Input'
import useFetch from './useFetch'
import useDebouncedUrl from './useDebouncedUrl'

type Transaction = {
  id: number
  amount: number
  unit: string
  from: string
  to: string
}

type Account = {
  id: number
  name: string
  currency: string
}

type Notification = {
  id: string
  type: string
  data: Transaction | Account
}

export default function App(): React.ReactElement {
  const [searchText, setSearchText] = useState('')
  const { searchUrl, setSearchUrlDebounced } = useDebouncedUrl()
  const { isLoading, error, results: notifications } = useFetch<Notification[]>({ url: searchUrl })

  const handleChange = (nextSearchText: string) => {
    setSearchText(nextSearchText)
    setSearchUrlDebounced(nextSearchText)
  }

  return (
    <Container>
      <Input value={searchText} onChange={handleChange} placeholder="Type to filter events" />

      <span className="text-3xl font-bold">Test</span>

      {error ? (
        <div>{'Something went wrong. Please try again'}</div>
      ) : isLoading ? (
        <div>{'Loading...'}</div>
      ) : notifications ? (
        <div>
          {notifications.map((notification) => (
            // TODO we must finalize this integration!! not very pretty like this
            <Item key={notification.id}>{JSON.stringify(notification)}</Item>
          ))}
        </div>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Item = styled.div`
  border: 2px dashed red;
`
