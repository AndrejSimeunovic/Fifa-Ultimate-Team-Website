var removeButtons = document.getElementsByClassName('btn-danger')

for (var i = 0; i < removeButtons.length; i++) {
    var button = removeButtons[i].addEventListener('click', removePlayer)

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
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        console.log(price)
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total

}

