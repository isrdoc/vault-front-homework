import React, { useState } from 'react'
import styled from 'styled-components'

import Input from './Input'
import useFetch from './useFetch'

const API = 'http://localhost:5001'

type Notification = {
  id: string
  type: string
  // FIXME we should *probably* not have this `any`
  data: any
}

const App = () => {
  const [searchText, setSearchText] = useState('')
  const searchUrl = `${API}/search?type=${searchText}`
  const { isLoading, error, results } = useFetch<Notification[]>({
    url: searchUrl,
  })

  return (
    <Container>
      <Input
        value={searchText}
        onChange={setSearchText}
        placeholder="Type to filter events"
      />
      {error ? (
        <div>{'Something went wrong. Please try again'}</div>
      ) : isLoading ? (
        <div>{'Loading...'}</div>
      ) : results ? (
        <div>
          {results.map((r) => (
            // TODO we must finalize this integration!! not very pretty like this
            <Item>{JSON.stringify(r)}</Item>
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

export default App
