const assert = require('assert');

const { Sequelize, DataTypes } = require('sequelize');
const EpisodesRepository = require('../repositories/episodes.repository');
const EpisodesService = require('../services/episodes.service');

describe('EpisodesService', () => {
    let sequelize;
    let EpisodeModel;
    let episodesRepository;
    let episodesService;

    beforeEach(async () => {
        sequelize = new Sequelize('sqlite::memory:');
        EpisodeModel = sequelize.define('Episode', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            season: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            episode_number: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        await sequelize.sync();
        episodesRepository = new EpisodesRepository(EpisodeModel);
        episodesService = new EpisodesService(episodesRepository);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    describe('getAllEpisodes', () => {
        it('should return all episodes', async () => {
            let episodes = await episodesService.getAllEpisodes();
            expect(episodes.length).toEqual(0);
            await episodesService.addEpisode("title", 1, 1, 1);
            episodes = await episodesService.getAllEpisodes();
            expect(episodes.length).toEqual(1);
        });
    });

    describe('getLength', () => {
        it('should return the correct length after each add and delete', async () => {
            let length = await episodesService.getLength();
            expect(length).toEqual(0);
            await episodesService.addEpisode("title", 1, 1, 1);
            length = await episodesService.getLength();
            expect(length).toEqual(1);
            await episodesService.addEpisode("title2", 1, 1, 1);
            length = await episodesService.getLength();
            expect(length).toEqual(2);
            await episodesService.deleteEpisodeByTitle("title2");
            length = await episodesService.getLength();
            expect(length).toEqual(1);
            await episodesService.deleteEpisodeByTitle("title");
            length = await episodesService.getLength();
            expect(length).toEqual(0);
        });
    });

    describe('getEpisodeByTitle', () => {
        it('should return the correct episode given the title', async() => {
            await episodesService.addEpisode("The Episode", 1, 1, 1);
            const episode = await episodesService.getEpisodeByTitle("The Episode");
            expect(episode.title).toEqual("The Episode");
        });
     });


});
