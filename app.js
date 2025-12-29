
const API_URL ="http://localhost:8080/PersonBackend/api/persons" ;

// 1. Charger la liste (GET)
async function fetchPersons() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const table = document.getElementById('personTable');
        table.innerHTML = data.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">Supprimer</button>
                </td>
            </tr>
        `).join('');
    } catch (e) { console.error("Erreur de chargement", e); }
}

// 2. Ajouter une personne (POST)
async function addPerson() {
    try {
        const nameInput = document.getElementById('personName');
        
        // Vérification si l'élément existe dans le HTML
        if (!nameInput) {
            console.error("L'élément avec l'id 'personName' est introuvable !");
            return;
        }

        if (!nameInput.value) {
            alert("Veuillez saisir un nom.");
            return;
        }

        console.log("Envoi de :", nameInput.value);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameInput.value })
        });

        if (response.ok) {
            nameInput.value = '';
            fetchPersons(); // Rafraîchir la liste après l'ajout
        } else {
            console.error("Erreur serveur :", response.status);
        }
    } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
    }
}

// 3. Supprimer une personne (DELETE)
async function deletePerson(id) {
    if (confirm("Voulez-vous vraiment supprimer cette personne ?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchPersons();
    }
}

// 4. Recherche (GET avec QueryParam)
async function searchPerson() {
    const query = document.getElementById('searchName').value;
    const response = await fetch(`${API_URL}/search?name=${query}`);
    const data = await response.json();
    // Même logique d'affichage que fetchPersons...
}

// Charger au démarrage
fetchPersons();