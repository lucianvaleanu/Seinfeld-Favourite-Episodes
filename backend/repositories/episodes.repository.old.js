const Episode = require("../models/episode.model");

class EpisodeRepository {
    constructor() {
        this.episodes = [
            new Episode(1, 'The Contest', 4, 11, 8, "../assets/thecontest.jpg"),
            new Episode(2, 'The Parking Garage', 3, 6, 8, "../assets/theparkinggarage.jpg"),
            new Episode(3, 'The Soup Nazi', 7, 6, 9, "../assets/thesoupnazi.jpg"),
            new Episode(4, 'The Comeback', 8, 13, 10, "../assets/thecomeback.jpg"),
            new Episode(5, 'The Merv Griffin Show', 9, 6, 10, "../assets/themervgriffinshow.jpg"),
            new Episode(6, 'The Summer of George', 8, 22, 10, "../assets/thesummerofgeorge.jpg"),
            new Episode(7, 'The Puerto Rican Day', 9, 20, 10, "../assets/thepuertoricanday.jpg"),
            new Episode(8, 'The Bizarro Jerry', 8, 3, 10, "../assets/thebizarrojerry.jpg"),
            new Episode(9, 'The Puffy Shirt', 5, 2, 7, "../assets/thepuffyshirt.jpg"),
            new Episode(10, 'The Opposite', 5, 22, 9, "../assets/theopposite.jpg"),
            new Episode(11, 'The Outing', 4, 17, 8, "../assets/theouting.jpg"),
            new Episode(12, 'The Marine Biologist', 5, 14, 10, "../assets/themarinebiologist.jpg"),
            new Episode(13, 'The Yada Yada', 8, 19, 6, "../assets/theyadayada.jpg"),
            new Episode(14, 'The Race', 6, 10, 9, "../assets/therace.jpg"),
            new Episode(15, 'The Switch', 6, 11, 10, "../assets/theswitch.jpg"),
            new Episode(16, 'The Jimmy', 6, 18, 7, "../assets/thejimmy.jpg")
        ];
    }

    getAllEpisodes() {
        return this.episodes;
    }

    getEpisodeByID(id) {
        return this.episodes.find(episode => episode.id === id);
    }
    

    addEpisode(newEpisode) {
        this.episodes.push(newEpisode);
    }

    updateEpisode(updatedEpisode) {
        const index = this.episodes.findIndex(episode => episode.id === updatedEpisode.id);
        if (index !== -1) {
            this.episodes[index] = updatedEpisode;
        }
    }

    deleteEpisodeByID(id) {
        this.episodes = this.episodes.filter(episode => episode.id !== id);
    }
}

module.exports = EpisodeRepository;