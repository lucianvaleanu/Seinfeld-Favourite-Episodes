const router = require("express").Router();
const EpisodesController = require('../controllers/episodes.controller');
const episodesController = new EpisodesController();

router.get('/', episodesController.getAllEpisodes.bind(episodesController));
router.get('/length/', episodesController.getLength.bind(episodesController));
router.get('/id/:id', episodesController.getEpisodeByID.bind(episodesController));
router.get('/title/:title', episodesController.getEpisodeByTitle.bind(episodesController));
router.get('/page/:page/:items', episodesController.getEpisodesByPage.bind(episodesController));
router.get('/sorted', episodesController.getSortedEpisodes.bind(episodesController));
router.get('/season/:season', episodesController.getEpisodesBySeason.bind(episodesController));
router.get('/rating/:rating', episodesController.getEpisodesByRating.bind(episodesController));
router.get('/search/:title', episodesController.searchEpisodesByTitle.bind(episodesController));
router.get('/pie-chart-data', episodesController.getPieChartData.bind(episodesController));

router.post('/', episodesController.createEpisode.bind(episodesController));

router.put('/id/:id', episodesController.updateEpisode.bind(episodesController));

router.delete('/:id', episodesController.deleteEpisodeByID.bind(episodesController));
router.delete('/title/:title', episodesController.deleteEpisodeByTitle.bind(episodesController));

module.exports = router;

