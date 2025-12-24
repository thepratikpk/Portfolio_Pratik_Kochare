// Centralized video playback manager to prevent AbortError conflicts
class VideoPlaybackManager {
    constructor() {
        this.activePromises = new Map();
        this.playingVideos = new Set();
    }

    async safePlay(video, videoId) {
        if (!video || this.playingVideos.has(videoId)) return;

        try {
            // Cancel any existing play promise for this video
            if (this.activePromises.has(videoId)) {
                await this.activePromises.get(videoId).catch(() => { });
            }

            // Only play if video is paused
            if (video.paused) {
                const playPromise = video.play();
                this.activePromises.set(videoId, playPromise);
                this.playingVideos.add(videoId);

                await playPromise;
                this.activePromises.delete(videoId);
            }
        } catch (error) {
            this.activePromises.delete(videoId);
            this.playingVideos.delete(videoId);

            // Only throw non-abort errors
            if (error.name !== 'AbortError') {
                throw error;
            }
        }
    }

    async safePause(video, videoId) {
        if (!video) return;

        try {
            // Wait for any pending play promise
            if (this.activePromises.has(videoId)) {
                await this.activePromises.get(videoId).catch(() => { });
                this.activePromises.delete(videoId);
            }

            if (!video.paused) {
                video.pause();
            }

            this.playingVideos.delete(videoId);
        } catch (error) {
            this.playingVideos.delete(videoId);
            console.warn('Video pause failed:', error);
        }
    }

    isPlaying(videoId) {
        return this.playingVideos.has(videoId);
    }

    cleanup(videoId) {
        this.activePromises.delete(videoId);
        this.playingVideos.delete(videoId);
    }

    // Get stats for debugging
    getStats() {
        return {
            activePromises: this.activePromises.size,
            playingVideos: this.playingVideos.size
        };
    }
}

export const videoPlaybackManager = new VideoPlaybackManager();