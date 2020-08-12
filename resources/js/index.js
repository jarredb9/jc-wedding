// import { ZoomMtg } from './@zoomus';

// const { data } = require('jquery');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.7.9/lib', '/av');

const zoomMeeting = document.getElementById('zmmtg-root');

const Url = 'https://jc-wedding.herokuapp.com/';
const user = {
	meetingNumber: 8323267051,
	role: 0
};
axios({
	method: 'post',
	url: Url,
	data: {
		user
	}
})
	.then((res) => {
		console.log(res);
		const signature1 = res.data.signature;
		const meetConfig = {
			signature: signature1,
			apiKey: 'kluj4C4XQmWotWyAVm9iLQ',
			meetingNumber: '8323267051',
			leaveUrl: 'https://theknot.com/us/jarred-and-corey',
			userName: 'Jay Burn',
			userEmail: 'doomsday95@gmail.com', // required for webinar
			passWord: '427Nf6', // if required
			role: 0 // 1 for host; 0 for attendee or webinar
		};
		console.log(meetConfig);
		ZoomMtg.init({
			leaveUrl: meetConfig.leaveUrl,
			isSupportAV: true,
			success: function() {
				ZoomMtg.join({
					signature: meetConfig.signature,
					apiKey: meetConfig.apiKey,
					meetingNumber: meetConfig.meetingNumber,
					userName: meetConfig.userName,
					// Email required for Webinars
					userEmail: meetConfig.userEmail,
					// password optional; set by Host
					passWord: meetConfig.passWord,
					error(res) {
						console.log(res);
					}
				});
			}
		});
	})
	.catch((error) => console.log(error));

// function getSignature(meetConfig) {
// 	fetch(`${YOUR_SIGNATURE_ENDPOINT}`, {
// 		method: 'POST',
// 		body: JSON.stringify({ meetingData: meetConfig })
// 	})
// 		.then((result) => result.text())
// 		.then((response) => {
// 			ZoomMtg.init({
// 				leaveUrl: meetConfig.leaveUrl,
// 				isSupportAV: true,
// 				success: function() {
// 					ZoomMtg.join({
// 						signature: response,
// 						apiKey: meetConfig.apiKey,
// 						meetingNumber: meetConfig.meetingNumber,
// 						userName: meetConfig.userName,
// 						// Email required for Webinars
// 						userEmail: meetConfig.userEmail,
// 						// password optional; set by Host
// 						passWord: meetConfig.passWord,
// 						error(res) {
// 							console.log(res);
// 						}
// 					});
// 				}
// 			});
// 		});
// }

// function generateSignature(apiKey, apiSecret, meetingNumber, role) {
// 	// Prevent time sync issue between client signature generation and zoom
// 	const timestamp = new Date().getTime() - 30000;
// 	const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
// 	const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
// 	const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

// 	return signature;
// }

// // pass in your Zoom JWT API Key, Zoom JWT API Secret, Zoom Meeting Number, and 0 to join meeting or webinar or 1 to start meeting
// console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0));
