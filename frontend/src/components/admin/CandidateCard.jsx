// src/components/admin/CandidateCard.jsx
import React from 'react';
import Button from '../ui/Button';

export default function CandidateCard({ candidate }) {
  // Fallback data in case props are missing
  const { 
    name = "Unknown Candidate", 
    role = "Software Engineer", 
    experience = 0, 
    skills = ["React", "JavaScript", "Tailwind"], 
    avatarUrl 
  } = candidate || {};

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group">
      
      {/* Avatar with a subtle border */}
      <img 
        src={avatarUrl || `https://ui-avatars.com/api/?name=${name}&background=eff6ff&color=2563eb`} 
        alt={name} 
        className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Candidate Details */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{name}</h3>
        <p className="text-slate-500 font-medium mt-1">{role} • {experience} years experience</p>
        
        {/* Skills Badges */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full sm:w-auto mt-6 sm:mt-0">
        <Button variant="primary">View Profile</Button>
        <Button variant="secondary">Message</Button>
      </div>
      
    </div>
  );
}