const socket = io()

const url = 'http://localhost:8080/api/products'


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
        console.log(response)
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