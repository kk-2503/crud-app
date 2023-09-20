export function EmployeeForm() {
	const handleSubmit = async e => {
		e.preventDefault();
		const res = await fetch('/api/employees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				first_name: 'abc',
				last_name: 'def',
				birthday: '2007-03-25'
			})
		});
		const responseData = await res.json();

		// Handle and display the response data
		console.log('Response data:', responseData);
	};

	return (
		<div className="bg-gray-300">
			<form onSubmit={handleSubmit}>
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
