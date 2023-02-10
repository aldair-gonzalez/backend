const socket = io()

const formulario = document.querySelector('#formulario')
const btnForm = document.querySelector('#btnForm')
const cardsContainer = document.querySelector('#cardsContainer')

const formMessages = document.querySelector('#formMessages')
const messagesContainer = document.querySelector('#messagesContainer')


const url = 'http://localhost:8080/api/products'
const urlMessages = 'http://localhost:8080/api/messages'

if(formulario, btnForm, cardsContainer){
    const handleCreateCards = (array) => {
        let m = ''
        array.forEach(p => {
            m += `
                <div class="p-5 shadow-emerald-500 shadow-sm rounded-md flex flex-col gap-2">
                    <div>
                        <p class="text-gray-500 text-sm"> ${p.code} </p>
                        <h3 class="text-violet-500 text-xl font-bold uppercase"> ${p.title} </h3>
                    </div>
                    <div>
                        <p class="text-gray-500 lowercase"> ${p.description} </p>
                        <p class="text-emerald-500 text-xl text-end font-bold mt-2"> $${p.price} </p>
                    </div>
                    <form class="form__product--delete" action="" id="${p._id}">
                        <button class="bg-red-500 text-white py-2 px-4 font-bold text-sm rounded-md" type="submit">
                            Eliminar
                        </button>
                    </form>
                </div>
            `
        })
    
        cardsContainer.innerHTML = m
        handleDeleteProuct()
    }
    
    
    const handleDeleteProuct = () => {
        const formsDeleteProduct = document.querySelectorAll('.form__product--delete')
        formsDeleteProduct.forEach(form => {
            form.addEventListener('submit', async e => {
                e.preventDefault()
    
                await fetch(`${url}/${e.target.id}`, {
                    method: 'DELETE'
                }).then(response => {
                    if(response.ok === true) {
                        alert('Producto eliminado con éxito')
                    } else {
                        alert('Producto no encontrado')
                        console.log(response)
                    }
                })
            })
        })
    }
    
    
    const handleHidden = (button, element) => {
        button.addEventListener('click', () => {
            element.classList.toggle('hidden')
        });
    };
    
    formulario.addEventListener('submit', async e => {
        e.preventDefault()
    
        let product = {
            title: formulario.title.value,
            description: formulario.description.value,
            code: formulario.code.value,
            price: formulario.price.value,
            status: formulario.status.checked,
            stock: formulario.stock.value,
            category: formulario.category.value
        }
    
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if(response.status === 201) {
                formulario.reset()
                form.classList.add('hidden')
                alert('Producto creado con éxito')
            } else if (response.status == 203){
                alert('Ya existe un producto con ese código')
                console.warn(response)
            } else {
                alert('Todos los campos son requeridos')
                console.error(response)
            }
        })
    })

    
    socket.on('get-products', async data => {
        await fetch(url)
        .then(data => data.json())
        .then(data => {
            handleCreateCards(data.data)
        })
    })

    handleHidden(btnForm, form);
    handleHidden(btnCloseForm, form);
}


if(formMessages, messagesContainer){
    let user;
    Swal.fire({
        title:"Registrate:",
        input:"text",
        text:" Ingresa tu email:",
        inputValidator: (value) => {
            return !value && 'Necesitas un email para usar el chat'
        },
        allowOutsideClick:false
    }).then (result =>{
        user=result.value
    })

    const createMessages = (array) => {
        let m = ''
        array.forEach(p => {
            m += `
                <div class="w-full text-sm flex items-start justify-start gap-1">
                    <h3 class="text-orange-500 font-bold">
                        ${p.user}:
                    </h3>
                    <p class="text-gray-700 font-medium">
                        ${p.message}
                    </p>
                </div>
            `
        })
    
        messagesContainer.innerHTML = m
    }

    formMessages.addEventListener('submit', async e => {
        e.preventDefault()

        let message = {
            user: user,
            message: formMessages.message.value
        }

        await fetch(urlMessages, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }).then(response => {
            formMessages.reset()
        })
        
    })

    socket.on('get-messages', async data => {
        await fetch(urlMessages)
        .then(data => data.json())
        .then(data => {
            createMessages(data.data)
        })
    })
}
