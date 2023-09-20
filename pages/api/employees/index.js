import { pool } from '../../../config/db';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return await getEmployees(req, res);
		case 'POST':
			return await addEmployee(req, res);
	}
}

const getEmployees = async (req, res) => {
	const [result] = await pool.query('SELECT * FROM employees');
	return res.status(200).json(result);
};

const addEmployee = async (req, res) => {
	const { first_name, last_name, birthday } = req.body;

	const [result] = await pool.query('INSERT INTO employees SET ?', {
		first_name,
		last_name,
		birthday
	});

	return res.status(200).json({ first_name, last_name, birthday, id: result.insertId });
};
