

exports.validateEmail = (email) => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if(emailPattern.test(email)) return true;

	return false;

}
