 // Function to create and load the SoundCloud player
 function loadSoundCloudPlayer(trackUrl) {
    // Create the iframe element dynamically
    const iframe = document.createElement('iframe');
    iframe.width = "100%";
    iframe.height = "166";
    iframe.scrolling = "no";
    iframe.frameborder = "no";
    iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
    
    // Insert the iframe into the player container
    const container = document.getElementById('player-container');
    container.innerHTML = ''; // Clear any existing content
    container.appendChild(iframe);

    // Create the widget instance for control
    var widget = SC.Widget(iframe);

    // Play the track and stop after 5 seconds
    widget.bind(SC.Widget.Events.READY, function() {
      widget.play(); // Start playing

      setTimeout(function() {
        widget.pause(); // Pause after 5 seconds
      }, 5000); // 5000 ms = 5 seconds
    });
  }

  // Example: Choose a track dynamically and load it
  const trackUrl = "https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4"; // Replace with the desired track URL
  loadSoundCloudPlayer(trackUrl);