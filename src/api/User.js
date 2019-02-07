class User {
    static get(email) {
        return this.users[email];
    }

    static save(user) {
        this.users[user.email] = user;
        this.sync();
    }

    static exists(email) {
        return email in this.users;
    }

    static sync() {
        window.localStorage.setItem('users', JSON.stringify(this.users));
    }

    static load() {
        try {
            this.users = JSON.parse(window.localStorage.getItem('users')) || {};
        } catch(e) {
            console.error(e);
            this.users = {};
        }
    }
}

export default User;