window.onload = () => {
    const iframe = document.getElementById('soundcloudPlayer');

    // Define the SoundCloud track URL dynamically
    const trackUrl = 'https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4'; // Replace with your desired track URL
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;

    // Set the iframe src to load the desired track
    iframe.src = embedUrl;

    // Initialize the SoundCloud Widget API
    const widget = SC.Widget(iframe);

    // Wait for the widget to load and then start playback
    widget.bind(SC.Widget.Events.READY, () => {
        // Stop playback after 5 seconds
        setTimeout(() => {
            widget.pause();
        }, 5000);
    });
};