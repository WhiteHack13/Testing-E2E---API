const API_URL = 'https://api.demoblaze.com';
const generarUsuario = () => {
    const timestamp = Date.now();
    return {
        username: `qa_user_${timestamp}`,
        password: `Test1234`
    };
};
const signUp = (username, password) => {
    return cy.request({
        method: 'POST',
        url: `${API_URL}/signup`,
        failOnStatusCode: false,
        body: {
            username,
            password
        },
    });
};
const login = (username, password) => {
    return cy.request({
        method: 'POST',
        url: `${API_URL}/login`,
        failOnStatusCode: false,
        body: {
            username,
            password
        },
    });
};

describe('Demoblaze Auth API Tests', () => {
    it('Debe registrar un nuevo usuario', () => {
        const usuario = generarUsuario();
        signUp(usuario.username, usuario.password).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('Debe impedir registrar un usuario existente', () => {
        const usuario = generarUsuario();
        signUp(usuario.username, usuario.password).then((response) => {
            signUp(usuario.username, usuario.password).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.errorMessage).to.equal('This user already exist.');
            });
        });
    });

    it('Debe permitir login válido', () => {
        const usuario = generarUsuario();
        signUp(usuario.username, usuario.password).then((response) => {
            expect(response.status).to.equal(200);
            login(usuario.username, usuario.password).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.contain('Auth_token');
            });
        });
    });

    it('Debe rechazar login inválido', () => {
        const usuario = generarUsuario();
        signUp(usuario.username, usuario.password).then((response) => {
            login(usuario.username, 'PasswordIncorrecto').then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.errorMessage).to.eq('Wrong password.');
            });
        });
    });

    it('Debe rechazar login con usuario inexistente', () => {
        login('USUARIO_NO_EXISTE', 'Test1234').then((response) => {
            cy.log(JSON.stringify(response.body));
        });
    });

});