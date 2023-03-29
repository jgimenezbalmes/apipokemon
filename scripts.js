window.onload = function() {
    document.getElementById("flexSwitchCheckDefault").checked = false;
}


function buscapokes(){
    let valor = document.getElementById("poketext").value;
    codiGerard(valor);
}

function codiGerard(cosa) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange =  function () {
    if (xhr.readyState === xhr.DONE) {
        
        let resposta = xhr.responseText;
        let obj = JSON.parse(resposta);
        passaObjecte(obj);
        
    }
    }
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/"+cosa);
    xhr.send(null);
}

function passaObjecte(obj){
    if (obj.id > 493){
        alert("Ho sento! Només es poden buscar Pokémon de fins a 4a generació!")
        return;
    }
    
    document.getElementById("imatge").src = obj.sprites.other["official-artwork"].front_default;
    document.getElementById("flexSwitchCheckDefault").addEventListener("change", simple.bind(this,obj) );
    document.getElementById("numero").innerText = obj.id;
    document.getElementById("nom").innerText = majuscula(obj.name);
    document.getElementById("tipus1").innerText = majuscula(obj.types[0].type.name);
    if(obj.types.length>1){
        document.getElementById("tipus2").innerText = majuscula(obj.types[1].type.name);
    }
    else{
        document.getElementById("tipus2").innerText = " - ";
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${obj.name}`)
    .then(response => response.json())
    .then(data => {
      fetch(data.species.url)
        .then(response => response.json())
        .then(data => {
          let descripcio = data.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
          document.getElementById("descripcio").innerText = descripcio;
        });
    });
    document.getElementById("alçada").innerText = (obj.height/10)+ " m";
    document.getElementById("pes").innerText = obj.weight /10+ " kg";

    document.getElementById("hp").innerText = obj.stats[0].base_stat;
    document.getElementById("atk").innerText = obj.stats[1].base_stat;
    document.getElementById("def").innerText = obj.stats[2].base_stat;
    document.getElementById("atkesp").innerText = obj.stats[3].base_stat;
    document.getElementById("defesp").innerText = obj.stats[4].base_stat;
    document.getElementById("vel").innerText = obj.stats[5].base_stat;

    document.getElementById("front").src = obj.sprites.versions["generation-iv"].platinum.front_default;
    document.getElementById("back").src = obj.sprites.versions["generation-iv"].platinum.back_default;
    document.getElementById("frontShiny").src = obj.sprites.versions["generation-iv"].platinum.front_shiny;
    document.getElementById("backShiny").src = obj.sprites.versions["generation-iv"].platinum.back_shiny;
}

function majuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function simple(obj){
   if( this.event.currentTarget.checked){
    document.getElementById("imatge").src = obj.sprites.other["official-artwork"].front_shiny
   }
   else{
    document.getElementById("imatge").src = obj.sprites.other["official-artwork"].front_default;
   }
    
}