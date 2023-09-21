import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export function EmployeeForm() {
	const [employee, setEmployee] = useState({
		first_name: '',
		last_name: '',
		birthday: null
	});

	const router = useRouter();

	const handleSubmit = async e => {
		e.preventDefault();

		if (!validateBirthday()) {
			toast.error('ERROR: Please enter a valid birthday');
			return;
		}
		const formattedBirthday = formatDate(employee.birthday);

		if (router.query.id) {
			console.log('updating...');

			await fetch('/api/employees/' + router.query.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...employee,
					birthday: formattedBirthday
				})
			})
				.then(res => {
					if (!res.ok) {
						throw Error(res.status);
					} else {
						toast.success('Employee modified successfully');
					}
				})
				.catch(err => {
					console.error(err);
				});
		} else {
			// const firstName = e.target.elements['first-name'].value;
			// const lastName = e.target.elements['last-name'].value;
			// const birthday = e.target.elements['birthday'].value;
			const res = await fetch('/api/employees', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...employee,
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
					toast.success('Employee added successfully');
				})
				.catch(err => {
					console.error(err);
				});
		}

		router.push('/');

		// const responseData = await res.json();

		// Handle and display the response data
		// console.log('Response data:', responseData);
	};

	useEffect(() => {
		const getEmployee = async () => {
			await fetch('/api/employees/' + router.query.id)
				.then(res => {
					if (!res.ok) {
						throw Error(res.status);
					}
					return res.json();
				})
				.then(data => {
					const formattedBirthday = formatDate(data.birthday);
					setEmployee({ ...data, birthday: formattedBirthday });
				})
				.catch(err => {
					console.error(err);
				});
		};

		if (router.query?.id) {
			getEmployee(router.query.id);
		}
	}, [router.query.id]);

	const validateBirthday = () => {
		const birthdate = new Date(employee.birthday);
		const current = new Date();

		if (birthdate > current) {
			return false;
		} else {
			return true;
		}
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
				<input
					type="text"
					name="first-name"
					value={employee.first_name}
					onChange={e => setEmployee({ ...employee, first_name: e.target.value })}
					className="shadow border rounded py-2 px-3 text-gray-700"
				/>

				<label htmlFor="last-name">Last Name: </label>
				<input
					type="text"
					name="last-name"
					value={employee.last_name}
					onChange={e => setEmployee({ ...employee, last_name: e.target.value })}
					className="shadow border rounded py-2 px-3 text-gray-700"
				/>

				<label htmlFor="birthday">Birthday: </label>
				<input
					type="date"
					id="birthday"
					name="birthday"
					value={employee.birthday || ''}
					onChange={e => setEmployee({ ...employee, birthday: e.target.value })}
					className="shadow border rounded py-2 px-3 text-gray-700"
				/>

				<button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
					{router.query.id ? 'Update Details' : 'Add Employee'}
				</button>
			</form>
		</div>
	);
}
