import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';

function EmployeeView({ employee }) {
	const router = useRouter();

	const handleDelete = async id => {
		console.log(id);

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

	return (
		<Layout>
			<h1>{employee.first_name + ' ' + employee.last_name}</h1>
			<p>{employee.birthday.slice(0, 10)}</p>
			<p>{employee.age}</p>

			<button
				className="bg-red-500 hover:bg-red-700 rounded text-white px-3 py-2"
				onClick={() => handleDelete(employee.id)}>
				Delete
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
