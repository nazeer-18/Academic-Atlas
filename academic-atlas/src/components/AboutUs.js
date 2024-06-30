import React, { useState, useEffect } from 'react';
import '../styles/AboutUs.css';
import DeveloperItem from './DeveloperItem';
import developerService from '../services/developerService';

export default function AboutUs() {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const response = await developerService.getDevelopers();
                console.log(response.data.developers);
                setDevelopers(response.data.developers);
            }
            catch (err) {
                console.log(err);
            }
        }
        getDevelopers();
    }, []);
    return (
        <div className="aboutus-page">
            <header className="hero-section">
                <h1>About Us</h1>
                <p>Discover how we make a difference in students academic lives.</p>
            </header>
            <div className="content">
                <section className="problems">
                    <h2>Problems Students Faced Before</h2>
                    <p>Before the advent of our website, AVV Chennai students faced significant hurdles in accessing past academic resources. They struggled with finding previous year's papers, course-related projects, and research works, which are essential for effective study and exam preparation. This lack of organized and easily accessible materials often resulted in increased stress and inefficient study methods. Our platform addresses these challenges by providing a centralized repository of valuable resources, fostering a more collaborative and supportive academic environment.</p>
                </section>
                <section className="solutions">
                    <h2>How Our Website Solves Those Problems</h2>
                    <p>Our website, Academic-Atlas, revolutionizes the way AVV Chennai students access and utilize academic resources. By centralizing past midterm and endterm papers, course-related projects, and research works, we eliminate the frustration of scattered information. With an intuitive interface, students can effortlessly find and contribute valuable materials, ensuring a continuous flow of knowledge. This not only enhances individual learning but also fosters a culture of collaboration, where students support each other by sharing insights and resources. Our platform transforms academic preparation into a streamlined and enriching experience</p>
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
                            <div className="review-card">
                                <h3>Student A</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"This website has been a game-changer for me..."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student B</h3>
                                <div className="rating">★★★★★</div>
                                <p>"I love how easy it is to find resources..."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student C</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"A fantastic platform for academic preparation."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student D</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"Highly recommend for all students."</p>
                            </div>
                            {/* Repeat reviews if needed to create the scrolling effect */}
                            <div className="review-card">
                                <h3>Student A</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"This website has been a game-changer for me..."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student B</h3>
                                <div className="rating">★★★★★</div>
                                <p>"I love how easy it is to find resources..."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student C</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"A fantastic platform for academic preparation."</p>
                            </div>
                            <div className="review-card">
                                <h3>Student D</h3>
                                <div className="rating">★★★★☆</div>
                                <p>"Highly recommend for all students."</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
