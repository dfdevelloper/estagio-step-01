var usersNumber = localStorage.getItem("number");
var count = 7;
var listDb = [];
var isSet = true
var filtered = [];


if(!usersNumber){
  setUsersNumber(count)
  getUserData(count);
}else{
  var url = location.search.slice(4);
  if(url = null){
    setUsersNumber(url)
  }
  var n = getUsersNumber()
  getUserData(n)
}

function getUserData(count) {
  $.ajax({
    url: "https://randomuser.me/api/?results=" + count + "&nat=br&format=json",
    dataType: "json",
    success: function(data) {
      listDb = data.results
      renderUserList(listDb);
      listernerSearchInput();
    }
  });
}


function renderUserList(listUserData) {
  var id3 = 0;
  var id2 = 0;
  var template = "<ul id='ul'>";
  template += "<li id='li'>";
  if(isSet){
    for (let i = 0; i < listUserData.length; i++) {
      id2++;
      id3++
      listUserData[i].id.value = i
      template += '<div class="clients-menu" id="'+ id2 + '">';
      template += '<div class="clients-box">';
      template += '<div class="container">';
      template +=
      '<div class="item basis-auto img" id="' + (id2+3) + '"><img id="' + (id2+5) + '" src="' +
      listUserData[i].picture.thumbnail +
      '">';
      template +=
      '<div class="item basis-auto name" id="name"><a href="profile.html? '+ count +' ">' +
      listUserData[i].name.first +
      "</a>";
      template += "</div><div class='item basis-auto mail'>" + listUserData[i].email;
      template += "</div><div class='item basis-auto phone'>" + listUserData[i].phone;
      template +=
      "</div><div class='item basis-auto local' id='local'><span>" +
      listUserData[i].location.city +
      " - " +
      listUserData[i].location.state;
      template += "</span></div><div class='item basis-auto ic'>";
      template +=
      "<i class='fas fa-trash icons' onclick='deleteUser(" +
      id2 +
      ")'></i><i class='fas fa-check icons' id='iconCheck" + id3 +
      "' onclick='checkUser(" + id3 +")'></i><a style='a:visited{color: inherit}' href='profile.html? " +
      i +
      " '><i class='fas fa-th-list icons'></i></a>";
      template += "</div></div>";
      template += "</div></div></div></div></div></div></div></div>";
    }
  }
  template += "</li>";
  template += "</ul>";
  var x = document.createRange().createContextualFragment(template)
  document.getElementById('ul-wrapper').appendChild(x)
}

function deleteUser(id) {
  loading(id+3,id+5)
  setTimeout(function(){
    document.getElementById(id).remove();
  },1300)
  count--;
  isSet = false
  setUsersNumber(count)
  getUserData(url--)
}

function checkUser(id) {
  var x = document.getElementById("iconCheck"+ id);
  x.style.color = "#9ac321";
}

function listernerSearchInput() {
  var searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('keyup', function(keydown) {
    filtered = listDb.filter(function(res) {
      return res.name.first.match(keydown.target.value);
    });
    clearList()
    renderUserList(filtered)
  });
}

function setUsersNumber(n){
  localStorage.setItem('number', n)
}

function getUsersNumber(){
  localStorage.getItem('number')
  return usersNumber
}

function clearList(){
  document.getElementById('li').remove()
}

function loading(idGif, idImg){
  var gif = document.createElement('img')
  gif.src = '../_imagens/gif-loader.gif'
  gif.id = 'gif'
  document.getElementById(idGif).appendChild(gif)
  document.getElementById(idImg).style.opacity = '0.2'
}