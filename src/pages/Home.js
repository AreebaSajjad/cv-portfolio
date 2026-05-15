import React from 'react';
import Hero from '../components/Hero';
import { About, Skills, Education, Contact } from '../components/Sections';
import TechNewsFeed from '../components/TechNewsFeed';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Education />
      <TechNewsFeed />
      <Contact />
      <Footer />
    </>
  );
}
