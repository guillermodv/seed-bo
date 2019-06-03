/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

export default class EmailService {
    static async validate(token) {
        return http.post(`${ENDPOINT}/public-api/email`, {token});
    }
}
