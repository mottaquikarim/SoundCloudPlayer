// set up soundcloud API
SoundCloudAPI.init( 'cd9be64eeb32d1741c17cb39e41d254d' );

// set up the search
UI.handleEnterPress('.js-search', onSearchQueryEntered);
UI.handleSubmitClick('.js-submit', '.js-search', onSearchQueryEntered);

// draw any tracks that are saved to storage
prepulateFromStorage();

function prepulateFromStorage() {
	var data = Playlist.getData();

	console.log( data );
	data.forEach(function( id ){
		console.log( id );
		SoundCloudAPI.getTrack( id ).then(function(track){
			addToSidebar( track );
		})
	});
}

function onSearchQueryEntered( inputVal ) {
	SoundCloudAPI.search( 'tracks', inputVal ).then(function( tracks ){
		var searchResult = document.querySelector('.js-search-results');
		searchResult.innerHTML = "";

		tracks.forEach(function( track ) {
			UI.renderTrack( track, searchResult, function() {
				Playlist.add( track.id );
				addToSidebar( track );
			});
		});
	});		
}

function addToSidebar( track ) {

	var sidebar = document.querySelector('.js-playlist');
	SoundCloudAPI.getEmbed( track.permalink_url ).then(function( oembed ) {
		
		var embed = document.createElement('div');
		embed.innerHTML = oembed.html;

		if ( sidebar.childNodes[ 0 ] ) {
			sidebar.insertBefore( embed, sidebar.childNodes[ 0 ] );
		}
		else {
			sidebar.appendChild( embed );
		}

		// grab the widget object
		var SCWdiget = SoundCloudAPI.getWidget( embed.childNodes[ 0 ] );

		// bind the finish event to init
		SCWdiget.bind('finish', function() {
			Playlist.next();

			var nextEmbed = sidebar.childNodes[ Playlist.currentTrack ];
			var nextWidget = SoundCloudAPI.getWidget( nextEmbed.childNodes[ 0 ] );

			nextWidget.play();
		});
		SCWdiget.bind('play', function() {
			var widgetIndex = Array.from( sidebar.childNodes ).indexOf( embed );
			// OLDer JAVASCRIPT: [].slice.call( sidebar.childNodes ).indexOf( embed ).
			Playlist.currentTrack = widgetIndex;
		});
	});
}