const APIURL = 'https://api.github.com/users/'
// console.log('https://api.github.com/users/navidev0');

const main = document.getElementById('main');
const form = document.getElementById('form');
const seach = document.getElementById('buscador');

async function getUser(username) {
 try {
  const { dato } = await axios(APIURL + username); 
  
  crearCardUsuario(dato);
  getRepos(username)
 } catch (error) {
   if (error.response.status == 404) {
    crearErrorCard('No se encontro perfil con este nombre de usuario');
   }
 } 
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created');

    agregarReposAlCard(data);
  } catch (error) {
   crearErrorCard('Probelmas con la obtecion de los repos') 
  }
}

function crearCardUsuario(user) {
  const cardHTML= `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
       <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
      </div>
    </div>
  `
  main.innerHTML = cardHTML;
}



