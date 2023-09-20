import { useState } from 'react';

export function EmployeeForm() {
	const [employee, setEmployee] = useState({
		first_name: '',
		last_name: '',
		birthday: null
	});

	const handleSubmit = async e => {
		e.preventDefault();

		const firstName = e.target.elements['first-name'].value;
		const lastName = e.target.elements['last-name'].value;
		const birthday = e.target.elements['birthday'].value;

		const formattedBirthday = formatDate(birthday);
		const res = await fetch('/api/employees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				birthday: formattedBirthday
			})
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.status);
				}
				return res.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.error(err);
			});

		// const responseData = await res.json();

		// Handle and display the response data
		// console.log('Response data:', responseData);
	};

	const formatDate = inputDate => {
		const date = new Date(inputDate);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	return (
		<div className="w-full max-w-xs">
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<label htmlFor="first-name">First Name: </label>
				<input type="text" name="first-name" className="shadow border rounded py-2 px-3 text-gray-700" />

				<label htmlFor="last-name">Last Name: </label>
				<input type="text" name="last-name" className="shadow border rounded py-2 px-3 text-gray-700" />

				<label htmlFor="birthday">Birthday: </label>
				<input
					type="date"
					id="birthday"
					name="birthday"
					className="shadow border rounded py-2 px-3 text-gray-700"
				/>

				<button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
					Add Employee
				</button>
			</form>
		</div>
	);
}
