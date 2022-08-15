import React from 'react'
import { useState, useEffect } from "react";
import dealerService from '../../services/dealerService';
import authService from '../../services/authService';
import { ErrorMessage } from '../../shared/constants';

const Dealer = () => {
	const initialValueObj = { name: "" };
	const [formValues, setFormValues] = useState(initialValueObj);
	const [formErrors, setFormErrors] = useState({});
	const [accessToken, setAccessToken] = useState("");
	const [dealers, setDealers] = useState([]);

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let errors = validate(formValues);
		setFormErrors(errors);
		if (!errors.name) {
			dealerService.getDealers(accessToken, formValues.name)
				.then((res) => {
					if (res.data.success) {
						setDealers(res.data.data);
					}
				})
		}
	};

	const validate = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = ErrorMessage;
		} else {
			errors.name = "";
		}
		return errors;
	};

	useEffect(() => {
		authService.getToken()
			.then((res) => {
				if (res.data.success) {
					setAccessToken(res.data.data);
				}
			})
	}, [])

	return (
		<>
			<header>
				<section>
					<div className="container">
						<div className="head">
							<form onSubmit={handleSubmit} >
								<div className="dealer-name">
									<label>Dealer</label>
									<input type="search"
										placeholder="Name"
										name="name"
										value={formValues.name}
										onChange={handleChange}
									/>
									<button type="button" className="find-btn" id="submitButton" onClick={handleSubmit}>Search</button>
								</div>
								<p style={{ color: "red", marginTop: "0px", marginLeft: "60px" }}>{formErrors.name}</p>
							</form>
						</div>
					</div>
				</section>
			</header>
			<main>
				<section>
					<div className="container">
						<div className="main-deal">
							<div className="main-heading"><h3>Dealer Details</h3></div>
							<table className="table">
								<thead className="thead-light">
									<tr>
										<th scope="col">#</th>
										<th scope="col">ID</th>
										<th scope="col">Dealer Name</th>
									</tr>
								</thead>
								<tbody>
									{
										dealers.length > 0 ?
											dealers.map((data, index) =>
												<tr key={index}>
													<th scope="row">{index}</th>
													<td>{data.id}</td>
													<td>{data.name}</td>

												</tr>
											)
											:
											<tr>
												<td colSpan={3}>No Data Found</td>
											</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</main>
			<footer>
			</footer>
		</>
	)
}

export default Dealer