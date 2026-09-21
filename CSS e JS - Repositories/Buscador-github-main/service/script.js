document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');

    if (!username) {
        alert('Por favor, insira um nome de usuário do GitHub.');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Usuário não encontrado');
            }
            return response.json();
        })
        .then(data => {
            profileDiv.innerHTML = `
                <img src="${data.avatar_url}" alt="GitHub profile avatar of ${data.name || username}">
                <h2>${data.name || 'Nome não disponível'}</h2>
                <p>${data.bio || 'Bio não disponível'}</p>
                <p class="repos">Repositórios Públicos: ${data.public_repos}</p>
            `;
            profileDiv.style.display = 'block';
        })
        .catch(error => {
            profileDiv.innerHTML = '<p>Usuário não encontrado. Por favor, tente novamente.</p>';
            profileDiv.style.display = 'block';
        });
});