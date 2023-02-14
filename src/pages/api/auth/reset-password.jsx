import User from '../../../../models/User.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
	try {

		const info = jwt.verify( req.body.token, 'secret' );

		const user = await User.findOne({ email: info.email });
		if(! user) {
			res.status(401);
			return res.send({
				message: 'User not found'
			});
		}

		await user.update({
			where: {
				email: info.email
			},
			data: {
				password: bcrypt.hashSync(req.body.password, 0 ),
			}
		});

		res.send('ok');
	} catch (e) {
		console.log(e);
		res.status(500);
		res.send(e);
	} 
}