import React from 'react';
// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Metric from './components/Metric';
import LastProduct from './components/LastProduct';
import Categories from './components/Categories';
// Data
import data from './data/data';


function App () {
	return (
		<div id="wrapper">
			{/* Componente Sidebar */}
			<Sidebar/>			
			
			<div id="content-wrapper" className="d-flex flex-column">

				<div id="content">
					{/* Componente Navbar */}
					<Navbar/>
					
					<div className="container-fluid">

						<div className="d-sm-flex align-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
						</div>
						
						<div className="row">
							{/* Componente Metric */}
							{
								data.map((unDato, i) => {
									return (
										<Metric
											key={i}
											title={unDato.title}
											value={unDato.value}
											icon={unDato.icon}
											border={unDato.border}
										/>
									)
								})
							}
						</div>
						
						<div className="row">
							{/* Último Producto */}
							<LastProduct/>

							{/* Categorías */}
							<Categories/>
						</div>
					</div>
				</div>
				
				<footer className="sticky-footer bg-white">
					<div className="container my-auto">
						<div className="copyright text-center my-auto">
							<span>Copyright &copy; Dashboard 2020</span>
						</div>
					</div>
				</footer>
				
			</div>
		</div>
	);
}

export default App;
