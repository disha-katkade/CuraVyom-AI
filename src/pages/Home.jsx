import React from 'react';
import { Hero } from '../components/home/Hero';
import { ProblemSolution } from '../components/home/ProblemSolution';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSolution />
    </div>
  );
};

export default Home;
