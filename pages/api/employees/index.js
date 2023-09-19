export default function handler(req, res) {
	if (req.method === 'POST') {
		return res.status(200).json('creating a product');
	} else {
		return res.status(200).json('Getting a product');
	}
}
