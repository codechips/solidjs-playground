import type { Component } from 'solid-js'
import { Time, Interval } from './Time'
import Wisdom from './Wisdom'

const App: Component = () => {
  return (
    <div>
      <Time frequency={Interval.FiveSec} />
      <Wisdom />
    </div>
  )
}

export default App
