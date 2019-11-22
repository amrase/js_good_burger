document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  const getContainer = document.querySelector('.container')
  const getMenu = document.querySelector('.menu')
  const getBurgerForm = document.querySelector('#custom-burger')
  const orderDiv = document.querySelector('.order')

  let getBurgerMenu = document.querySelector('#burger-menu')
  fetch('http://localhost:3000/burgers')
  .then(resp=>resp.json())
  .then((burgerArray)=>{
    //console.log(burgerArray)
    burgerArray.forEach((burger)=>{
      createBurger(burger)
    })
  })








function  createBurger(burgerObj){
  
  let orderList = document.querySelector('#order-list')


  let burgerDiv = document.createElement('div')
  burgerDiv.className='burger'


  let burgerH3 = document.createElement('h3')
  burgerH3.className='burger_title'
  burgerH3.innerText=burgerObj.name
  //console.log(burgerObj.name)

  let burgerImage = document.createElement('img')
  burgerImage.src=burgerObj.image 
  //console.log(burgerObj.image)

  let burgerP = document.createElement('p')
  burgerP.className='burger_description'
  burgerP.innerText=burgerObj.description
  
  let burgerButton = document.createElement('button')
  burgerButton.className='button'
  burgerButton.innerText = 'Add to Order'
  burgerButton.dataset.id=burgerObj.id


  let deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.className = 'button'



  burgerDiv.append(burgerH3,burgerImage,burgerP,burgerButton,deleteButton)
  getBurgerMenu.append(burgerDiv)
  getMenu.append(getBurgerMenu)
  //console.log(getMenu)


    burgerButton.addEventListener('click',(evt) =>{
      let burgerLi = document.createElement('li')
      burgerLi.dataset.id = burgerObj.id
      burgerLi.textContent = burgerObj.name

    
      orderList.append(burgerLi)
      orderDiv.append(orderList)


    })



    deleteButton.addEventListener('click',()=>{
      fetch(`http://localhost:3000/burgers/${burgerObj.id}`,{
        method: "DELETE"

      })
      .then(resp => resp.json())
      .then((deletBurgerObj)=>{
        burgerDiv.remove();
      })
    })
  }

 

  getBurgerForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();

    let burgerName = evt.target.name.value
    //console.log(burgerName)
    let burgerDescription = evt.target.description.value
    //console.log(burgerDescription)
    let burgerImg = evt.target.url.value
    //console.log(burgerImg)

    //fetch 
      fetch(`http://localhost:3000/burgers/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: burgerName,
        description: burgerDescription,
        image: burgerImg
      })

      })

      .then(resp => resp.json())
      .then((newBurger) =>{
        createBurger(newBurger)
        evt.target.reset();
    })
   

   

  })



})