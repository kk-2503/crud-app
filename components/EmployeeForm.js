import React from 'react';

function EmployeeForm() {
	return (
		<div>
			<form>
				<label htmlFor="first-name">First Name: </label>
				<input type="text" name="first-name" />

				<label htmlFor="last-name">Last Name: </label>
				<input type="text" name="last-name" />

				<label htmlFor="birthday">Birthday: </label>
				<input type="date" id="birthday" name="birthday" />

				<button>Add Employee</button>
			</form>
		</div>
	);
}

export default EmployeeForm;
