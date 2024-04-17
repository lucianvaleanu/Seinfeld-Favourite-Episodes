class Episode {
    constructor(id, title, season, episode_number, rating, image) {
        this.id = id;
        this.title = title;
        this.season = season;
        this.episode_number = episode_number;
        this.rating = rating;
        this.image = image;
    }
}

module.exports = Episode;