if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var removeButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i]
        button.addEventListener('click', removePlayer)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', updateValue)
    }

    var addToCartButtons = document.getElementsByClassName('player-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var addToCartButton = addToCartButtons[i]
        addToCartButton.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removePlayer(event) {
    var buttonClicked = event.target
    var player = buttonClicked.parentElement.parentElement
    player.remove()
    updateCartTotal()

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total

}


function updateValue(event) {
    inputClicked = event.target
    if (isNaN(inputClicked.value) || inputClicked.value <= 0) {
        inputClicked.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var playerItem = event.target.parentElement.parentElement
    var title = playerItem.getElementsByClassName('player-item-title')[0].innerText
    var playerImage = playerItem.getElementsByClassName('player-item-image')[0].src
    var playerPrice = playerItem.getElementsByClassName('player-item-price')[0].innerText
    addToCart(title, playerImage, playerPrice)
    updateCartTotal()
}

function addToCart(title, playerImage, playerPrice) {

    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-player-name')

    for (var i = 0; i < cartItemsNames.length; i++) {
        var cartItemName = cartItemsNames[i].innerText
        if (title == cartItemName) {
            alert('This player is already added to the cart')
            return
        }

    }


    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartRowContents = `
   
    <div class="cart-player cart-column">
        <img class="cart-player-image" src="${playerImage}">
        <span class="cart-player-name">${title}</span>
    </div>

    <span class="cart-price cart-column">${playerPrice}</span>

    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger cart-quantity button" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removePlayer)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateValue)
}

function purchaseClicked(event) {
    alert('Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}









