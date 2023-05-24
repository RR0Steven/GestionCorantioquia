function login(e) {
    e.preventDefault();
    let inputUsername = document.getElementById("usuario").value;
    let inputPass = document.getElementById("pass").value;
    fetch('http://89.116.25.43:3000/api/login', {
        method: 'Post',
        body: JSON.stringify({
            usuario: inputUsername,
            password: inputPass
        }),
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.status != 200) {
                throw new Error(`Error!', ${alert(data.message)}`)
            }
            console.log(data);
            sessionStorage.setItem("token", data["jwt"])
            sessionStorage.setItem("user", JSON.stringify(data.user))
        })

        .then(redirect => location.href = './dashboard.html')
    localStorage.setItem("isLoggedIn", "true");
}

function logout() {
    sessionStorage.clear
    location.href = './index.html'
    localStorage.removeItem("isLoggedIn");
}

function listar() {
    fetch('http://89.116.25.43:3000/api/usuarios/listar')
        .then(res => res.json())
        .then(res => {
            layout = document.querySelector('#listar')

            var theRows = "";
            res.usuarios.map(r => {
                theRows += `<tr>
              <td>${r._id}</td>
              <td>${r.identificacion}</td>
              <td>${r.nombres}</td>
              <td>${r.apellidos}</td>
              <td>${r.telefono}</td>
              <td>${r.direccion}</td>
              <td>${r.email}</td>
              <td>${r.usuario}</td>
              </tr>`
            })
            layout.innerHTML = theRows;
        })
}

listar();



//------------------------------------------------------------------------
function registrar(e) {
    e.preventDefault();
    let identificacion = document.getElementById("identificacion").value;
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let direccion = document.getElementById("direccion").value;
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    fetch(`http://89.116.25.43:3000/api/usuarios/registrar`, {
        method: 'POST',
        body: JSON.stringify({
            identificacion: identificacion,
            nombres: nombres,
            apellidos: apellidos,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        debugger
            if (data.status != 200) {
                throw new Error(`Error!', ${data.message}`)
            }
            let modal = document.getElementById("close")
            modal.onclick()
            listar()
        })
}

function updapte(e, id) {
    e.preventDefault();
    let identificacion = document.getElementById("identificacion").value;
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let direccion = document.getElementById("direccion").value;
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    fetch(`http://89.116.25.43:3000/api/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            identificacion: identificacion,
            nombres: nombres,
            apellidos: apellidos,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password,
            id: id
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        debugger
        if (data.status != 200) {
            throw new Error(`Error!', ${data.message}`)
        }
        let modal = document.getElementById("close")
        modal.onclick()
        listar()
    })
}

function deleteuser(id) {
    fetch(`http://89.116.25.43:3000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        debugger
        if (data.status != 200) {
            throw new Error(`Error!', ${data.message}`)
        }
        listar()
    })
}