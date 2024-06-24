import React, { useState } from 'react';
import '../styles/Faq.css';

export default function Faq() {
    const faqData = [
        {
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces."
        },
        {
            question: "Why use React?",
            answer: "React allows developers to create large web applications that can change data, without reloading the page."
        },
        {
            question: "How do you use React?",
            answer: "You can use React by creating components and composing them to build complex UIs."
        }
        
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-page">
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
