import User from '../../../models/User.model';

export default async function handler(req, res) {

	try {
		const users = await User.find();
        if ( !users.length == 0 ) {
            res.send(users);
        }
	} catch (e) {
		console.log(e);
		res.status(500);
		res.send(e);
	} 
}