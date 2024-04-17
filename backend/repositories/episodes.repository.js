const pool = require('./database');

class EpisodesRepository {
    constructor() {
        this.pool = pool;
    }

    async getAllEpisodes() {
        const sql = 'SELECT * FROM episodes';
        return await this.executeQuery(sql);
    }

    async getEpisodeByID(id) {
        const sql = 'SELECT * FROM episodes WHERE id = ?';
        return await this.executeQuery(sql, [id]);
    }

    async addEpisode(episode) {
        const { title, season, episode_number, rating, image } = episode;
        const sql = 'INSERT INTO episodes (title, season, episode_number, rating, image) VALUES (?, ?, ?, ?, ?)';
        return await this.executeQuery(sql, [title, season, episode_number, rating, image]);
    }

    async updateEpisode(episode) {
        const { id, title, season, episode_number, rating } = episode;
        const sql = 'UPDATE episodes SET title = ?, season = ?, episode_number = ?, rating = ? WHERE id = ?';
        return await this.executeQuery(sql, [title, season, episode_number, rating, id]);
    }

    async deleteEpisodeByID(id) {
        const sql = 'DELETE FROM episodes WHERE id = ?';
        return await this.executeQuery(sql, [id]);
    }

    async deleteEpisodeByTitle(title) {
        const sql = 'DELETE FROM episodes WHERE title = ?';
        return await this.executeQuery(sql, [title]);
    }

    async executeQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = EpisodesRepository;
