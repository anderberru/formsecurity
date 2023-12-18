const request = require('supertest');
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`

describe('Erabiltzailearen informazioa egiaztatu', () => {
    it("POST /register", async () => {
        const response = await request(url)
            .post('/register')
            .send({
                // Erabiltzailearen datuak, luzera nahikoa ez bada
                 username: 'testuser' 
            });

        expect(response.status).toBe(400); // Bad Request (errorea)
    });

    it("POST /register", async () => {
        const response = await request(url)
            .post('/register')
            .send({
                // Erabiltzailearen datuak, berdinak ez direnean
                username: 'testuser', password: 'password1', confirm_password: 'password2' 
            });

        expect(response.status).toBe(400); // Bad Request (errorea)
    });

    it("POST /register", async () => {
        const response = await request(url)
            .post('/register')
            .send({
                // Erabiltzailearen datuak, pasahitzak karaktere okerrak dituztenean
                username: 'testuser', password: '12345678'
            });

        expect(response.status).toBe(400); // Bad Request (errorea)
    });

    it("POST /register", async () => {
        const response = await request(url)
            .post('/register')
            .send({
                // Erabiltzailearen datuak, emailak baldintzak betetzen ez dituenean
                username: 'testuser', password: 'password123', email: 'testuser@example'
            });

        expect(response.status).toBe(400); // Bad Request (errorea)
    });

    it("POST /register", async () => {
        const response = await request(url)
            .post('/register')
            .send({
                // Erabiltzailearen datuak, baldintzak betetzen dituztenean
                username: 'testuser', password: 'password123', confirm_password: 'password123' , email: 'testuser@example.com' 
            });

        expect(response.status).toBe(200); // OK
        expect(response.body).toEqual(expect.any(Object)); // JSON bat bueltatu behar da
    });
});