import React from 'react';

let Category = (props) => {
	return (
		<div className="col-lg-6 mb-4">
			<div className="card bg-info text-white shadow">
				<div className="card-body"> {props.name} </div>
			</div>
		</div>
	)
}

export default Category;