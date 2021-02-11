const getUrl = 'http://localhost:3000/quotes?_embed=likes'
const postUrl = 'http://localhost:3000/quotes'

const main = () => {
    fetchQuotes()
    addSubmitListener()
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
    if (quote.likes){
        span.innerText = quote.likes.length
    } else {
        span.innerText = 0
    }

    likeButton.append(span)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn-danger'
    deleteButton.innerText = 'DELETE'

    blockquote.append(p, footer, br, likeButton, deleteButton)
    li.append(blockquote)
    ul.append(li)
}

const addSubmitListener = () => {
    const form = document.getElementById('new-quote-form')

    form.addEventListener('submit', event => {
        event.preventDefault()
        // debugger
        const newQuote = {
            quote: event.target.children[0].children[1].value,
            author: event.target.children[1].children[1].value
        }

        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuote)
        }

        fetch(postUrl, reqObj)
        .then(resp => resp.json())
        .then(quote => renderQuote(quote))
    })
}

main()