import React from 'react';

import { EmployeeForm } from '@/components/EmployeeForm';
import { Layout } from '@/components/Layout';

function addEmployee() {
	return (
		<Layout>
			<div className="grid place-items-center">
				<EmployeeForm />
			</div>
		</Layout>
	);
}

export default addEmployee;
