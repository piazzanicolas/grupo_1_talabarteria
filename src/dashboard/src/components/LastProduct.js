import React, {Fragment, useEffect, useState} from 'react';
import axios from '.././config/axios';

import Spinner from './Spinner';

const LastProduct = () => {

	const [lastProduct, setLastProduct] = useState({});
	const [toggle, setToggle] = useState(false);

    const reqAPI = async () => {
        try {
			const reqLastProduct = await axios.get('/api/products/last');
            setLastProduct(reqLastProduct.data);
        } catch (error) {
            console.log(error);
        }
	};
	
    useEffect( () => {
        reqAPI();
	}, []);

	const toggleChecked = () => setToggle(toggle => !toggle);
	
	if (!lastProduct) return <Spinner />

	return (
		<div className="col-lg-6 mb-4" >
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
				</div>
				<div className="card-body">
					<div className="text-center">
						<img 
						className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
						style={{ maxWidth: "200px" }} 
						src={`http://localhost:3000/api/images/${lastProduct.image}`}
						alt={lastProduct.name} />
					</div>
					<p>{lastProduct.description}</p>
					<button className="btn">
						<i className={toggle ? 'far fa-eye-slash' : 'far fa-eye'} onClick={toggleChecked} />
					</button>
					{toggle && 
					<Fragment>
						<p>Precio: ${lastProduct.price}</p>
						<p>Categoría: {lastProduct.category.name}</p>
						<p>Marca: {lastProduct.brand.name}</p>
						<p>Colores:</p>
						<ul>
							{lastProduct.colors.map( color => (
							<li
							key={color.id}
							>
							{color.name}
							</li>
							))}
						</ul>
					</Fragment>
					}
				</div>
			</div>
		</div>
	)
}

export default LastProduct;