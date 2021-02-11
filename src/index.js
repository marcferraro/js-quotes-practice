const getUrl = 'http://localhost:3000/quotes?_embed=likes'

const main = () => {
    fetchQuotes()
    // fetchQuotesJson(getUrl)
}

const fetchJson = (url) => {
    return fetch(url)
    .then(resp => resp.json())
    // .then(quotes => console.log(quotes))
}

const fetchQuotes = () => {
    fetchJson(getUrl).then(quotes => quotes.forEach(quote => renderQuote(quote)))
}

const renderQuote = (quote) => {
    const ul = document.getElementById('quote-list')

    const li = document.createElement('li')
    li.className = 'quote-card'

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'blockquote'

    const p = document.createElement('p')
    p.className = 'mb-0'
    p.innerText = quote.quote

    const footer = document.createElement('footer')
    footer.className = "blockquote-footer"
    footer.innerText = quote.author

    const br = document.createElement('br')

    const likeButton = document.createElement('button')
    likeButton.className = 'btn-success'
    likeButton.innerText = 'Likes: '

    const span = document.createElement('span')
    span.innerText = quote.likes.length

    likeButton.append(span)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn-danger'
    deleteButton.innerText = 'DELETE'

    blockquote.append(p, footer, br, likeButton, deleteButton)
    li.append(blockquote)
    ul.append(li)
    // console.log(quote.quote)

}

main()