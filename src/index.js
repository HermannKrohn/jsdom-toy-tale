const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const inputName = document.querySelector('#toy-name');
const inputUrl = document.querySelector('#toy-url');
let addToy = false;

const submitBtn = document.querySelector('.submit');


submitBtn.addEventListener('click', e => {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": inputName.value,
      "image": inputUrl.value,
      "likes": 0
    })
  });
});

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }
});


function fetchAllToys(){
  let toysArray = fetch('http://localhost:3000/toys').then(function(res){
    return res.json();
  });
  return toysArray;
}

//===================MAIN==================

fetchAllToys().then(toysArray => {
  let toyArea = document.querySelector('#toy-collection');
  for(let i = 0; i < toysArray.length-1; i++){
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    let toyName = document.createElement('h2');
    toyName.innerText = toysArray[i].name;
    let toyImg = document.createElement('img');
    toyImg.setAttribute('src', toysArray[i].image);
    toyImg.setAttribute('class', 'toy-avatar');
    let toyLikes = document.createElement('p');
    toyLikes.setAttribute('class', 'likes');
    if(toysArray[i].likes === 1){
      toyLikes.innerText = toysArray[i].likes + " Like"
    }else{
      toyLikes.innerText = toysArray[i].likes + " Likes"
    }
    let likeBtn = document.createElement('button'); //Remember to add like functionality
    likeBtn.setAttribute('class', 'like-btn');
    likeBtn.innerText = 'Like <3';
    likeBtn.addEventListener('click', e => {
      let toy = toysArray[i];
      let likeCount = parseInt(e.target.parentElement.querySelector('.likes').innerText) + 1;
      e.target.parentElement.querySelector('.likes').innerText = likeCount + " Likes"
      fetch(`http://localhost:3000/toys/${toy.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      });
    });
    card.append(toyName);
    card.append(toyImg);
    card.append(toyLikes);
    card.append(likeBtn);
    toyArea.append(card);
  }
})

