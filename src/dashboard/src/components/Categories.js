import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
// Component
import Category from './Category';
import Spinner from './Spinner';
// Data
//import categories from '../data/categories';

const Categories = () => {

	const [categories, setCategories] = useState([]);

    const reqAPI = async () => {
        try {
			const reqCats = await axios.get('/api/categories');
            setCategories(reqCats.data);
        } catch (error) {
            console.log(error);
        }
	};
	
    useEffect( () => {
        reqAPI();
	}, []);
	
	if (!categories.length) return <Spinner />

	return (
		<div className="col-lg-6 mb-4">
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
				</div>
				<div className="card-body">
					<div className="row">
						{categories.map( item => (
						<Category
						 key={item.id}
						 name={item.name}
						 qty={item.qty}
						/>
						 ))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Categories;