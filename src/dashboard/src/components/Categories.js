import React from 'react';
// Component
import Category from './Category';
// Data
import categories from '../data/categories';

const Categories = () => {
	return (
		<div className="col-lg-6 mb-4">
			<div className="card shadow mb-4">
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
				</div>
				<div className="card-body">
					<div className="row">
						{categories.map(oneCategory => <Category name={oneCategory} />)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Categories;