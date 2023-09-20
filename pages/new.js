import React from 'react';

import { EmployeeForm } from '@/components/EmployeeForm';
import { Layout } from '@/components/Layout';

function addEmployee() {
	return (
		<Layout>
			<EmployeeForm />
		</Layout>
	);
}

export default addEmployee;
