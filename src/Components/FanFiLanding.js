import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiArrowRight, FiCheck, FiStar, FiAward, FiClock, FiUsers } from 'react-icons/fi';
import { FaEthereum, FaBitcoin } from 'react-icons/fa';
import { SiSolidity, SiBinance } from 'react-icons/si';
import LandingNavBar from './LandingNavBar';
import logo from '../assets/images/logo.png'
import img20 from '../assets/images/courses/20.png'
import img21 from '../assets/images/courses/21.png'
import img22 from '../assets/images/courses/22.png'
import img23 from '../assets/images/courses/23.png'
import img24 from '../assets/images/courses/24.png'
import img25 from '../assets/images/courses/25.png'
import img26 from '../assets/images/courses/26.png'
import img27 from '../assets/images/courses/27.png'
import { ToastContainer, toast } from 'react-toastify';
import vidya from '../assets/images/vidya.png'
import CancelIcon from '@mui/icons-material/Cancel';


const notifyCustom = (text,type) => toast(text,{
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  type:type
 
  });




  const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 0;
  width: 400px;
  height: 600px;
  border: none;
  z-index: 1000;
  color: #A87DD6;
  font-size: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

// Shows on desktop
const FullText = styled.b`
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Shows only on mobile
const MobileText = styled.b`
  display: none;
  
  margin-right:10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
`;
// Enhanced Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(138, 43, 226, 0); }
  100% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const particleMove = keyframes`
  0% { transform: translate(0, 0); opacity: 1; }
  100% { transform: translate(var(--move-x), var(--move-y)); opacity: 0; }
`;

const glitch = keyframes`
  0% { text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75); }
  14% { text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75); }
  15% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75); }
  49% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75); }
  50% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75); }
  99% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75); }
  100% { text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75); }
`;

const neon = keyframes`
  0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #8a2be2, 0 0 40px #8a2be2, 0 0 50px #8a2be2, 0 0 60px #8a2be2, 0 0 70px #8a2be2; }
  50% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #8a2be2, 0 0 20px #8a2be2, 0 0 25px #8a2be2, 0 0 30px #8a2be2, 0 0 35px #8a2be2; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background: #0a0416;
  color: #f8f8f8;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Section = styled.section`
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0416 0%, #1e0b36 50%, #0a0416 100%);
  background-size: 200% 200%;
  animation: ${gradient} 15s ease infinite;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 5.5rem;

  background: linear-gradient(90deg, #8a2be2,rgb(197, 208, 200),rgb(210, 192, 215),rgb(220, 220, 220));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
 
  background-size: 300% auto;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: #d8b4fe;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const AnimatedSubtitleBlock = styled.div`
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(138, 43, 226, 0) 0%,
      rgba(138, 43, 226, 0.1) 50%,
      rgba(138, 43, 226, 0) 100%
    );
    animation: ${shimmer} 8s infinite linear;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(138, 43, 226, 0.05) 0%,
      transparent 70%
    );
    animation: ${rotate} 20s linear infinite;
  }
`;

const SubtitleText = styled.p`
  font-size: 1.8rem;
  margin: 0;
  color: #d8b4fe;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const TechPillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
`;

const TechPill = styled.span`
  background: rgba(138, 43, 226, 0.2);
  color: #d8b4fe;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(138, 43, 226, 0.5);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    background: rgba(138, 43, 226, 0.4);
    color: white;
    transform: scale(1.05);
  }
`;


const CTAButton = styled.button`
  background: linear-gradient(90deg, 
    #8a2be2 0%, 
    #9b30ff 20%, 
    #6a0dad 40%, 
    #8a2be2 60%, 
    #9b30ff 80%, 
    #6a0dad 100%);
  background-size: 300% 300%;
  color: white;
  border: none;
  padding: 1.5rem 4rem;
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 
    0 5px 15px rgba(138, 43, 226, 0.4),
    0 0 20px rgba(138, 43, 226, 0.2) inset;
  margin-bottom: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  animation: ${gradient} 8s ease infinite, ${pulse} 3s ease infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 
      0 20px 40px rgba(138, 43, 226, 0.6),
      0 0 30px rgba(138, 43, 226, 0.3) inset;
    animation: ${gradient} 4s ease infinite, ${neon} 1.5s ease infinite alternate;
    
    &::after {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 
      0 2px 10px rgba(138, 43, 226, 0.6),
      0 0 20px rgba(138, 43, 226, 0.3) inset;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 55%
    );
    transform: rotate(45deg);
    animation: shimmer 5s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: all 0.6s ease;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 3rem;
    font-size: 10px;
  }
`;

const ArrowIconWrapper = styled.span`
  display: inline-block;
  transition: all 0.3s ease;
  
  ${CTAButton}:hover & {
    animation: ${float} 1s ease infinite, ${pulse} 1.5s ease infinite;
    transform: translateX(5px);
  }
`;

const FloatingIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 3rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    animation-play-state: paused;
  }
`;

const Icon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.7));

  ${IconWrapper}:hover & {
    animation: ${rotate} 2s linear infinite;
  }
`;

const IconLabel = styled.div`
  font-size: 1rem;
  color: #ba55d3;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  ${IconWrapper}:hover & {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  }
`;

const Particle = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size || '5px'};
  height: ${props => props.size || '5px'};
  border-radius: 50%;
  background: ${props => props.color || 'rgba(138, 43, 226, 0.7)'};
  animation: ${particleMove} ${props => props.duration} linear infinite;
  --move-x: ${props => props.moveX};
  --move-y: ${props => props.moveY};
  opacity: ${props => props.opacity || '0.7'};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ${pulse} 2s infinite;
    animation-delay: ${props => parseFloat(props.duration) * Math.random()}s;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #f8f8f8;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #8a2be2, #ba55d3, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CoursesSection = styled(Section)`
  background: linear-gradient(to bottom, rgba(10, 4, 22, 0.9), rgba(30, 11, 54, 0.6));
  position: relative;
  overflow: hidden;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CourseCard = styled.div`
  background: rgba(30, 11, 54, 0.7);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(138, 43, 226, 0.3);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(138, 43, 226, 0.3);
    border-color: rgba(138, 43, 226, 0.8);
  }
`;

const CourseImage = styled.div`
  height: 200px;


  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  filter: brightness(0.9);
  transition: all 0.3s ease;

  ${CourseCard}:hover & {
    filter: brightness(1.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,0,0,0.2), transparent);
  }
`;

const CourseBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 2;
`;

const CourseContent = styled.div`
  padding: 1.8rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #f8f8f8;
  font-weight: 600;
`;

const CourseDescription = styled.p`
  color: #d8b4fe;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  min-height: 4.5rem;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  color: #ba55d3;
  font-size: 0.9rem;
`;

const CourseStats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
`;

const CourseButton = styled.button`
  background: linear-gradient(90deg, rgba(138, 43, 226, 0.3), rgba(106, 13, 173, 0.3));
  color: #d8b4fe;
  border: 1px solid rgba(138, 43, 226, 0.7);
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(90deg, rgba(138, 43, 226, 0.5), rgba(106, 13, 173, 0.5));
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;

const LiveIndicator = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff0000;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 2;
  animation: ${pulse} 2s infinite;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    margin-right: 5px;
  }
`;

const InstructorsSection = styled(Section)`
  background: linear-gradient(to bottom, rgba(30, 11, 54, 0.6), rgba(10, 4, 22, 0.9));
  position: relative;
  overflow: hidden;
`;

const InstructorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const InstructorCard = styled.div`
  background: rgba(30, 11, 54, 0.7);
  border-radius: 15px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(138, 43, 226, 0.3);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.2);
    border-color: rgba(138, 43, 226, 0.8);
  }
`;

const InstructorAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.color || '#6a0dad'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin: 0 auto 1.5rem;
  position: relative;
  overflow: hidden;
  border: 3px solid rgba(138, 43, 226, 0.5);
  transition: all 0.3s ease;

  ${InstructorCard}:hover & {
    transform: scale(1.1);
    border-color: rgba(138, 43, 226, 0.8);
  }

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    border: 2px solid rgba(138, 43, 226, 0.5);
    animation: ${pulse} 2s infinite;
  }
`;

const InstructorName = styled.h3`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  color: #f8f8f8;
  font-weight: 700;
`;

const InstructorTitle = styled.p`
  color: #ba55d3;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InstructorBio = styled.p`
  color: #d8b4fe;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  color: #d8b4fe;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);

  &:hover {
    color: #8a2be2;
    transform: translateY(-3px);
    background: rgba(138, 43, 226, 0.4);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;
const WhySection = styled(Section)`
  background: linear-gradient(to bottom, rgba(10, 4, 22, 0.9), rgba(30, 11, 54, 0.6));
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 3rem 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  max-width: 1100px;
  margin: 1.5rem auto 0;
  position: relative;
  z-index: 2;
`;

const FeatureCard = styled.div`
  background: rgba(30, 11, 54, 0.7);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 10px;
  padding: 1.2rem;
  transition: all 0.2s ease;
  text-align: center;
  position: relative;
  backdrop-filter: blur(4px);
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;

const FeatureNumber = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #8a2be2, #6a0dad);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.8rem;
  color: #ba55d3;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #f8f8f8;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #d8b4fe;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FAQSection = styled(Section)`
  background: linear-gradient(to bottom, rgba(30, 11, 54, 0.6), rgba(10, 4, 22, 0.9));
  position: relative;
  overflow: hidden;
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(30, 11, 54, 0.7);
  border: 1px solid rgba(138, 43, 226, 0.3);
  transition: all 0.3s ease;
  z-index: 2;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(138, 43, 226, 0.7);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.8rem;
  text-align: left;
  background: none;
  border: none;
  color: #f8f8f8;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(138, 43, 226, 0.1);
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => (props.isActive ? '0 1.8rem 1.8rem' : '0 1.8rem')};
  max-height: ${props => (props.isActive ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #d8b4fe;
  line-height: 1.8;
  border-top: ${props => (props.isActive ? '1px solid rgba(138, 43, 226, 0.2)' : 'none')};
  font-size: 1.1rem;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: ${props => (props.isActive ? 'rotate(180deg)' : 'rotate(0)')};
  color: #ba55d3;
  font-size: 1.5rem;
`;

const Footer = styled.footer`
  background: linear-gradient(to bottom, #0a0416, #1e0b36);
  padding: 5rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
  text-align: left;
`;

const FooterColumn = styled.div`
  h3 {
    color: #f8f8f8;
    margin-bottom: 1.8rem;
    font-size: 1.3rem;
    position: relative;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #8a2be2, transparent);
    }
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #d8b4fe;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: #8a2be2;
    transform: translateX(5px);
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(138, 43, 226, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const SocialIcon = styled.a`
  color: #d8b4fe;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
  
  &:hover {
    color: #8a2be2;
    transform: translateY(-5px);
    background: rgba(138, 43, 226, 0.4);
    box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
  }
`;

const Copyright = styled.p`
  color: #9370db;
  font-size: 1rem;
  margin-bottom: 0;
`;

const BlockchainNetwork = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.1;
  pointer-events: none;
`;

const NetworkNode = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(138, 43, 226, 0.7);
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.7);
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 50px;
    background: rgba(138, 43, 226, 0.5);
    top: 8px;
    left: 3px;
  }
`;

const NetworkConnection = styled.div`
  position: absolute;
  height: 2px;
  background: rgba(138, 43, 226, 0.3);
  transform-origin: left center;
`;

const StatsSection = styled(Section)`
  background: linear-gradient(to bottom, rgba(30, 11, 54, 0.7), rgba(10, 4, 22, 0.9));
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  background: rgba(30, 11, 54, 0.6);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
  transition: all 0.3s ease;
  z-index: 2;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(138, 43, 226, 0.2);
    border-color: rgba(138, 43, 226, 0.7);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #8a2be2;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #8a2be2, #ba55d3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #d8b4fe;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TokenShowcase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const TokenIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.2);
    filter: drop-shadow(0 0 10px ${props => props.color});
  }
`;

const VidyaVerseLanding = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [networkNodes, setNetworkNodes] = useState([]);
  const [networkConnections, setNetworkConnections] = useState([]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Generate blockchain network visualization
  useEffect(() => {
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < 15; i++) {
      nodes.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      });
    }
    
    // Create connections between some nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Only connect some nodes randomly
        if (Math.random() > 0.7) {
          const node1 = nodes[i];
          const node2 = nodes[j];
          
          // Calculate distance and angle between nodes
          const dx = parseFloat(node2.left) - parseFloat(node1.left);
          const dy = parseFloat(node2.top) - parseFloat(node1.top);
          const distance = Math.sqrt(dx * dx + dy * dy) * 0.8; // Scale factor
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          connections.push({
            id: `${i}-${j}`,
            left: node1.left,
            top: node1.top,
            width: `${distance}%`,
            angle: angle
          });
        }
      }
    }
    
    setNetworkNodes(nodes);
    setNetworkConnections(connections);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Basics of Blockchain & Web3",
      description: "Learn the fundamentals of Blockchain and Web3 from the ground up",
      category: "Web3",
      duration: "8 weeks",
      level: "Beginner",
      students: "1.2k",
      rating: "4.9",
      color: "#6a0dad",
      live: true,
      image : img20
    },
    {
      id: 2,
      title: "Web3 Development from scratch",
      description: "Learn to build decentralized applications on Ethereum and other blockchains from the ground up.",
      category: "Web3",
      duration: "8 weeks",
      level: "Beginner",
      students: "1.2k",
      rating: "4.9",
      color: "#6a0dad",
      live: true,
      image : img21
    },
    {
      id: 3,
      title: "Web3 Development Advanced",
      description: "Dive deep into DeFi with hands-on projects and real-world applications.",
      category: "Web3",
      duration: "8 weeks",
      level: "Beginner",
      students: "1.2k",
      rating: "4.9",
      color: "#6a0dad",
      live: false,
      image : img22
    },
    {
      id: 3,
      title: "Basics of Crypto Trading",
      description: "Master altcoins and meme coins while learning powerful trading strategies for maximum impact.",
      category: "Trading",
      duration: "6 weeks",
      level: "Advanced",
      students: "2.3k",
      rating: "4.7",
      color: "#ba55d3",
      live: true,
      image : img23,

    },
    {
      id: 4,
      title: "Advanced Crypto Trading Strategies",
      description: "Master advanced technical analysis, algorithmic trading, and risk management in volatile crypto markets.",
      category: "Trading",
      duration: "6 weeks",
      level: "Advanced",
      students: "2.3k",
      rating: "4.7",
      color: "#ba55d3",
      live: false,
      image : img24
    },
    {
      id: 5,
      title: "Generative AI Fundamentals",
      description: "Learn the core concepts and tools behind Generative AI, LLM from text and image generation to real-world applications.",
      category: "AI",
      duration: "10 weeks",
      level: "Intermediate",
      students: "850",
      rating: "4.8",
      color: "#8a2be2",
      live: false,
      image : img25
    },
    
    {
      id: 6,
      title: "Blockchain Security & Auditing",
      description: "Learn how to secure smart contracts and perform security audits for major DeFi protocols.",
      category: "Security",
      duration: "8 weeks",
      level: "Intermediate",
      students: "1.5k",
      rating: "4.9",
      color: "#9370db",
      live: false,
      image : img26
    },
    {
      id: 5,
      title: "NFT & Metaverse Development",
      description: "Create, mint, and sell NFTs while exploring metaverse development with Unity and Web3.",
      category: "Web3",
      duration: "6 weeks",
      level: "Beginner",
      students: "3.1k",
      rating: "4.8",
      color: "#8a2be2",
      live: false,
      image : img27
    },
    
  ];

  const instructors = [
    {
      id: 1,
      name: "Mr. Pranav Verma",
      initials: "PV",
      title: "Blockchain Developer & Researcher",
      bio: "Founder at FanFi & ConnectVerse, Ex-DevRel Engineer at Router Protocol , IIT Patna",
      color: "#8a2be2",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Prof. Raj Patel",
      initials: "RP",
      title: "AI Researcher",
      bio: "PhD in Machine Learning from Stanford with specialization in decentralized AI applications and models.",
      color: "#ba55d3",
      social: {
        twitter: "#",
        medium: "#",
        youtube: "#"
      }
    },
    {
      id: 3,
      name: "Mr. Rohit Kumar",
      initials: "RK",
      title: "Crypto Trader",
      bio: "Professional trader with 8 years of experience in crypto markets and quantitative trading strategies.",
      color: "#9370db",
      social: {
        twitter: "#",
        discord: "#",
        youtube: "#"
      }
    },
    {
      id: 4,
      name: "Mr. Marcus Wong",
      initials: "MW",
      title: "Security Expert",
      bio: "White-hat hacker who has audited over 300 smart contracts for major DeFi projects and protocols.",
      color: "#6a0dad",
      social: {
        github: "#",
        twitter: "#",
        medium: "#"
      }
    }
  ];

  const features = [
    {
      icon: "",
      title: "Live Courses by Experts",
      description:
        "All sessions on VidyaVerse are conducted live by industry professionals, IITians, and global experts from places like Stanford. Get real-time interaction, instant doubt-solving, and practical insights from those who’ve built in the space."
    },
    {
      icon: "",
      title: "Learn-to-Earn Model",
      description:
        "VidyaVerse is built on the philosophy that learning should pay off — literally. Earn rewards in VV tokens, crypto bounties, or even internship offers while you build real skills through courses and bootcamps."
    },
    {
      icon: "",
      title: "Blockchain-Powered Certifications",
      description:
        "Each course completion grants you a blockchain-verified certificate or NFT that’s impossible to fake — a powerful asset for your portfolio and job applications."
    },
    {
      icon: "",
      title: "Bounties, Jobs & Internships",
      description:
        "We don’t just teach you. We help you work. Access real-world bounties, projects, and hiring opportunities from Web3 startups, protocols, and DAOs — all while learning."
    },
    {
      icon: "",
      title: "Beginner-Friendly & Advanced Tracks",
      description:
        "Whether you’re a curious beginner or an experienced developer, VidyaVerse offers tailored tracks for every level. No prior experience needed — just curiosity and commitment."
    },
    {
      icon: "",
      title: "Global Web3 Community",
      description:
        "You're never learning alone. Join a global network of learners, developers, mentors, and contributors building the future of the decentralized web together inside our DAO-powered community."
    },
    {
      icon: "",
      title: "Recorded Access for Flexibility",
      description:
        "Missed a session? No problem. All live classes are recorded and uploaded to your dashboard for flexible, on-demand learning — anytime, anywhere."
    },
    {
      icon: "",
      title: "Hands-On Web3 Projects",
      description:
        "Learn by building. Each course includes practical exercises and real blockchain interactions — from writing smart contracts to launching dApps and testing live protocols."
    },
    {
      icon: "",
      title: "AI-Personalized Learning",
      description:
        "Our in-built AI tailors your learning journey based on your goals and engagement, suggesting the most relevant courses, bounties, and challenges as you progress."
    },
    {
      icon: "",
      title: "Lifetime Access & Free Updates",
      description:
        "One-time enrollment gives you lifetime access to the course, future content updates, live mentorship sessions, and all newly added resources — forever."
    },
    {
      icon: "",
      title: "Hackathons & IRL Events",
      description:
        "Beyond the screen, VidyaVerse brings people together at physical hackathons, bootcamps, and community meetups. Build with your peers and grow your network in real time."
    },
    {
      icon: "",
      title: "Real-Time Doubt Support",
      description:
        "Stuck during class or on an assignment? Get instant help from instructors or peers in live chat, breakout rooms, or community forums — support is always just a message away."
    },
    {
      icon: "",
      title: "Project-Based Evaluation",
      description:
        "No boring exams. You’ll be evaluated based on real projects, team collaborations, and how well you apply your knowledge to real-world problems — just like the real tech world."
    },
    {
      icon: "",
      title: "Job Referrals & Hiring Events",
      description:
        "We don’t just talk about job-readiness — we prove it. VidyaVerse connects learners with hiring partners, hosts virtual and physical hiring events, and offers internal job referrals for top performers."
    },
    {
      icon: "",
      title: "Mentorship from Builders",
      description:
        "Get access to exclusive mentorship from builders who’ve launched Web3 protocols, scaled AI startups, or led DeFi projects — guiding you beyond just the classroom."
    }
  ];
  

  const faqs = [
    {
      question: "What is VidyaVerse?",
      answer: "VidyaVerse is a live learning platform designed to prepare individuals for the future of technology. We focus on in-demand fields like Web3, blockchain, crypto trading, AI, and more. But it’s more than just learning — it’s a learn-to-earn platform where learners get access to real opportunities like bounties, internships, and job placements while they're still learning. Think of it as a launchpad that combines high-quality education with real-world outcomes."
    },
    {
      question: "Do I need crypto experience to use VidyaVerse?",
      answer: "Not at all! VidyaVerse is designed for everyone from complete beginners to advanced users. We have introductory courses that explain blockchain concepts in simple terms, and our platform is designed to be intuitive regardless of your technical background. Our AI assistant will guide you through any crypto-related processes."
    },
    {
      question: "Who are the instructors?",
      answer: "All our courses are taught by real-world experts, including engineers from top companies, researchers and professionals from institutions like IIT & Stanford. These mentors bring years of experience from working on real projects in the tech space, which makes the learning deeply practical, insightful, and relevant to today’s fast-changing world."
    },
    {
      question: "What topics can I learn on VidyaVerse?",
      answer: "VidyaVerse offers a diverse set of live courses across multiple future-forward domains. You can dive into blockchain development, explore crypto trading strategies, learn about AI and machine learning, or build your first smart contract. We also cover NFT creation, DAOs, tokenomics, and more — making sure you’re fully equipped for the decentralized future."
    },
    {
      question: "What is 'Learn to Earn'?",
      answer: "At VidyaVerse, we believe education should not be a one-way street. That’s why we reward learning. As you attend live courses, complete challenges, or participate in bootcamps, you also get access to bounties, hackathons, and real gigs from startups and Web3 companies. These not only pay you but also build your portfolio while you’re still learning."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, every learner receives a blockchain-verified certificate upon successfully completing a course. These certificates are shareable on LinkedIn and other platforms and are verifiable proof that you’ve gained real, industry-relevant skills."
    },
    {
      question: "Is prior experience required to enroll?",
      answer: "Not at all. Whether you're just starting out or already working in tech, our live courses are designed for all levels. We provide beginner-friendly programs to help you get started and also offer advanced bootcamps for those looking to go deeper or make a career switch."
    },
    {
      question: "How does the bounty system work?",
      answer: "Once you’ve gained some skills through our courses, you can take part in real-world bounties — small freelance-like tasks or challenges issued by Web3 protocols and startups. These tasks are paid, and help you gain experience while earning crypto or fiat rewards. It’s a great way to build a portfolio while still in the learning phase."
    },
    {
      question: "Is there a community or support group?",
      answer: "Yes! Community is at the heart of VidyaVerse. When you join a course, you also gain access to our active Discord or Telegram groups where you can ask questions, connect with peers, get support from mentors, and even collaborate on side projects or bounties together."
    },
    {
      question: "How do I enroll in a course?",
      answer: "Enrollment is simple. Just head over to our Courses page, pick the program you’re interested in, and click “Enroll Now.” You’ll get confirmation details along with access to any pre-course materials before the program starts."
    },
    
    
    
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Active Learners"
    },
    {
      number: "50+",
      label: "Expert Instructors"
    },
    {
      number: "100+",
      label: "Courses Available"
    },
    {
      number: "1M+",
      label: "VV Tokens Earned"
    }
  ];

  const tokens = [
    {
      name: "Ethereum",
      icon: <FaEthereum />,
      color: "#627EEA"
    },
    {
      name: "Bitcoin",
      icon: <FaBitcoin />,
      color: "#F7931A"
    },
    {
      name: "Binance",
      icon: <SiBinance />,
      color: "#F3BA2F"
    },
    {
      name: "Polygon",
      icon: <SiSolidity />,
      color: "#8247E5"
    },
    {
      name: "VV Token",
      icon: "VV",
      color: "#8a2be2"
    }
  ];

  // Generate random particles for hero section
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    moveX: `${(Math.random() - 0.5) * 300}px`,
    moveY: `${(Math.random() - 0.5) * 300}px`,
    duration: `${10 + Math.random() * 15}s`,
    size: `${3 + Math.random() * 7}px`,
    opacity: `${0.3 + Math.random() * 0.7}`,
    color: `rgba(${Math.floor(Math.random() * 50 + 150)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 100 + 150)}, ${0.5 + Math.random() * 0.5})`
  }));

  const [chatbot,setChatbot] = useState(false)

  return (
    <div>

     
    <Container>
    <LandingNavBar />
     
      {/* Hero Section */}
      <HeroSection>
        {/* Floating particles */}
        {particles.map(particle => (
          <Particle
            key={particle.id}
            top={particle.top}
            left={particle.left}
            moveX={particle.moveX}
            moveY={particle.moveY}
            duration={particle.duration}
            size={particle.size}
            opacity={particle.opacity}
            color={particle.color}
          />
        ))}
        
        <HeroContent>
        
          <Title>VidyaVerse</Title>
          <AnimatedSubtitleBlock>
  <SubtitleText>
  Dive into the world of Web3 & AI in our immersive platform.
  </SubtitleText>
  <TechPillContainer>
    <TechPill delay="0s">Ethereum</TechPill>
    <TechPill delay="0.2s">Solidity</TechPill>
    <TechPill delay="0.4s">NFTs</TechPill>
    <TechPill delay="0.6s">DeFi</TechPill>
    <TechPill delay="0.8s">AI</TechPill>
    <TechPill delay="1s">Trading</TechPill>
  </TechPillContainer>
</AnimatedSubtitleBlock>
<CTAButton>
  Start Learning <ArrowIconWrapper><FiArrowRight /></ArrowIconWrapper>
</CTAButton>
          
          
        </HeroContent>
      </HeroSection>



      {/* Courses Section */}
      <CoursesSection>
        <BlockchainNetwork>
          {networkConnections.map(conn => (
            <NetworkConnection 
              key={conn.id}
              style={{
                left: conn.left,
                top: conn.top,
                width: conn.width,
                transform: `rotate(${conn.angle}deg)`
              }}
            />
          ))}
          {networkNodes.map(node => (
            <NetworkNode 
              key={node.id}
              style={{
                left: node.left,
                top: node.top
              }}
            />
          ))}
        </BlockchainNetwork>
        
        <SectionTitle id="popular-courses">Popular Live Courses</SectionTitle>
        <CoursesGrid>
          {courses.map(course => (
            <CourseCard key={course.id}>
              {course.live && (
                <LiveIndicator>Live</LiveIndicator>
              )}
              <CourseImage color={course.color}>
               <img src={course.image} alt={course.title} style={{width:'100%',height:'100%'}} />
                <CourseBadge>
                  <FiStar /> {course.rating}
                </CourseBadge>
              </CourseImage>
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseMeta>
                  <CourseStats>
                    {course.live && <StatItem>
                     
                      <FiUsers /> {course.students}
                    </StatItem>
                   }
                    
                   
                  </CourseStats>
                 {course.live && <CourseButton style={{backgroundColor:'#660DA5',color:'white'}}>
                    Enroll Now <FiArrowRight />
                  </CourseButton>}

                  {!course.live && <CourseButton>
                    Coming Soon
                  </CourseButton>}
                </CourseMeta>
              </CourseContent>
            </CourseCard>
          ))}
        </CoursesGrid>
      </CoursesSection>

     

      {/* Why VidyaVerse Section */}
      <WhySection id="features">
  <SectionTitle>Why Choose VidyaVerse?</SectionTitle>
  <FeaturesGrid>
    {features.map((feature, index) => (
      <FeatureCard key={index}>
        <FeatureNumber>{index + 1}</FeatureNumber>
        <FeatureIcon>{feature.icon}</FeatureIcon>
        <FeatureTitle>{feature.title}</FeatureTitle>
        <FeatureDescription>{feature.description}</FeatureDescription>
      </FeatureCard>
    ))}
  </FeaturesGrid>
</WhySection>

      {/* Instructors Section */}
      <InstructorsSection id="instructors">
        <BlockchainNetwork>
          {networkConnections.map(conn => (
            <NetworkConnection 
              key={conn.id}
              style={{
                left: conn.left,
                top: conn.top,
                width: conn.width,
                transform: `rotate(${conn.angle}deg)`
              }}
            />
          ))}
          {networkNodes.map(node => (
            <NetworkNode 
              key={node.id}
              style={{
                left: node.left,
                top: node.top
              }}
            />
          ))}
        </BlockchainNetwork>
        
        <SectionTitle>Our Expert Instructors</SectionTitle>
        <InstructorsGrid>
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id}>
              <InstructorAvatar color={instructor.color}>
                {instructor.initials}
              </InstructorAvatar>
              <InstructorName>{instructor.name}</InstructorName>
              <InstructorTitle>{instructor.title}</InstructorTitle>
              <InstructorBio>{instructor.bio}</InstructorBio>
              
            </InstructorCard>
          ))}
        </InstructorsGrid>
      </InstructorsSection>

      {/* FAQ Section */}
      <FAQSection id="faq">
        <BlockchainNetwork>
          {networkConnections.map(conn => (
            <NetworkConnection 
              key={conn.id}
              style={{
                left: conn.left,
                top: conn.top,
                width: conn.width,
                transform: `rotate(${conn.angle}deg)`
              }}
            />
          ))}
          {networkNodes.map(node => (
            <NetworkNode 
              key={node.id}
              style={{
                left: node.left,
                top: node.top
              }}
            />
          ))}
        </BlockchainNetwork>
        
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                {faq.question}
                <ArrowIcon isActive={activeFAQ === index}>▼</ArrowIcon>
              </FAQQuestion>
              <FAQAnswer isActive={activeFAQ === index}>
                {faq.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </FAQSection>

       {/* Stats Section */}
       <StatsSection id="community">
        <SectionTitle>Join Our Growing Community</SectionTitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <TokenShowcase>
          {tokens.map((token, index) => (
            <TokenIcon key={index} color={token.color}>
              {token.icon}
            </TokenIcon>
          ))}
        </TokenShowcase>
      </StatsSection>


      {/* Footer */}
      <Footer>
        <BlockchainNetwork>
          {networkConnections.map(conn => (
            <NetworkConnection 
              key={conn.id}
              style={{
                left: conn.left,
                top: conn.top,
                width: conn.width,
                transform: `rotate(${conn.angle}deg)`
              }}
            />
          ))}
          {networkNodes.map(node => (
            <NetworkNode 
              key={node.id}
              style={{
                left: node.left,
                top: node.top
              }}
            />
          ))}
        </BlockchainNetwork>
        
        <FooterContent>
          <FooterColumn>
            <h3>VidyaVerse</h3>
            <p style={{ color: '#d8b4fe', lineHeight: '1.6', fontSize: '1rem' }}>
              The premier Web3 education platform bridging the gap between traditional learning and the decentralized future. Empowering learners with blockchain credentials and learn-to-earn opportunities.
            </p>
          </FooterColumn>
          
          <FooterColumn>
            <h3>Quick Links</h3>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="#popular-courses">Courses</FooterLink>
            <FooterLink href="#instructors">Instructors</FooterLink>
            <FooterLink onClick={()=>notifyCustom("Click on Enroll Now to know the pricing","default")}>Pricing</FooterLink>
            <FooterLink href="#faq">Blog</FooterLink>
            <FooterLink onClick={()=>notifyCustom("Coming Soon","default")}>DAO Governance</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <h3>Categories</h3>
            <FooterLink href="#popular-courses">Web3 Development</FooterLink>
            <FooterLink href="#popular-courses">AI & Machine Learning</FooterLink>
            <FooterLink href="#popular-courses">Crypto Trading</FooterLink>
            <FooterLink href="#popular-courses">Blockchain Security</FooterLink>
            <FooterLink href="#popular-courses">NFT & Metaverse</FooterLink>
            <FooterLink href="#popular-courses">DeFi & Smart Contracts</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <h3>Support</h3>
            <FooterLink onClick={()=>notifyCustom("Coming Soon","default")}>Help Center</FooterLink>
            <FooterLink href="mailto:connectversesp@gmail.com"> Contact Us</FooterLink>
            <FooterLink onClick={()=>notifyCustom("Coming Soon","default")}>Privacy Policy</FooterLink>
            <FooterLink onClick={()=>notifyCustom("Coming Soon","default")}>Terms of Service</FooterLink>
            <FooterLink href="#FAQ">FAQ</FooterLink>
            <FooterLink onClick={()=>notifyCustom("Coming Soon","default")}>Tokenomics</FooterLink>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
         
          
          <Copyright>
            © {new Date().getFullYear()} VidyaVerse. All rights reserved. Powered by Web3.
          </Copyright>
        </FooterBottom>
      </Footer>
      {!chatbot &&  <Wrapper style={{cursor:'pointer',width:'100px',height:'100px'}} onClick={()=>{
        setChatbot(true)
      }}>
      <Inner>
        <FullText style={{color:'linear-gradient(90deg, #8a2be2,rgb(197, 208, 200),rgb(210, 192, 215),rgb(220, 220, 220));',fontFamily:'poppins'}}>Vidya AI</FullText>
        <MobileText style={{color:'linear-gradient(90deg, #8a2be2,rgb(197, 208, 200),rgb(210, 192, 215),rgb(220, 220, 220));',fontFamily:'poppins'}}>Vidya AI</MobileText>
        <Avatar src={vidya} alt="Vidya" />
      </Inner>
    </Wrapper>}
     
      {chatbot &&  <div style={{
      position: 'fixed',
      bottom: '0',
      right: '0',
      width: '400px',
      height: '600px',
      border: 'none',
      zIndex: 1000,
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-end',
      justifyContent:'flex-end'
    }}>
      <CancelIcon style={{color:'white', position: 'fixed',cursor:'pointer',
      bottom: '600px',
      right: '10px',}} onClick={()=>{
        setChatbot(false)
      }}/>
     
      
      <iframe style={{
      position: 'fixed',
      bottom: '0',
      right: '0',
      width: '320px',
      height: '600px',
      border: 'none',
      zIndex: 1000}}
    src="https://www.chatbase.co/chatbot-iframe/auLUlwwnIQMP_CXFckdRn"
    
    
    frameborder="2"
></iframe>

</div>}
     
    </Container>
    <ToastContainer style={{zIndex:'99999999999'}}/>
    </div>

  );
};

export default VidyaVerseLanding;