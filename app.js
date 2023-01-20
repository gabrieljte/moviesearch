let mainsec = document.querySelector('.movie-grid')
let btnSearch = document.querySelector('.search-btn')
let btnDelete = document.querySelector('.delete-btn')

//pegar o filme com o query e retornar o ID
async function getMovieId(query) {
    //fetching movie by name
    let request = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=693afeb1b62f26148580aabf135da2b2&query=${query}`)
    let reqFullfiled = await request.json()
    return reqFullfiled
}

//pegando os detalhes do filme com o ID
async function getMovieDetails(movieId) {
    let detRequest = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=693afeb1b62f26148580aabf135da2b2&language=pt-BR`)
    let reqSuccess = await detRequest.json()
    return reqSuccess
}


function renderCard(movieData) {
    //creating card
    let elem = document.createElement('div') // criando a div do card
    elem.classList.add('movie-card') // add class movie-card
    elem.innerHTML = ` 
    <p>${movieData.title}</p>
    <button class="card-button">
        <img src="https://image.tmdb.org/t/p/w300/${movieData.poster_path}" style="border-radius: 16px" class="card-img">
    </button>
    `
    elem.style.cursor = 'pointer';
    document.querySelectorAll('.card-img').forEach(img => { //condicional para tratar filmes sem imagens
        if(img.src == "https://image.tmdb.org/t/p/w300/null") {
            img.src = 'images/redx.svg'
        }
    })
    return elem //retornando o elem
}   

btnSearch.addEventListener('click', async () => {
        let currentImages = document.querySelectorAll('.movie-card') //query nos cards atuais para remove-los
        let movieInput = document.querySelector('#movie-input').value //valor do input
        currentImages.forEach(currentImage => currentImage.remove()) //removendo os cards atuais
        getMovieId(movieInput).then(response => response.results.forEach(movie => {  //tratando a promise da async getMovieId
        getMovieDetails(movie.id).then(data => renderCard(data)).then(r => {
        mainsec.append(r)
        return r //append dos cards no movie-grid
        })}
    )).catch(() => alert('Erro ao acessar a API - Certifique-se de preencher o campo adequadamente'))
})

btnDelete.addEventListener('click', () => {
    let currentImages = document.querySelectorAll('.movie-card') //query nos cards atuais para remove-los
    currentImages.forEach(currentImage => currentImage.remove())
})


















