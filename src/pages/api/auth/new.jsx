import User from '../../../../models/User.model';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
	try {
		await User.add({
			data: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				name: req.body.name,
				phoneNumber: req.body.phoneNumber,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 0 ),
				role: req.body.role
			}
		});
		res.send('ok');
		// window.alert('You are successfully registered!');
		return ('success!');
	} catch (e) {
		res.status(500);
		res.send(e);
	} 
}