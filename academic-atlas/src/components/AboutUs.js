import React, { useState, useEffect } from 'react';
import '../styles/AboutUs.css';
import feedbackService from '../services/feedbackService';
import userService from '../services/userService';
import { HiUserGroup } from "react-icons/hi";
import { VscGraph } from "react-icons/vsc";

export default function AboutUs() {
    const [reviews, setReviews] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [avgRating, setAvgRating] = useState(0);

    useEffect(() => {

        const getFeedbacks = async () => {
            try {
                const response = await feedbackService.getAllFeedbacks();
                setReviews(response.data.feedbacks);
                let totalRating = 0;
                for (let i = 0; i < response.data.feedbacks.length; i++) {
                    totalRating += response.data.feedbacks[i].rating;
                }
                totalRating = (totalRating / response.data.feedbacks.length).toFixed(1);
                setAvgRating(totalRating);
            } catch (err) {
                console.log(err);
            }
        };

        const getUserCount = async () => {
            try {
                const response = await userService.getUserCount();
                setUserCount(response.data.count);
            } catch (err) {
                console.log(err);
            }
        };
        getFeedbacks();
        getUserCount();
    });

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.user-count');
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= window.innerHeight && currentCount === 0) {
                startCount();
            }
        };

        const startCount = () => {
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
                }, 30); // Increment speed: 50ms
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                    <h2>Meet the Contributors</h2>
                    <div className="developers-grid">
                        <p align="center">
                            <a href="https://github.com/nazeer-18/Academic-Atlas/graphs/contributors" target="_blank" rel="noopener noreferrer">
                                <img src="https://contrib.rocks/image?repo=nazeer-18/Academic-Atlas" />
                            </a>
                        </p>
                    </div>
                </section>
                <section className="reviews">
                    <h2>Reviews and Ratings</h2>
                    <div className="reviews-wrapper">
                        <marquee scrollAmount="15">
                            {
                                reviews.length !== 0 &&
                                reviews.map(review => (
                                    <div key={review._id} className="review-card">
                                        <span className="review-email">{review.email}</span>
                                        <div className="rating">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                                        <p>{review.description}</p>
                                    </div>
                                ))
                            }
                        </marquee>
                    </div>
                </section>
                <section className="user-count">
                    <div className="user-count-container">
                        <div className="user-count-item">
                            <h2><HiUserGroup /> Users Registered</h2>
                            <p>{currentCount}</p>
                        </div>
                        <div className="user-count-item review-item">
                            <h2><VscGraph /> Average Rating</h2>
                            <p>{avgRating}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
