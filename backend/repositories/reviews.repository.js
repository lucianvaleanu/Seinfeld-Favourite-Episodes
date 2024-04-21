// repositories/reviewsRepository.js

const Review = require('../models/review.model');

class ReviewsRepository {
    constructor() {
        this.ReviewModel = Review;
    }

    async getAllReviews() {
        return await this.ReviewModel.findAll();
    }

    async getReviewsByEpisode(episodeID) {
        return await this.ReviewModel.findAll({ where: { episodeID } });
    }

    async getReviewByID(reviewID) {
        return await this.ReviewModel.findByPk(reviewID);
    }

    async getReviewByEpisodeAndTitle(episodeID, title) {
        return await this.ReviewModel.findOne({ where: { episodeID, title } });
      }

    async addReview(review) {
        return await this.ReviewModel.create(review);
    }

    async updateReview(review) {
        const { reviewID, text, title } = review;
        const existingReview = await this.ReviewModel.findByPk(reviewID);
        if (!existingReview) {
            throw new Error('Review not found');
        }
        existingReview.text = text;
        existingReview.title = title;
        return await existingReview.update({text, title});
    }

    async deleteReviewByID(reviewID) {
        const review = await this.ReviewModel.findByPk(reviewID);
        if (review) {
            await review.destroy();
            return true;
        }
        return false;
    }

    async deleteReviewByTitle(title) {
        await this.ReviewModel.destroy({ where: { title } });
    }
}

module.exports = ReviewsRepository;
