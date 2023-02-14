import User from '../../../../models/User.model';
import bcrypt from 'bcrypt';
import { confirmPasswordHash } from '~/utils/auth';

export default async function handler(req, res) {
	try {
		
		let user;
		console.log(' User Update Query Data: ', req.body);
		user = await User.findOne({ name: req.body.name });

		if ( user ) {
			const check = await confirmPasswordHash(req.body.current_password, user.password);
			
			if (check) {
				const data = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email == user.email ? undefined : req.body.email
				}

				if ( req.body.password ) {
					data['password'] = bcrypt.hashSync(req.body.password, 0 );
				}

				await user.updateOne({
					where: {
						id: user.id
					},
					data
				});

				return res.send(user);
			}
		}

		res.status(401).send({
			message: "Password is not correct"
		});
	} catch (e) {
		console.log(e);
		res.status(500);
		res.send(e);
	} 
}