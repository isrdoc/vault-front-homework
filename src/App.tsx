import React, { useState } from 'react'
import styled from 'styled-components'

import Input from './Input'
import useFetch from './useFetch'

const API = 'http://localhost:5001'

type Notification = {
  id: string
  type: string
  data: {
    id: number
    amount: number
    unit: string
    from: string
    to: string
  }
}

export default function App(): React.ReactElement {
  const [searchText, setSearchText] = useState('')
  const searchUrl = `${API}/search?type=${searchText}`
  const { isLoading, error, results: notifications } = useFetch<Notification[]>({ url: searchUrl })

  return (
    <Container>
      <Input value={searchText} onChange={setSearchText} placeholder="Type to filter events" />
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
