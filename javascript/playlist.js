var Playlist = {};

Playlist.currentTrack = null;

Playlist.getData = function() {
	var data = localStorage.getItem('playlist');

	if ( data === null ) {
		data = [];
	}
	else {
		data = data.split(',');
	}

	return data;
}

Playlist.setData = function( data ) {
	localStorage.setItem( 'playlist', data.join() );
}

Playlist.add = function( id ) {

	var data = Playlist.getData();

	console.log( data );

	data.push( id );

	Playlist.setData( data );
}

Playlist.next = function() {
	var currentTrack = Playlist.currentTrack;

	console.log( 'started', currentTrack );
	if ( currentTrack === null ) {
		Playlist.currentTrack = 0;
		return;
	}

	var data = Playlist.getData();
	console.log( 'about to set to 0 or next', currentTrack );
	if ( currentTrack === data.length - 1 ) {
		currentTrack = 0;
	}
	else {
		currentTrack++;
	}

	console.log( 'final', currentTrack );
	Playlist.currentTrack = currentTrack;
}