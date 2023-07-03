import React, { useEffect, useState } from 'react';

const AgeComponent = () => {
    const [age, setAge] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const time =
                (new Date() - new Date(1068472800000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
            setAge(time.toString().substring(0, 13));
        }, 1);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div id="age">
            I am a {age} year-old fullstack developer with 4 years of experience.
            Transitioning into the security field, I have undertaken various projects
            to expand my expertise. Proficient in NodeJS, ReactJS, and EJS frameworks,
            I possess a strong foundation in frontend and backend technologies. My focus on
            security includes threat analysis, incident management, and vulnerability
            assessments.<br></br> Additionally, I have obtained the CCNA, Security+ and Network+
            certifications and actively participated in bug bounty programs. Committed to
            continuous learning, I strive to contribute to an organization's authentic
            growth by leveraging my skills in secure web application development and
            knowledge of cybersecurity frameworks.
        </div>
    );

};

export default AgeComponent;
