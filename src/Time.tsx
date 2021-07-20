import { createSignal, createMemo, onCleanup } from 'solid-js'
import { differenceInSeconds, format } from 'date-fns'

export enum Interval {
  OneSec = 1,
  FiveSec = 5,
  TenSec = 10,
}

interface TimeProps {
  frequency: Interval
}

export const Time = (props: TimeProps = { frequency: Interval.OneSec }) => {
  const loadTime = new Date()
  const [spent, setSpent] = createSignal(0)
  const timer = setInterval(
    () => setSpent(differenceInSeconds(new Date(), loadTime)),
    props.frequency * 1000
  )
  const timeSpent = createMemo(() => format(new Date(spent() * 1000), 'mm:ss'))

  onCleanup(() => clearInterval(timer))

  return (
    <p class='px-2 py-1 text-center text-indigo-900 bg-indigo-400'>
      You've just wasted <strong>{timeSpent()}</strong> of your life on Kanye
    </p>
  )
}
