import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
// 1. add `react-cache` as a project dependency
// 2. import resource creators from react-cache
import { unstable_createResource as createResource } from 'react-cache'

let PokemonResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon/1/').then(res => res.json())
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
function PokemonDetail() {
  const data = PokemonResource.read()
  const { name, abilities, height, moves, sprites, stats, types, weight } = data
  return (
    <section>
      <h3>Pokemon Details:</h3>
      <img src={sprites.front_default} alt="bulbasaur" />
      <ul>
        <li>name: {name}</li>
        <li>
          abilities:
          <ul>
            {abilities.map(({ ability: { name } }) => (
              <PokemonListItem key={name}>{name}</PokemonListItem>
            ))}
          </ul>
        </li>
        <li>height: {height}</li>
        <li>
          moves:
          <ul>
            {moves.map(({ move: { name } }) => (
              <PokemonListItem key={name}>{name}</PokemonListItem>
            ))}
          </ul>
        </li>
        <li>
          stats:
          <ul>
            {stats.map(({ stat: { name } }) => (
              <PokemonListItem key={name}>{name}</PokemonListItem>
            ))}
          </ul>
        </li>
        <li>
          types:
          <ul>
            {types.map(({ type: { name } }) => (
              <PokemonListItem key={name}>{name}</PokemonListItem>
            ))}
          </ul>
        </li>
        <li>weight: {weight}</li>
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
      <Suspense fallback={<div>...loading</div>}>
        <PokemonDetail />
      </Suspense>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
