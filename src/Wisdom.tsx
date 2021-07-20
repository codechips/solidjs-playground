import { createResource, Switch, Match } from 'solid-js'
import { Transition } from 'solid-transition-group'
import usa from './assets/usa.svg'

type Quote = {
  quote: string
}

// this is defined in .env file in the project root folder
const KANYE_API = import.meta.env.VITE_KANYE_API as string

const fetchQuote = async () => (await fetch(KANYE_API)).json()

const [quote, { refetch }] = createResource<Quote>(fetchQuote)

export default function Wisdom() {
  return (
    <div class='container p-5 mx-auto max-w-3xl lg:mt-24'>
      <h1 class='text-5xl md:text-7xl font-black text-indigo-900 lg:items-center lg:flex'>
        <img src={usa} alt='USA' class='inline-block w-32 h-20' />
        <div class='leading-none mt-5 lg:mt-0 lg:ml-4'>
          Sh<span class='text-red-700'>*</span>t Kanye says
        </div>
      </h1>

      <div class='mt-5 text-5xl md:text-7xl font-extrabold leading-none text-indigo-800'>
        <Transition name='fade'>
          <Switch fallback={<p>Failed to fetch quote</p>}>
            <Match when={quote.loading}>
              <p class="releative">Loading ...</p>
            </Match>
            {/* if you don't handle errors the whole app breaks */}
            <Match when={quote.error}>
              <p class="relative text-red-600">{quote.error.message}</p>
            </Match>
            <Match when={quote()}>{q => <p class="relative">{q.quote}</p>}</Match>
          </Switch>
        </Transition>
      </div>

      <div class='mt-10'>
        {/* no way to easy style components with Tailwind */}
        <button onClick={refetch} class='btn-fetch'>
          Preach to me!
        </button>
      </div>
    </div>
  )
}
