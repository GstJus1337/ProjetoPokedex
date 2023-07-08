const containerPokemon = document.querySelector('#containerPokemons');

const pokemonCount = 151;

const colors = {
    fire: 'linear-gradient(to top, #C85702, #F2C200)',
    grass: 'linear-gradient(to top, #005816, #32BE00)',
    electric: 'linear-gradient(to top, #E2A104, #F7DD77)',
    water: 'linear-gradient(to top, #004A8B, #02B7FB)',
    ground: 'linear-gradient(to top, #23160E, #524532)',
    rock: 'linear-gradient(to top, #000000, #4B4B4B)',
    fairy: 'linear-gradient(to top, #DD69D8, #FFD3FD)',
    poison: 'linear-gradient(to top, #752572, #E172DD)',
    bug: 'linear-gradient(to top, #715A22, #A78F56)',
    dragon: 'linear-gradient(to top, #23006B, #541CCC)',
    psychic: 'linear-gradient(to top, #100619, #441174)',
    flying: 'linear-gradient(to top, #695787, #B591F0)',
    fighting: 'linear-gradient(to top, #695787, #B591F0)',
    normal: 'linear-gradient(to top, #676767, #BFBFBF)',
    ice: 'linear-gradient(to top, red, #02B7FB)'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemonCount; i++){
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await resp.json()
    createPokemonCard(data)
};

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')

form.addEventListener('submit', (event) => {
    event.preventDefault();

})

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("card");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)

    const id = poke.id.toString().padStart(3, '')

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    let type2 = pokeTypes.slice(1)[0]
    
    if (type2 === 'undefined'){
      type2 = ''
    }


    const hp = parseInt(poke.stats[0]['base_stat'])
    const attack = parseInt(poke.stats[1]['base_stat'])
    const defense = parseInt(poke.stats[2]['base_stat'])

    const color = colors[type]

    card.style.background = color;

    const pokemonInnerHtml = `
    <div class="gridLayout">
                <div class="card">
                    <a href="#" class="favoriteButton">
                        <span class="material-symbols-outlined favoriteIconCard">
                            favorite
                            </span>
                    </a>
                    <div class="pokemonImage">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
                        <h3 class="pokemonId">#${id}</h3>
                        <h2 class="pokemonName">${name}</h2>
                    </div>
                    <div class="pokemonInformation">
                        <h3 class="pokemonType">
                          ${type}
                          ${type2 !== '' ? `<span class="pokemonType">${type2}</span>` : ''}
                        </h3>
                        <div class="containerInformation">
                          <div class="status">
                              ${hp}
                              <p>HP</p>
                          </div>
                          <div class="status">
                              ${attack}
                              <p>Attack</p>
                          </div>
                          <div class="status">
                              ${defense}
                              <p>Defense</p>
                          </div>
                        </div>
                </div>
            </div>
    `

    card.innerHTML = pokemonInnerHtml

    containerPokemon.appendChild(card)
}

fetchPokemons()