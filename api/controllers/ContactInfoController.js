/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// import module 'nodemailer'
const nodemailer = require('nodemailer');

module.exports = {

	save: function (req, res) {
		//YOUR CODE GOES HERE

		//POST form information 

		if (!req.body) {
			res.json({ serverMessage: 'Error', error: true });
		} else {
			console.log(req.body);

			/**
			 * MailTrap configuration 
			 * 
			 * @help        :: See https://mailtrap.io/
			 */
			

			// Change this part with your own mailtrap info if you want to test with your own account
			const transport = nodemailer.createTransport({
				host: "smtp.mailtrap.io",
				port: 2525,
				auth: {
					user: "69f91feb50f9b3",
					pass: "166ba62f4fd166"
				}
			});
			transport.sendMail({
				from: '"f4456f26df-5118cc@inbox.mailtrap.io"', // Expediteur
				to: '"f4456f26df-5118cc@inbox.mailtrap.io"', // Destinataires
				subject: 'A user send you a message',
				text: 'Bonjour cher Administrateur,  un visiteur de medGo.com viens de vous envoyer un nouveau formulaire de contact: ' + '\n' + '\n'
					+ ' name: ' + req.body.name + ' ' + '\n'
					+ ' email: ' + req.body.email + ' ' + '\n'
					+ ' message: ' + req.body.message + ' ',

			}, (error, response) => {
				console.log(error);
				console.log(response);
				if (error) {
					console.log(error);
					res.json({ servermessage: `${error}` });
				} else {
					res.json({ servermessage: `${response.response}`, name: `${req.body.name}`, email: `${req.body.email}`, message: `${req.body.message}` });
					console.log(`Message sent: ${response.response}`);
				}
			});
		}

	}
};
