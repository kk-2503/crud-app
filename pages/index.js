import React from 'react';

import { EmployeeForm } from '@/components/EmployeeForm';

function homePage({ employees }) {
	return (
		<div>
			<EmployeeForm />
			<div>
				{employees.map(empl => (
					<div key={empl.id}>
						<h1>{empl.first_name + ' ' + empl.last_name}</h1>
						<p>{empl.birthday.slice(0, 10)}</p>
						<p>{empl.age}</p>
					</div>
				))}
			</div>
		</div>
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
