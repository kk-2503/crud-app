import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '@/components/Layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function homePage() {
	const router = useRouter();

	const fetchEmployees = async () => {
		let employees;

		const response = await fetch('http://localhost:3000/api/employees')
			.then(res => {
				if (!res.ok) {
					throw Error(res.status);
				}
				return res.json();
			})
			.then(data => {
				employees = data;
			})
			.catch(err => {
				console.error(err);
			});
		return employees;
	};

	const query = useQuery({
		queryKey: ['employees'],
		queryFn: fetchEmployees
	});

	const queryClient = useQueryClient();

	const deleteEmployee = async id => {
		const res = await fetch('/api/employees/' + id, {
			method: 'DELETE'
		});

		if (!res.ok) {
			throw new Error('Failed to delete employee');
		}

		return id;
	};

	const { mutate } = useMutation({
		mutationFn: deleteEmployee,
		onSuccess: id => {
			queryClient.invalidateQueries({
				queryKey: ['employees']
			});
			console.log('Employee deleted. ID: ' + id);
		}
	});

	const handleDelete = id => {
		if (window.confirm('Delete Employee?')) {
			mutate(id);
		}
	};
	// const handleDelete = async id => {
	// 	// DELETE
	// 	const res = await fetch('/api/employees/' + id, {
	// 		method: 'DELETE'
	// 	})
	// 		.then(res => {
	// 			if (!res.ok) {
	// 				throw Error(res.status);
	// 			}
	// 		})
	// 		.then(() => {
	// 			console.log('Employee deleted');
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});

	// 	router.push('/');
	// };

	return (
		<Layout>
			{query.data?.length === 0 ? (
				<h1 className="text-center text-2xl font-bold">No employees</h1>
			) : (
				<div className="grid gap-3 grid-cols-1 md:grid-cols-2">
					{query.data?.map(empl => (
						<div
							key={empl.id}
							className="flex text-center border bg-gray-200 border-gray-200 shadow-md p-6 justify-between">
							<Link href={`/employees/${empl.id}`}>
								<h1 className="text-2xl">{empl.first_name + ' ' + empl.last_name}</h1>
							</Link>
							<button className="justify-center" onClick={() => handleDelete(empl.id)}>
								<FontAwesomeIcon icon={faTrash} size="lg" />
							</button>
							import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
						</div>
					))}
				</div>
			)}
		</Layout>
	);
}

// export const getServerSideProps = async context => {
// 	let employees;
// 	const response = await fetch('http://localhost:3000/api/employees')
// 		.then(res => {
// 			if (!res.ok) {
// 				throw Error(res.status);
// 			}
// 			return res.json();
// 		})
// 		.then(data => {
// 			employees = data;
// 		})
// 		.catch(err => {
// 			console.error(err);
// 		});

// 	return {
// 		props: {
// 			employees
// 		}
// 	};
// };

export default homePage;
