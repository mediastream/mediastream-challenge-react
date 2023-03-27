import { useEffect, useState, useCallback } from 'react'

interface IState<T> {
  loading: boolean
  data: T | undefined
  error: any | undefined
}

function useFetch<T>(service: any) {
  const [state, setState] = useState<IState<T>>({
    loading: true,
    data: undefined,
    error: undefined,
  })
  const [refetchIndex, setRefetchIndex] = useState(0)

  const refetch = () => setRefetchIndex(prevRefetchIndex => prevRefetchIndex + 1)

  const execute = useCallback(async () => {
    try {
      setState(prevState => ({
        ...prevState,
        loading: true,
      }))

      const data: T = await service().then((res: any) => res.json())
      if (Array.isArray(data) || typeof data === 'object') {
        setState({
          loading: false,
          data,
          error: undefined,
        })
      } else {
        setState({
          loading: false,
          data: undefined,
          error: new Error('data not an array'),
        })
      }
    } catch (error: any) {
      setState({
        loading: false,
        data: undefined,
        error: error?.message,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, refetchIndex])

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchIndex])

  return { ...state, refetch }
}

export default useFetch
