const key = 'state'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(key)

    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch {
    return undefined
  }
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem(key, serializedState)
  } catch {
    // ignore write errors
  }
}
