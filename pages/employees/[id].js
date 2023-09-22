import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '@/components/Layout';

function EmployeeView({ employee }) {
	const router = useRouter();

	const handleDelete = async id => {
		// DELETE
		const res = await fetch('/api/employees/' + id, {
			method: 'DELETE'
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.status);
				}
			})
			.then(() => {
				console.log('Employee deleted');
			})
			.catch(err => {
				console.error(err);
			});

		router.push('/');
	};

	const getAge = () => {
		const birthdate = new Date(employee.birthday);
		const current = new Date();

		let age = current.getFullYear() - birthdate.getFullYear();

		if (
			current.getMonth() < birthdate.getMonth() ||
			(current.getMonth() === birthdate.getMonth() && current.getDate() < birthdate.getDate())
		) {
			age--;
		}

		return age;
	};

	return (
		<Layout>
			<div className="flex grid-cols-2 p-6 justify-between text-center text-3xl my-5 max-w-sm w-90">
				<div className="text-justify text-lg">
					<h1>Name: {employee.first_name + ' ' + employee.last_name}</h1>
					<p>Birthday: {employee.birthday.slice(0, 10)}</p>
					<p>Age: {getAge()}</p>
				</div>
				<FontAwesomeIcon icon={faUserTie} size="2xl" />
			</div>
			<button
				className="bg-red-500 hover:bg-red-700 rounded text-white px-3 py-2"
				onClick={() => handleDelete(employee.id)}>
				Delete
			</button>

			<button
				className="bg-gray-500 hover:bg-gray-800 ml-2 px-5 rounded text-white px-3 py-2"
				onClick={() => router.push('/employees/edit/' + employee.id)}>
				Edit
			</button>
		</Layout>
	);
}

export const getServerSideProps = async context => {
	let employee;
	const response = await fetch('http://localhost:3000/api/employees/' + context.query.id)
		.then(res => {
			if (!res.ok) {
				throw Error(res.status);
			}
			return res.json();
		})
		.then(data => {
			employee = data;
		})
		.catch(err => {
			console.error(err);
		});

	return {
		props: {
			employee
		}
	};
};

export default EmployeeView;
