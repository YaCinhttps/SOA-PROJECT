const API_URL = "http://localhost:8080/PersonBackend/api/persons";

/* =======================
   1. CHARGER LA LISTE
======================= */
async function fetchPersons() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const table = document.getElementById("personTable");
        table.innerHTML = data.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${p.id})">
                        Modifier
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">
                        Supprimer
                    </button>
                </td>
            </tr>
        `).join("");

    } catch (e) {
        console.error("Erreur de chargement", e);
    }
}

/* =======================
   2. MODAL AJOUT
======================= */
function openAddModal() {
    document.getElementById("addPersonName").value = "";
    const modal = new bootstrap.Modal(document.getElementById("addPersonModal"));
    modal.show();
}

async function saveAddPerson() {
    const name = document.getElementById("addPersonName").value.trim();
    if (!name) return alert("Le nom est obligatoire !");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        if (response.ok) {
            fetchPersons();
            bootstrap.Modal.getInstance(document.getElementById("addPersonModal")).hide();
        } else alert("Erreur lors de l'ajout");
    } catch (e) {
        console.error(e);
    }
}

/* =======================
   3. MODAL MODIFIER
======================= */
async function openEditModal(id) {
    console.log("Clicked edit for id:", id);
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const person = await res.json();

        document.getElementById("editPersonId").value = person.id;
        document.getElementById("editPersonName").value = person.name;

        const modalEl = document.getElementById("editPersonModal");
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();

    } catch (e) {
        console.error(e);
    }
}

async function saveEditPerson() {
    const id = document.getElementById("editPersonId").value;
    const name = document.getElementById("editPersonName").value.trim();
    if (!name) return alert("Le nom est obligatoire !");

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        if (response.ok) {
            fetchPersons();
            bootstrap.Modal.getInstance(document.getElementById("editPersonModal")).hide();
        } else alert("Erreur lors de la modification");
    } catch (e) {
        console.error(e);
    }
}

/* =======================
   4. SUPPRESSION
======================= */
async function deletePerson(id) {
    if (!confirm("Voulez-vous vraiment supprimer cette personne ?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchPersons();
    } catch (e) {
        console.error(e);
    }
}

/* =======================
   5. RECHERCHE
======================= */
async function searchPerson() {
    const query = document.getElementById("searchName").value.trim();

    if (!query) {
        fetchPersons();
        return;
    }

    let url = API_URL;

    if (!isNaN(query)) {
        url = `${API_URL}/${query}`;
    } else {
        url = `${API_URL}/search?name=${query}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const persons = Array.isArray(data) ? data : [data];

        const table = document.getElementById("personTable");
        table.innerHTML = persons.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${p.id})">
                        Modifier
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">
                        Supprimer
                    </button>
                </td>
            </tr>
        `).join("");

    } catch (e) {
        console.error("Aucun résultat trouvé", e);
    }
}

/* =======================
   6. DÉMARRAGE
======================= */
fetchPersons();
