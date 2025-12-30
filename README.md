===========================================================
PROJET : SYSTEME DE GESTION DE PERSONNES (JEE & REST API)
DATE DE RENDU : 30 DECEMBRE 2025
===========================================================

1. DESCRIPTION DU PROJET
-------------------------
Ce projet est une application web complète (Full-Stack) permettant de 
gérer une liste de personnes. Il démontre une architecture découplée 
comprenant un Backend REST en Java et un Frontend Moderne en Bootstrap.

2. FONCTIONNALITES
------------------
- CRUD complet : Ajouter, Afficher et Supprimer des personnes.
- Recherche : Filtrer les personnes par nom .
- API RESTful : Développée avec JAX-RS (Jersey) retournant du JSON.
- Interface Responsive : Utilisation de Bootstrap 5 et JavaScript (Fetch API).
- Persistance : Base de données MySQL gérée via JDBC (Pattern DAO).

3. STACK TECHNIQUE
------------------
- BACKEND : Java 8 (JRE 1.8), JAX-RS (Jersey), Maven.
- DATABASE : MySQL 8.0.
- SERVEUR : Apache Tomcat 9.0.
- FRONTEND : VS Code, HTML5, CSS3, Bootstrap 5, JavaScript.

4. CONFIGURATION REQUISE
------------------------
- Java JRE 1.8 installé.
- Apache Tomcat 9.0 configuré dans Eclipse.
- Serveur MySQL (XAMPP ou autre) lancé sur le port 3306.
- Pilote JDBC (mysql-connector-java.jar) présent dans WEB-INF/lib.

5. INSTALLATION ET LANCEMENT
----------------------------

A. BASE DE DONNEES (MySQL)
Exécutez le script suivant :
   CREATE DATABASE persondb;
   USE persondb;
   CREATE TABLE persons (
       id INT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(100) NOT NULL
   );

B. BACKEND (Eclipse)
1. Importer le projet dans Eclipse (Existing Maven Project).
2. Vérifier les accès (User/Password) dans DBconnection.java.
3. Faire un "Clean" sur Tomcat et lancer le projet (Run on Server).
4. URL de base : http://localhost:8080/PersonBackend/api/persons

C. FRONTEND (VS Code)
1. Ouvrir le dossier 'frontend' dans VS Code.
2. Vérifier que la constante API_URL dans app.js pointe vers votre serveur.
3. Clic droit sur index.html > "Open with Live Server".

6. ENDPOINTS DE L'API REST
--------------------------
- GET    /api/persons            : Récupérer la liste complète.
- POST   /api/persons            : Ajouter une personne (Corps JSON).
- DELETE /api/persons/{id}       : Supprimer par ID.
- GET    /api/persons/search?name= : Rechercher par nom  &  Id .

7. VIDEO DE DEMONSTRATION
-------------------------
[LIEN VERS LA VIDEO ICI : YouTube ou Google Drive]
La vidéo présente : Connexion DB, Test de l'API, et flux CRUD complet.

8. AUTEURS
---------
HARBAOUI YASSINE GROUPE 4 - MOHAMED AMINE NOUMA GROUPE 3
===========================================================
