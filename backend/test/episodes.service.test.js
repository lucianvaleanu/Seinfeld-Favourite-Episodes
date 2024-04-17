const EpisodeService = require("../services/episodes.service.js");
require("dotenv").config();

describe("getEpisodesByRating", ()=>{
    it("should return episodes with rating 10", () =>{
        const episodesService = new EpisodeService();
        let episodesByRating = episodesService.getEpisodesByRating(10);
        let episodesTitles = episodesByRating.map(episode => episode.title);
        expect(episodesTitles).toEqual([
            "The Comeback",
            "The Merv Griffin Show",
            "The Summer of George",
            "The Puerto Rican Day",
            "The Bizarro Jerry",
            "The Marine Biologist",
            "The Switch"
        ]);
        episodesService.deleteEpisodeByTitle("the-switch");
        episodesByRating = episodesService.getEpisodesByRating(10);
        episodesTitles = episodesByRating.map(episode => episode.title);
        expect(episodesTitles).toEqual([
            "The Comeback",
            "The Merv Griffin Show",
            "The Summer of George",
            "The Puerto Rican Day",
            "The Bizarro Jerry",
            "The Marine Biologist"
        ]);
    });
});

describe("getSortedEpisodes", () => {
    it("should return episodes sorted alphabetically by title", () => {
        const episodesService = new EpisodeService();
        let sortedEpisodes = episodesService.getSortedEpisodes();
        let sortedTitles = sortedEpisodes.map(episode => episode.title);
        expect(sortedTitles).toEqual([
            "The Bizarro Jerry",
            "The Comeback",
            "The Contest",
            "The Jimmy",
            "The Marine Biologist",
            "The Merv Griffin Show",
            "The Opposite",
            "The Outing",
            "The Parking Garage",
            "The Puerto Rican Day",
            "The Puffy Shirt",
            "The Race",
            "The Soup Nazi",
            "The Summer of George",
            "The Switch",
            "The Yada Yada"
        ]);

        episodesService.deleteEpisodeByTitle("the-soup-nazi");
        sortedEpisodes = episodesService.getSortedEpisodes();
        sortedTitles = sortedEpisodes.map(episode => episode.title);
        expect(sortedTitles).toEqual([
            "The Bizarro Jerry",
            "The Comeback",
            "The Contest",
            "The Jimmy",
            "The Marine Biologist",
            "The Merv Griffin Show",
            "The Opposite",
            "The Outing",
            "The Parking Garage",
            "The Puerto Rican Day",
            "The Puffy Shirt",
            "The Race",
            "The Summer of George",
            "The Switch",
            "The Yada Yada"
        ]);

    });
});

describe("pagination tests", () => {
    const episodeService = new EpisodeService();
    
    it("should return the first three episodes from the first page", () => {
        let paginatedEpisodes = episodeService.getEpisodesByPage(1, 3);
        expect(paginatedEpisodes).toEqual([
            {
                "id": 1,
                "title": "The Contest",
                "season": 4,
                "ep": 11,
                "rating": 8,
                "image": "../assets/thecontest.jpg"
            },
            {
                "id": 2,
                "title": "The Parking Garage",
                "season": 3,
                "ep": 6,
                "rating": 8,
                "image": "../assets/theparkinggarage.jpg"
            },
            {
                "id": 3,
                "title": "The Soup Nazi",
                "season": 7,
                "ep": 6,
                "rating": 9,
                "image": "../assets/thesoupnazi.jpg"
            }
        ]);
    });

    it("should return the second three episodes from the second page", () => {
        let paginatedEpisodes = episodeService.getEpisodesByPage(2, 3);
        expect(paginatedEpisodes).toEqual([
            {
                "id": 4,
                "title": "The Comeback",
                "season": 8,
                "ep": 13,
                "rating": 10,
                "image": "../assets/thecomeback.jpg"
            },
            {
                "id": 5,
                "title": "The Merv Griffin Show",
                "season": 9,
                "ep": 6,
                "rating": 10,
                "image": "../assets/themervgriffinshow.jpg"
            },
            {
                "id": 6,
                "title": "The Summer of George",
                "season": 8,
                "ep": 22,
                "rating": 10,
                "image": "../assets/thesummerofgeorge.jpg"
            }
        ]);
    });
});


describe("transformString", () => {
    const episodesService = new EpisodeService();
    it("should transform string correctly", () => {
        const input = "   The Quick  Brown Fox";
        const expectedOutput = "the-quick-brown-fox";
        expect(episodesService.transformString(input)).toBe(expectedOutput);
    });
});

describe("getIDByTitle", () => {
    const episodesService = new EpisodeService();
    it("should throw error if episode with given title is not found", () => {
        const invalidTitle = "non-existing-title";
        expect(() => {
            episodesService.getIDByTitle(invalidTitle);
        }).toThrow('Episode not found');
    });
});

describe('getPieChartData', () => {
    it('should return the correct pie chart data', () => {
        const episodesService = new EpisodeService();
        let pieChartData = episodesService.getPieChartData();
        expect(pieChartData).toEqual({
            "3": 1,
            "4": 2,
            "5": 3,
            "6": 3,
            "7": 1,
            "8": 4,
            "9": 2
        });
        episodesService.deleteEpisodeByTitle("the-soup-nazi"); //deleting the soup nazi episode which is from season 7
        pieChartData = episodesService.getPieChartData();
        expect(pieChartData).toEqual({
            "3": 1,
            "4": 2,
            "5": 3,
            "6": 3,
            "8": 4,
            "9": 2
        });
    });
});


