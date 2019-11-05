document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3853 //Enter the id from the fetched image here

  let imagebox = document.getElementById("image")

  let namebox = document.getElementById("name")
  let likebox = document.getElementById("likes")
  let submitbox = document.getElementById("gimmie")
  let contentbox = document.getElementById("comment_input")
  let displaybox = document.getElementById("comments")

  

  let buttonbox = document.getElementById("like_button")

  submitbox.addEventListener('click', ev => {
    ev.preventDefault()
    commentstring = contentbox.value
    console.log(commentstring)

    if (commentstring != ""){

    let majig = document.createElement("li")

    majig.textContent = commentstring
    contentbox.value = ''

    displaybox.append(majig)

    makeItSueCommentNow(commentstring)

      let delbutt = document.createElement("button")


    majig.append(delbutt)
    delbutt.addEventListener("click", ev => {
      displaybox.removeChild(majig)
    })

  }
  })

  buttonbox.addEventListener('click', () => {

    if (isNaN(parseInt(likebox.textContent))){
      likebox.textContent = 0

    }

    likebox.textContent =   (parseInt(likebox.textContent) + 1) +""
  
    makeItSoLikeNow(parseInt(likebox.textContent))
  
})

  let URL = `https://randopic.herokuapp.com/images/${imageId}`
  let outside;


  fetch(URL).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
).then(res => {

  namebox.textContent =res.data.name
  imagebox.src = res.data.url
  likebox.textContent = res.data.like_count
  giddyarray = res.data.comments


  for (h = 0; h< giddyarray.length; h++){

  let majig = document.createElement("li")
  majig.textContent = giddyarray[h].content
  let delbutt = document.createElement("button")


  majig.append(delbutt)
  delbutt.addEventListener("click", ev => {
    displaybox.removeChild(majig)
  })

  displaybox.appendChild(majig)
}
    console.log(res.status, res.data.name)
}));


  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

function makeItSueCommentNow(conetent){

  let conntent = []
  fetch(URL).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
).then(res => {
  conntent = res.data.comments

console.log(res.data.comments)
console.log(conntent)
}));


conntent[conntent.length] = conetent

  let data = {
    image_id: 3853,
    content: conetent
  }

  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(data)
})
}







function makeItSoLikeNow(likenum){

  let data = {
    image_id: 3853,
    like_count: likenum
  }

  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(data)
})
}

})
