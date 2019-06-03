/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {map} from 'lodash';

import {User} from '../model';

const API = `${ENDPOINT}api/users/`;

export default class UserService {
    static async fetch(state, rol, term, skip) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        if (rol) {
            searchParams.set('rol', rol);
        }
        if (term) {
            searchParams.set('term', term);
        }
        if (skip) {
            searchParams.set('skip', skip);
        }
        const {
            users, usersCount, pageSize, states
        } = await http.get(`${API}?${searchParams.toString()}`);
        return {
            users: map(users, user => new User(user)),
            usersCount,
            pageSize,
            states
        };
    }

    static async find(id) {
        const user = await http.get(`${API}find?id=${id}`);
        return new User(user);
    }

    static async findById(id) {
        const user = await http.get(`${API}findById?id=${id}`);
        return new User(user);
    }

    static async search() {
        const {users} = await http.get(`${API}find`);
        return users;
    }

    static async profile() {
        const user = await http.get(`${API}profile`);
        return new User(user);
    }

    static async save(users) {
        return http.post(API, users);
    }

    static fetchByArea(area) {
        return http.get(`${API}area/${area}/users`);
    }
}
