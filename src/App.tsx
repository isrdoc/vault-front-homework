import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Input from './Input'

const API = 'http://localhost:5001'

type Notif = {
  id: string
  type: string
  // FIXME we should *probably* not have this `any`
  data: any
}

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [results, setResults] = useState<Notif[] | null>(null)

  useEffect(() => {
    const effect = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API}/search?type=${searchText}`)
        const data = await res.json()
        setResults(data)
        setLoading(false)
      } catch (error) {
        setError(error as Error)
        setLoading(false)
      }
    }
    effect()
  }, [searchText])

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
