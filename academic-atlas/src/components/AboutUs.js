import React, { useState, useEffect } from 'react';
import '../styles/AboutUs.css';
import DeveloperItem from './DeveloperItem';
import developerService from '../services/developerService';
import feedbackService from '../services/feedbackService';
import userService from '../services/userService'; // Import the user service

export default function AboutUs() {
    const [developers, setDevelopers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [userCount, setUserCount] = useState(500); // State to track total user count
    const [currentCount, setCurrentCount] = useState(0); // State for the dynamic counter

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const response = await developerService.getDevelopers();
                setDevelopers(response.data.developers);
            } catch (err) {
                console.log(err);
            }
        };

        const getFeedbacks = async () => {
            try {
                const response = await feedbackService.getAllFeedbacks();
                setReviews(response.data.feedbacks);
            } catch (err) {
                console.log(err);
            }
        };

        const getUserCount = async () => {
            try {
                const response = await userService.getUserCount();
                setUserCount(response.data.count); // Assume the API returns { count: number }
            } catch (err) {
                console.log(err);
            }
        };

        getDevelopers();
        getFeedbacks();
        getUserCount(); // Fetch user count
    }, []);

    useEffect(() => {
        if (currentCount < userCount) {
            const interval = setInterval(() => {
                setCurrentCount(prevCount => {
                    if (prevCount < userCount) {
                        return prevCount + 1;
                    } else {
                        clearInterval(interval);
                        return prevCount;
                    }
                });
            }, 50); // Increment speed: 100ms

            return () => clearInterval(interval); // Clear interval on unmount
        }
    }, [currentCount, userCount]);

    return (
        <div className="aboutus-page">
            <header className="hero-section">
                <h1>About Us</h1>
                <p>Discover how we make a difference in students academic lives</p>
            </header>
            <div className="content">
                <section className="problems">
                    <h2>Problems Students Faced Before</h2>
                    <p>Before the advent of our website, AVV Chennai students faced significant hurdles in accessing past academic resources. They struggled with finding previous year's papers, course-related projects, and research works, which are essential for effective study and exam preparation. This lack of organized and easily accessible materials often resulted in increased stress and inefficient study methods. Our platform addresses these challenges by providing a centralized repository of valuable resources, fostering a more collaborative and supportive academic environment.</p>
                </section>
                <section className="solutions">
                    <h2>How Our Website Solves Those Problems</h2>
                    <p>Our website, Academic-Atlas, revolutionizes the way AVV Chennai students access and utilize academic resources. By centralizing past midterm and endterm papers, course-related projects, and research works, we eliminate the frustration of scattered information. With an intuitive interface, students can effortlessly find and contribute valuable materials, ensuring a continuous flow of knowledge. This not only enhances individual learning but also fosters a culture of collaboration, where students support each other by sharing insights and resources. Our platform transforms academic preparation into a streamlined and enriching experience.</p>
                </section>
                <section className="features">
                    <h2>Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <h3>Extensive Resource Library</h3>
                            <p>Access a vast collection of academic resources and study materials.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Past Exam Papers</h3>
                            <p>Easily find and download previous midterm and endterm papers.</p>
                        </div>
                        <div className="feature-item">
                            <h3>User-Friendly Interface</h3>
                            <p>Navigate through our platform with ease and find what you need quickly.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Community Contributions</h3>
                            <p>Contribute and share your projects and research with fellow students.</p>
                        </div>
                    </div>
                </section>
                <section className="developers">
                    <h2>Meet the Developers</h2>
                    <div className="developers-grid">
                        {
                            developers.length !== 0 &&
                            developers.map(developer => <DeveloperItem key={developer._id} developer={developer} />)
                        }
                    </div>
                </section>
                <section className="reviews">
                    <h2>Reviews and Ratings</h2>
                    <div className="reviews-wrapper">
                        <div className="reviews-grid">
                            {
                                reviews.length !== 0 &&
                                reviews.map(review => (
                                    <div key={review._id} className="review-card">
                                        <span className='review-email'>{review.email}</span>
                                        <div className="rating">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                                        <p>{review.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
                <section className="user-count">
                    <h2>User Count</h2>
                    <div className="user-count-item">
                        {currentCount}
                    </div>
                </section>
            </div>
        </div>
    );
}
