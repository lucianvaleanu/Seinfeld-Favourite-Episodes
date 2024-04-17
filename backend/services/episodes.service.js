const EpisodesRepository = require("../repositories/episodes.repository");

class EpisodesService {
    constructor() {
        this.episodesRepository = new EpisodesRepository();
    }

    transformString(input) {
        let transformedString = input.trim().replace(/-+/g, ' ').toLowerCase();
        return transformedString;
    }

    async getAllEpisodes() {
        return await this.episodesRepository.getAllEpisodes();
    }

    async getLength() {
        const sql = 'SELECT COUNT(*) AS episodeCount FROM episodes';
        const result = await this.episodesRepository.executeQuery(sql);

        const episodeCount = result[0].episodeCount;

        return episodeCount;
    }


    async getEpisodeByID(id) {
        id = Number(id);
        const episode = await this.episodesRepository.getEpisodeByID(id);
        if (!episode) {
            throw new Error(`Episode not found with ID ${id}`);
        }
        return episode;
    }

    async getEpisodeByTitle(title) {
        const transformedTitle = this.transformString(title);
        const sql = 'SELECT * FROM episodes WHERE LOWER(title) = ?';
        const episodes = await this.episodesRepository.executeQuery(sql, [transformedTitle]);

        if (!episodes || episodes.length === 0) {
            throw new Error(`Episode not found with title '${title}'`);
        }

        return episodes[0];
    }


    async getSortedEpisodes() {
        const sql = 'SELECT * FROM episodes ORDER BY title';
        const sortedEpisodes = await this.episodesRepository.executeQuery(sql);
        return sortedEpisodes;
    }


    async getEpisodesBySeason(season) {
        season = Number(season);
        if (isNaN(season)) {
            throw new Error('Invalid season parameter');
        }

        const sql = 'SELECT * FROM episodes WHERE season = ?';
        const episodes = await this.episodesRepository.executeQuery(sql, [season]);

        return episodes;
    }

    async getPieChartData() {
        const sql = 'SELECT season, COUNT(*) AS count FROM episodes GROUP BY season';
        const results = await this.episodesRepository.executeQuery(sql);

        const seasonCounts = {};
        results.forEach(row => {
            const season = row.season;
            const count = row.count;
            seasonCounts[season] = count;
        });

        return seasonCounts;
    }


    async getEpisodesByPage(pageNumber, pageSize) {
        pageNumber = Number(pageNumber);
        pageSize = Number(pageSize);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber <= 0 || pageSize <= 0) {
            throw new Error('Invalid page number or page size');
        }

        const offset = (pageNumber - 1) * pageSize;
        const sql = 'SELECT * FROM episodes ORDER BY id LIMIT ? OFFSET ?';
        const episodes = await this.episodesRepository.executeQuery(sql, [pageSize, offset]);

        return episodes;
    }


    async getEpisodesByRating(rating) {
        rating = Number(rating);
        if (isNaN(rating) || rating < 0 || rating > 10) {
            throw new Error('Invalid rating parameter. Rating must be between 0 and 10.');
        }

        const sql = 'SELECT * FROM episodes WHERE rating = ?';
        const episodes = await this.episodesRepository.executeQuery(sql, [rating]);

        return episodes;
    }



    async addEpisode(title, season, episode_number, rating) {
        if (!title || !season || !episode_number || !rating) {
            throw new Error('Missing required parameters');
        }

        const transformedTitle = this.transformString(title);
        const episodes = await this.episodesRepository.getAllEpisodes();
        const episode = episodes.filter((e) => this.transformString(e.title) == transformedTitle);
        if (episode.length > 0) {
            throw new Error("An episode with the same title already exists!");
        }

        season = Number(season);
        episode_number = Number(episode_number);
        rating = Number(rating);

        if (isNaN(season) || isNaN(episode_number) || isNaN(rating)) {
            throw new Error('Invalid episode data');
        }

        const image = "../assets/default.jpg";
        const newEpisode = { title, season, episode_number, rating, image };
        await this.episodesRepository.addEpisode(newEpisode);
        return newEpisode;
    }

    async deleteEpisodeByID(id) {
        id = Number(id);
        const success = await this.episodesRepository.deleteEpisodeByID(id);
        if (!success) {
            throw new Error(`Episode not found with ID ${id}`);
        }
    }

    async deleteEpisodeByTitle(title) {
        await this.episodesRepository.deleteEpisodeByTitle(this.transformString(title));
    }

    async searchEpisodesByTitle(title) {
        if (!title) {
            throw new Error('Title parameter is missing');
        }

        const transformedTitle = this.transformString(title);
        const sql = 'SELECT * FROM episodes WHERE LOWER(title) LIKE ?';
        const searchTerm = `%${transformedTitle}%`;
        const episodes = await this.episodesRepository.executeQuery(sql, [searchTerm]);

        return episodes;
    }

    async updateEpisode(id, newTitle, newSeason, newEp, newRating) {
        id = Number(id);
        newSeason = Number(newSeason);
        newEp = Number(newEp);
        newRating = Number(newRating);
    
        const episodeToUpdate = await this.episodesRepository.getEpisodeByID(id);
    
        if (newTitle && newTitle !== episodeToUpdate.title) {
            const transformedTitle = this.transformString(newTitle);
    
            const sql = 'SELECT * FROM episodes WHERE LOWER(title) = ? AND id <> ?';
            const existingEpisodeWithSameTitle = await this.episodesRepository.executeQuery(sql, [transformedTitle, id]);
    
            if (existingEpisodeWithSameTitle.length > 0) {
                throw new Error("An episode with the same title already exists!");
            }
        }
        await this.episodesRepository.updateEpisode({id: id, title: newTitle, season: newSeason, episode_number: newEp, rating: newRating});
    
        return episodeToUpdate;
    }
    

}

module.exports = EpisodesService;
