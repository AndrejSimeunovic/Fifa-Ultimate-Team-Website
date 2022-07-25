const inputList = document.querySelectorAll("input");
const form = document.querySelectorAll("form")[0];
const btn = document.querySelector("button");
let validList = [];


form.addEventListener("input", checkValidity);
btn.addEventListener("click", validateForm);

function checkValidity(event) {
  if (event.target.id === 'confirmPassword') {
    checkPassword(event.target);
  }

  if (event.target.validity.valid) {
    event.target.style.border = "1px solid green";
    event.target.style.backgroundColor = "lightgreen";
  } else {
    event.target.style.border = "1px solid red";
    event.target.style.backgroundColor = "lightcoral";
  }
}

function validateForm(e) {
  inputList.forEach((el) => {
    if (el.checkValidity()) {
      el.style.border = "1px solid green";
    } else {
      el.style.border = "1px solid red";
    }
    validList.push(el.checkValidity());
  });
  if (validList.includes(false)) {
    alert("please fill in all required fields!");
    let filter = validList.filter((el) => el === true);
    validList = filter;
    // e.preventDefault()
  } else {
    alert("Welcome to the tournament!");
    validList = [];
  }
}

function checkPassword(input) {
    let password = form[4]
    if(password.checkValidity() && password.value === input.value){
    console.log('hello!!')
    input.setCustomValidity("");
    console.log(input.checkValidity())
    } else {
        input.setCustomValidity("Password mismatch!")
    }
}
