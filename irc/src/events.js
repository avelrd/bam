exports.findEvent = function (name) {
	if (name === 'party') {
		return {
			'title': 'Big Party',
			'description': 'This is a placeholder event!'
		};
	} else {
		return {
			'errorMessage': 'Event not found.'
		};
	}
};
