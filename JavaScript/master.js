let billInput = document.querySelector(".bill .input-container input")
let numberOfPeopelInput = document.querySelector(".people-number .input-container input")
let customInput = document.querySelector(".tip-grid input")

let selectionBtns = document.querySelectorAll(".tip-grid div")

let resetBtn = document.querySelector(".reset-btn")

let tipAmounts = document.querySelectorAll(".right .calc h1")



function numbersOnly () {
    let regExp = /\d+/ig
    billInput.oninput = () => {
        if (billInput.value.match(regExp) === null) {
            billInput.value = ""
        }
    }
    numberOfPeopelInput.oninput = () => {
        if (numberOfPeopelInput.value.match(regExp) === null) {
            numberOfPeopelInput.value = ""
        }
    }
    customInput.oninput = () => {
        customInput.value = parseInt(customInput.value)
        if (customInput.value.match(regExp) === null) {
            customInput.value = ""
        }
    }
}
numbersOnly()

function resetReveal() {
    tipAmounts.forEach(ele => {
        if (ele.innerHTML.slice(1) > 0) {
            resetBtn.classList.add("reveal")
            resetBtn.onclick = () => {
                tipAmounts.forEach (el => {
                    el.innerHTML = `$0.00`
                })
                resetBtn.classList.remove("reveal")
                selectionBtns.forEach(element => {
                    element.classList.remove("active")
                })
            }
        }
    })
}


selectionBtns.forEach(btn => {
    btn.addEventListener("click" , (e) => {
        if (numberOfPeopelInput.value <= 0) {
            numberOfPeopelInput.classList.add("wrong")
            numberOfPeopelInput.parentElement.classList.add("wrong")
        } else {
            numberOfPeopelInput.classList.remove("wrong")
            numberOfPeopelInput.parentElement.classList.remove("wrong")
            handleActiveClass(e)
            customInput.value = ""

            let division = (billInput.value / numberOfPeopelInput.value)
            let tipAmount = ((division * e.target.dataset.tip) / 100).toFixed(2)
            let total = (+tipAmount + +division).toFixed(2)

            document.querySelector(".tip h1").innerHTML = tipAmount
            document.querySelector(".total h1").innerHTML = total

            resetReveal()
        }
    })
})

customInput.oninput = () => {
    if (numberOfPeopelInput.value <= 0 || customInput.value === "") {
        numberOfPeopelInput.classList.add("wrong")
        numberOfPeopelInput.parentElement.classList.add("wrong")
    } else {
        resetBtn.click()
        numberOfPeopelInput.classList.remove("wrong")
        numberOfPeopelInput.parentElement.classList.remove("wrong")
        let division = (billInput.value / numberOfPeopelInput.value)
        let tipAmount = ((division * customInput.value) / 100).toFixed(2)
        let total = (+tipAmount + +division).toFixed(2)

        document.querySelector(".tip h1").innerHTML = tipAmount
        document.querySelector(".total h1").innerHTML = total

        resetReveal()
    }
}


function handleActiveClass (event) {
    selectionBtns.forEach(btn => {
        btn.classList.remove("active")
    })
    event.target.classList.add("active")
}

