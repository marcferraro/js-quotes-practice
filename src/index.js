const getUrl = 'http://localhost:3000/quotes?_embed=likes'
const postUrl = 'http://localhost:3000/quotes'
const likeUrl = 'http://localhost:3000/likes'

const main = () => {
    fetchQuotes()
    addSubmitListener()
    addClickListener()
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
    likeButton.dataset.id = quote.id

    const span = document.createElement('span')
    if (quote.likes){
        span.innerText = quote.likes.length
        span.dataset.likes = quote.likes.length
    } else {
        span.innerText = 0
        span.dataset.likes = 0
    }

    likeButton.append(span)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn-danger'
    deleteButton.innerText = 'DELETE'
    deleteButton.dataset.id = quote.id

    blockquote.append(p, footer, br, likeButton, deleteButton)
    li.append(blockquote)
    ul.append(li)
}

const addSubmitListener = () => {
    const form = document.getElementById('new-quote-form')

    form.addEventListener('submit', event => {
        event.preventDefault()

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

        event.target.children[0].children[1].value = ""
        event.target.children[1].children[1].value = ""

    })
}

const addClickListener = () => {
    const body = document.querySelector('body')

    body.addEventListener('click', event => {
        event.preventDefault

        if (event.target.className === 'btn-danger'){
            deleteQuote(event.target)
        }

        if (event.target.className === 'btn-success'){
            likeQuote(event.target)
        }
    })
}

const deleteQuote = (eventTarget) => {
    // debugger
    const reqObj = {
        method: "DELETE"
    }

    fetch(postUrl+ `/${eventTarget.dataset.id}`, reqObj)
    .then(resp => resp.json())
    // .then(deletedQuote => )
    eventTarget.parentElement.parentElement.remove()
    alert(`Successfuly Deleted Quote.`)
    // debugger
}

const likeQuote = (eventTarget) => {
    // debugger
    const likeObj = {
        quoteId: parseInt(eventTarget.dataset.id),
        createdAt: Date.now()
    }

    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObj)
    }

    fetch(likeUrl, reqObj)
    .then(resp => resp.json())
    .then(like => console.log(like, 'successfully liked'))

    const span = eventTarget.firstElementChild
    span.dataset.likes = parseInt(span.dataset.likes, 10) + 1
    span.innerText = span.dataset.likes

}


main()