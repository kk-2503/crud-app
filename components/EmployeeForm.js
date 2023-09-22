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
			toast.error('ERROR: Please enter a valid birthday.');
			return;
		}

		if (!validateName()) {
			toast.error('ERROR: First name and last name should not include special characters.');
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

	const validateName = () => {
		const regex = /^[a-zA-Z.]+$/;

		return regex.test(employee.first_name) && regex.test(employee.last_name);
	};

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
				<div className="mb-4">
					<label htmlFor="first-name" className="block text-gray-700 text-base font-bold mb-2">
						First Name:
					</label>
					<input
						type="text"
						name="first-name"
						value={employee.first_name}
						onChange={e => setEmployee({ ...employee, first_name: e.target.value })}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="last-name" className="block text-gray-700 text-base font-bold mb-2">
						Last Name:
					</label>
					<input
						type="text"
						name="last-name"
						value={employee.last_name}
						onChange={e => setEmployee({ ...employee, last_name: e.target.value })}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="birthday" className="block text-gray-700 text-base font-bold mb-2">
						Birthday:{' '}
					</label>
					<input
						type="date"
						id="birthday"
						name="birthday"
						value={employee.birthday || ''}
						onChange={e => setEmployee({ ...employee, birthday: e.target.value })}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
					/>
				</div>

				<button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
					{router.query.id ? 'Update Details' : 'Add Employee'}
				</button>
			</form>
		</div>
	);
}
