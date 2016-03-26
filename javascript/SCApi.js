var SoundCloudAPI = {};

SoundCloudAPI.init = function( clientId ) {
	SC.initialize({
		client_id: clientId
	});
} 	

SoundCloudAPI.search = function( type, value ) {
	return SC.get('/' + type, {
		q: value
	});
}

SoundCloudAPI.getTrack = function( id ) {
	return SC.get('/tracks/'+id);
}

SoundCloudAPI.getEmbed = function( trackPermalink ) {
	return SC.oEmbed( trackPermalink, {
		maxheight: 200,
		show_comments: false
	});
}

SoundCloudAPI.getWidget = function( embedElement ) {
	return SC.Widget( embedElement );
}