// Modello utente semplice (no DB, solo oggetti in memoria)
function User(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // in chiaro: ok per esercizio universitario, NON usare in produzione
}

// Lista utenti hardcoded usata dall'app
const USERS = [
    new User(1, "Matteo", "matteo@test.it", "password1"),
    new User(2, "Luca",   "luca@test.it",   "password2"),
    new User(3, "Anna",   "anna@test.it",   "password3"),
];

export { User, USERS };
