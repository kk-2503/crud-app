import { pool } from '../../../config/db';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return await getEmployee(req, res);

		case 'DELETE':
			return await deleteEmployee(req, res);
		default:
			break;
	}
}

const getEmployee = async (req, res) => {
	const { id } = req.query;

	const [result] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);

	return res.status(200).json(result[0]);
};

const deleteEmployee = async (req, res) => {
	const { id } = req.query;

	const result = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

	return res.status(204).json();
};
