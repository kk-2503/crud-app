import React from 'react';
import Link from 'next/link';

import { Layout } from '@/components/Layout';

function homePage({ employees }) {
	return (
		<Layout>
			{employees.map(empl => (
				<Link href={`/employees/${empl.id}`} key={empl.id}>
					<div className="border border-gray-200 shadow-md p-6">
						<h1>{empl.first_name + ' ' + empl.last_name}</h1>
					</div>
				</Link>
			))}
		</Layout>
	);
}

export const getServerSideProps = async context => {
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

	return {
		props: {
			employees
		}
	};
};

export default homePage;
