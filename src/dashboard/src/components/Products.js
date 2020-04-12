import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
// Component
import Spinner from './Spinner';
// Data
//import categories from '../data/categories';

const Products = () => {

	const [products, setProducts] = useState([]);

    const reqAPI = async () => {
        try {
			const reqProds = await axios.get('/api/products');
            setProducts(reqProds.data.products);
        } catch (error) {
            console.log(error);
        }
	};
	
    useEffect( () => {
        reqAPI();
	}, []);
	
	if (!products.length) return <Spinner />

	return (
		<div className="col-lg-6 mb-4">
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">List of products</h6>
				</div>
				<div className="card-body">
					<div className="row">
                        <ul>
						{products.map( item => (
                            <li
                            key={item.id}
                            >
                                {item.name}
                            </li>
                           
                        ))}
                        </ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Products;