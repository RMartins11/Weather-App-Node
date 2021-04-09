

console.log("Client side javascript file is loaded!")

fetch("http://localhost:5000/weather?address=lisbon").then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data.location)
        console.log(data.forecast)
      }
    })
})

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#messageOne")
const messageTwo = document.querySelector("#messageTwo")



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const location = search.value

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
          messageTwo.textContent = data.error
      } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        
      }
    })
})

})