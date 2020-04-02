window.onload = function () {
	// Capturamos el formulario
	let form = document.querySelector('#validateForm');
	// Del formulario traemos todos los campos en formato Array
	let formInputs = Array.from(form.elements);
	// Sacamos al botón del array de campos
	//console.log(formInputs)
	formInputs.pop();

	// Creamos un array donde voy a guardar si hay error en un campo
	let errores = {};

	// Vamos a validar los campos con el evento blur
	formInputs.forEach(function (oneInput) {
		// A cada campo le asignamos el evento blur
		oneInput.addEventListener('blur', function () {
			// Capturo el valor del campo
			let inputValue = this.value.trim();
			// Si el campo está vacío
			if (validator.isEmpty(inputValue, { ignore_whitespace: true })) {
				// Aplicamos la clase de error "is-invalid"
				this.classList.add('is-invalid');
				// Capturamos al <p> que acompaña al campo y Le inyectamos el texto al párrafo
				this.nextElementSibling.innerHTML = `El campo ${this.dataset.name} es obligatorio`;
				// Inserto un FLAG dentro del objeto de errores segun el campo
				errores[this.name] = true;

				//console.log(errores);
			} else {
				// Sacamos la clase de error "is-invalid"
				this.classList.remove('is-invalid');
				// Agremamos la clase de error "is-valid"
				this.classList.add('is-valid');
				// Capturamos al <p> que acompaña al campo y le borramos el texto al párrafo
				this.nextElementSibling.innerHTML = ``;
				// Eliminamos el FLAG dentro del objeto de errores segun el campo
				delete errores[this.name];

				console.log(errores);
			}
		});

		if (oneInput.name == "email") {
			oneInput.addEventListener('blur', function () {
				let inputValue = oneInput.value.trim();
				if (!validator.isEmail(inputValue)) {
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = `El campo ${this.dataset.name} tiene que ser un Email`;
					errores[this.name] = true;
				}

				fetch(`http://localhost:3000/api/users/email/${inputValue}`)
					.then(response => response.json())
					.then(info => {
						if(info.userFound === true){
							this.classList.add('is-invalid');
							this.classList.remove('is-valid');
							this.nextElementSibling.innerHTML = `El email ${inputValue} ya se encuentra registrado`;
							errores[this.name] = true;
						}
					})
					.catch(error => console.log(error))
			})
		}

		if (oneInput.name == "re_password") {
			let password = document.querySelector("#password")
			oneInput.addEventListener('blur', function () {
				let inputValue = oneInput.value;
				if (inputValue != password.value) {
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = `La contraseña debe ser igual en ambos campos`;
					errores[this.name] = true;
				}
			})
			oneInput.addEventListener('change', function () {
				let inputValue = oneInput.value.trim();
				if (inputValue == password.value) {
					this.classList.remove('is-invalid');
					this.classList.add('is-valid');
					errores[this.name] = true;
				}
			})
		}

		if (oneInput.name == "firstName") {
			oneInput.addEventListener('blur', function () {
				let inputValue = oneInput.value.trim();
				if (!validator.isLength(inputValue, {min:2})) {
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = `El apellido debe tener al menos 2 caracteres`;
					errores[this.name] = true;
				}
			})
		}

		if (oneInput.name == "lastName") {
			oneInput.addEventListener('blur', function () {
				let inputValue = oneInput.value.trim();
				if (!validator.isLength(inputValue, {min:2})) {
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = `El apellido debe tener al menos 2 caracteres`;
					errores[this.name] = true;
				}
			})
		}

		if (oneInput.name == "password") {
			oneInput.addEventListener('blur', function () {
				let inputValue = oneInput.value.trim();
				let passwordRegex1 = /^.{8,}$/
				let passwordRegex2 = /(?=.*[A-Z])/
				let passwordRegex3 = /(?=.*[a-z])/
				let passwordRegex4 = /(?=.*[!@#$%^&*?])/
				let passwordRegex5 =/(?=.*\d)/
				if (!inputValue.match(passwordRegex1)){
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres';
					errores[this.name] = true;
				} else if (!inputValue.match(passwordRegex2)){
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = 'La contraseña debe tener una mayúscula';
					errores[this.name] = true;
				} else if (!inputValue.match(passwordRegex3)){
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = 'La contraseña debe tener una minúscula';
					errores[this.name] = true;
				} else if (!inputValue.match(passwordRegex4)){
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = 'La contraseña debe tener un caracter especial !@#$%^&*?';
					errores[this.name] = true;
				} else if (!inputValue.match(passwordRegex5)){
					this.classList.add('is-invalid');
					this.nextElementSibling.innerHTML = 'La contraseña debe tener un número';
					errores[this.name] = true;
				} 
			})
		}

		if (oneInput.name == "avatar") {
			oneInput.addEventListener('blur', function () {
				let acceptedExtensions = ['jpg', 'jpeg', 'png'];
				let fileExtension = this.value.split('.').pop();
				if (!acceptedExtensions.includes(fileExtension)) {
					this.classList.add('is-invalid');
					this.classList.remove('is-valid');
					this.nextElementSibling.innerHTML = 'No es un formato de imagen válido';
					errores[this.name] = true;
				} else {
					this.classList.remove('is-invalid');
					this.classList.add('is-valid');
					this.nextElementSibling.innerHTML = '';
					delete errores[this.name];
				}
			})
		}

	});
	
	// Validamos al enviar el formulario
	form.addEventListener('submit', function(e) {

		// Iteramos sobre cada campo para ver si está vacío
		formInputs.forEach(function (oneInput) {
			// Capturo el valor del campo
			let inputValue = oneInput.value;
			// Si el campo está vacío
			if (validator.isEmpty(inputValue, { ignore_whitespace: true })) {
				// Aplicamos la clase de error "is-invalid"
				oneInput.classList.add('is-invalid');
				// Capturamos al <p> que acompaña al campo y Le inyectamos el texto al párrafo
				oneInput.nextElementSibling.innerHTML = `El campo ${oneInput.dataset.name} es obligatorio`;
				// Inserto un FLAG dentro del objeto de errores segun el campo
				errores[oneInput.name] = true;
			} 
		});

		// Si el objeto de errores tiene contenido
		if (Object.keys(errores).length > 0) {
			//console.log(errores);
			e.preventDefault();	
			alert("Debe completar todos los campos")
		}
 		
	})
}