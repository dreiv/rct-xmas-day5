import React from 'react'
import ReactDOM from 'react-dom'
// 1. add `react-cache` as a project dependency
// 2. import resource creators from react-cache
import { unstable_createResource as createResource } from 'react-cache'

// 3. create a pokemon resource that fetches data
let PokemonCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json())
)

function PokemonListItem({ className, component: Component = 'li', ...props }) {
  return (
    <Component
      className={['pokemon-list-item', className].join(' ')}
      {...props}
    />
  )
}

// 4. pull your resource-reading UI into a component
function PokemonList() {
  return (
    <section>
      <h3>Pokemons:</h3>
      <ul>
        {/* 5. read resource data */}
        {PokemonCollectionResource.read().results.map(pokemon => (
          <PokemonListItem key={pokemon.name}>{pokemon.name}</PokemonListItem>
        ))}
      </ul>
    </section>
  )
}

function App() {
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Five">
          ⚛️🎄✌️
        </span>
        : Day 5
      </h1>
      {/* 6. wrap your resource-reading component in the Suspense component */}
      {/*    ...and provide a fallback */}
      <React.Suspense fallback={<div>...loading</div>}>
        <PokemonList />
      </React.Suspense>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
