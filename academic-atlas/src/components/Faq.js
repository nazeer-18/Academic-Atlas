import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Faq.css';

export default function Faq() {
    const faqData = [
        {
            question: "1. How do I log in to the portal? ",
            answer: <>To log in, for amrita students it is prefered to use your university mail, while others could use their personal mails. If you encounter any issues, please do <Link className='report-link'to="/contactus">contact</Link> us.</>
        },
        
        {
            question: "2. How can I search for specific midterm or endterm papers?",
            answer: <>You can search for specific midterm or endterm papers by selecting your course and the academic year. Use the search function in the relevant section for quick access.(Note: You are always requested to go through the <Link className='report-link'to="/curriculum">curriculum</Link> for the course codes of subjects to get more clarity)</>
        },
        {
            question: "3. How can I view my branch curriculum?",
            answer: <>you can visit <Link className='report-link'to="/curriculum">curriculum</Link> page on the website and you will be redirected to our university official website.There you can go as follows: Engineering -> B.Tech -> Your branch -> your year of regulation.</>
        },
        {
            question: "4. What types of projects and research works can I share?",
            answer: "Firstly, for contributing you should be logged in using university mail, as such you can share any projects or research works that are related to your courses and academics. This helps future students learn from your contributions.Please make sure that for the project contributions you must deployed the project in github because you need to provide the github link for the project."
        },
        {
            question: "5. What should I do if I find incorrect or outdated information?",
            answer: <>If you find any incorrect or outdated information, please <Link className='report-link'to="/contactus">report</Link> it to us so it can be corrected promptly.</>     
        },
        {
            question: "6. How do user roles and permissions work?",
            answer: "Students can access and contribute academic resources, while administrators manage the course catalog and maintain the repository of academic materials."
        },
        {
            question: "7. Who can access the uploaded academic resources?",
            answer: "Accesing resources is open to all users, but only amrita students can contribute to the repository."
        },
        
        
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="Faq-page">
            <h1>FAQ's</h1>
            <div className="faq-container">
                {faqData.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAccordion(index)}>
                            <h3>{item.question}</h3>
                            <span className={`faq-icon ${activeIndex === index ? 'open' : ''}`}></span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
