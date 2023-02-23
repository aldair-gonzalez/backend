const $ = (item) => document.querySelector(`${item}`);

const form = $('#form-signup');

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        user_name: form.user_name.value,
        email: form.email.value,
        password: form.password.value,
        age: form.age.value,
    }

    fetch('http://localhost:8080/api/session/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(data => {
        if(data.ok == true && data.status == 201) {
            alert('Usuario creado con exito, inicia sesion')
            form.reset()
            window.location = '/'
        } else {
            alert('Todos los campos son requeridos')
        }
    });
})