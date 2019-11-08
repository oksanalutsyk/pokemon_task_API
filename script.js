let getId = x => document.getElementById(x);

let arr = [];
let right;
let limit = 12;

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

getId("more").addEventListener("click", () => {
  limit += 3;
  console.log(limit);
  wrap.remove();
  window.onload();
});

window.onload = function() {
  foundPokemon();
};

function foundPokemon() {
  wrap = document.createElement("div");
  wrap.classList.add("wrap");
  getId("bigBox").appendChild(wrap);

  let xhr0 = new XMLHttpRequest();
  xhr0.open("GET", "http://pokeapi.co/api/v2/type/?limit=" + limit, false);
  xhr0.send();
  let json0 = xhr0.responseText;
  data0 = JSON.parse(json0);
  console.log(data0);

  for (let i = 1; i <= limit; i++) {
    num = i;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://pokeapi.co/api/v2/pokemon/" + num, false);
    xhr.send();
    let json = xhr.responseText;
    let data = JSON.parse(json);
    console.log(data);

    console.log(data.types);
    console.log(data.types.length);

    render();

    function render() {
      let block = document.createElement("div");
      let block2 = document.createElement("div");
      wrap.appendChild(block);
      block.classList.add("smallBlock");
      block2.classList.add("smallBlock2");
      block.insertAdjacentHTML(
        "beforeend",
        `<img src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png class="photo" id="${data.id}" onclick="more()">`
      );
      block.insertAdjacentHTML("beforeend", `<p class="name">${data.name}</p>`);
      block.appendChild(block2);

      for (let i = 0; i < data.types.length; i++) {
        block2.insertAdjacentHTML(
          "beforeend",
          `<div class="type"><p class="typeName">${data.types[i].type.name}</p></div>`
        );
      }
    }
  }
}

function more() {
  topFunction();
  getId("pokemon").style.display = "block";
  let idPikachu = event.target.id;
  console.log(idPikachu);

  let xhr2 = new XMLHttpRequest();
  let data2;
  xhr2.open("GET", "http://pokeapi.co/api/v2/pokemon/" + idPikachu, false);
  xhr2.send();
  if (xhr2.readyState == 4 && xhr2.status == 200) {
    let json2 = xhr2.responseText;
    data2 = JSON.parse(json2);
    console.log(data2);

    for (let i = 0; i < data2.types.length; i++) {
      console.log(data2.types[i].type.name);
      type = data2.types[i].type.name;
      console.log(type + " ");
    }
    types();

    function types() {
      arr.splice(0, arr.length);
      for (let j = 0; j < data2.types.length; j++) {
        arr.push(data2.types[j].type.name);
      }
      console.log(arr);
    }
    render2();
    function createRightBlock() {
      right = document.createElement("div");
      right.classList.add("right");
      getId("pokemon").appendChild(right);

      right.insertAdjacentHTML(
        "beforeend",
        `<img src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPikachu}.png clearRightBlock() onclick="clearRightBlock()" class="photo">`
      );
      right.insertAdjacentHTML(
        "beforeend",
        `<p class="name">${data2.name}</p>`
      );
      right.insertAdjacentHTML(
        "beforeend",
        `
          <table class="table">
          <thead>
           
          </thead>
          <tbody>
      
            <tr>
              <th scope="row">Type</th>
              <td>${arr}</td>
            </tr>
      
            <tr>
              <th scope="row">Attack</th>
              <td>${data2.stats[4].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">Defence</th>
              <td>${data2.stats[3].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">HP</th>
              <td>${data2.stats[5].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">SP Attack</th>
              <td>${data2.stats[2].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">SP Defense</th>
              <td>${data2.stats[1].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">Speed</th>
              <td>${data2.stats[0].base_stat}</td>
            </tr>
      
            <tr>
              <th scope="row">Weight</th>
              <td>${data2.weight}</td>
            </tr>
      
            <tr>
              <th scope="row">Total Moves</th>
              <td>${data2.moves.length}</td>
            </tr>
        
          </tbody>
        </table>
          
          `
      );
    }
    function render2() {
      if (right) {
        clearRightBlock();
        createRightBlock();
      } else {
        createRightBlock();
      }
    }

    function clearRightBlock() {
      right.remove();
    }
  } else {
    console.log("Try again");
  }
}
