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
function showNoResults() {
    const table = document.getElementById("personTable");
    table.innerHTML = `
        <tr>
            <td colspan="3" class="text-center text-muted py-4">
                 Aucun Resultat
            </td>
        </tr>
    `;
}



function renderPersons(persons) {
    const table = document.getElementById("personTable");

    if (!persons.length) {
        showNoResults();
        return;
    }

    table.innerHTML = persons.map(p => `
        <tr class="animate-row">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2"
                        onclick="openEditModal(${p.id})">
                    Modifier
                </button>
                <button class="btn btn-danger btn-sm"
                        onclick="deletePerson(${p.id})">
                    Supprimer
                </button>
            </td>
        </tr>
    `).join("");
}

async function searchPerson() {
    const query = document.getElementById("searchName").value.trim();

    // If input empty → fetch all
    if (!query) {
        fetchPersons();
        return;
    }

    let url;

    // Numeric input → search by ID
    if (/^\d+$/.test(query)) {
        url = `${API_URL}/${query}`;
    } 
    // Text input → search by name
    else {
        url = `${API_URL}/search?name=${encodeURIComponent(query)}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("No results");
        }

        const data = await response.json();
        const persons = Array.isArray(data) ? data : [data];

        renderPersons(persons);

    } catch (error) {
        showNoResults();
    }
}


/* =======================
   6. DÉMARRAGE
======================= */
fetchPersons();
