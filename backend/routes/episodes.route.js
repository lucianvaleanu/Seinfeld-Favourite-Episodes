const router = require("express").Router();
const EpisodeController = require('../controllers/episodes.controller');
const episodeController = new EpisodeController();

router.get('/', episodeController.getAllEpisodes.bind(episodeController));
router.get('/pie-chart-data', episodeController.getPieChartData.bind(episodeController));
router.get('/sorted', episodeController.getSortedEpisodes.bind(episodeController));
router.get('/id/:id', episodeController.getEpisodeByID.bind(episodeController));
router.get('/title/:title', episodeController.getEpisodeByTitle.bind(episodeController));
router.get('/season/:season', episodeController.getEpisodesBySeason.bind(episodeController));
router.get('/page/:page/:items', episodeController.getEpisodesByPage.bind(episodeController));
router.get('/length/', episodeController.getLength.bind(episodeController));
router.get('/rating/:rating', episodeController.getEpisodesByRating.bind(episodeController));

router.get('/search/:title', episodeController.searchEpisodesByTitle.bind(episodeController));

router.post('/', episodeController.createEpisode.bind(episodeController));

router.put('/id/:id', episodeController.updateEpisode.bind(episodeController));

router.delete('/:id', episodeController.deleteEpisodeByID.bind(episodeController));
router.delete('/title/:title', episodeController.deleteEpisodeByTitle.bind(episodeController));

module.exports = router;

