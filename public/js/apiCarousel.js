let selectCarousel = document.querySelector('[name=carousel]');
let containerCarousel = selectCarousel.parentElement;

const apiCall = (endpoint, callback) => {
	fetch(endpoint)
		.then(response => response.json())
		.then(data => callback(data))
		.catch(error => {
			throw new Error(error)
		})
}

const setProducts = function (data) {
    // Por como viene la API tengo que separar los productos
    let onlyProducts = data.products;
    // Genero un array con los items del carousel
    let items = Array.from(selectCarousel.children)

	if (onlyProducts.length >= 3) {
        // Elimino el resto de los productos del array
        while (onlyProducts.length > 3) {
            onlyProducts.shift();
        }
        // Invierto el array para que el producto más nuevo esté primero
        onlyProducts.reverse();
        // Asigno a cada item del carousel un producto
        for (let i=0;i!=3;i++){
            items[i].innerHTML = "<h2>¡Novedades!</h2>";
            items[i].innerHTML += `<img src="/images/${onlyProducts[i].image}" class="align-self-center" width="100" alt="${onlyProducts[i].name}"/>`;
            items[i].innerHTML += `<em class="d-block">${onlyProducts[i].name}</em>`;
        }

	} else {
        //No muestro el carousel si tengo menos de 3 productos
		containerCarousel.classList.add('d-none');
	}
}

apiCall('http://localhost:3000/api/products/', setProducts);