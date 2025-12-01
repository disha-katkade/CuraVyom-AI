import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, Legend
} from 'recharts';


const trialData = [
  { month: 'Jan', trials: 4 },
  { month: 'Feb', trials: 7 },
  { month: 'Mar', trials: 5 },
  { month: 'Apr', trials: 12 },
  { month: 'May', trials: 18 },
  { month: 'Jun', trials: 25 },
];

const radarData = [
  { subject: 'Clinical', A: 120, fullMark: 150 },
  { subject: 'Patent', A: 98, fullMark: 150 },
  { subject: 'Market', A: 86, fullMark: 150 },
  { subject: 'Safety', A: 99, fullMark: 150 },
  { subject: 'Efficacy', A: 85, fullMark: 150 },
  { subject: 'Novelty', A: 65, fullMark: 150 },
];

const patentData = [
  { year: '2020', granted: 12, pending: 5 },
  { year: '2021', granted: 18, pending: 8 },
  { year: '2022', granted: 25, pending: 12 },
  { year: '2023', granted: 35, pending: 15 },
  { year: '2024', granted: 42, pending: 20 },
];

export const ClinicalChart = () => (
  <div className="w-full h-full min-h-[200px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={trialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTrials" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis dataKey="month" stroke="#ffffff50" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis stroke="#ffffff50" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
          itemStyle={{ color: '#00F2FF' }}
        />
        <Area type="monotone" dataKey="trials" stroke="#00F2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorTrials)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const ConfidenceRadar = ({ data }) => (
  <div className="w-full h-full min-h-[200px]">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data || radarData}>
        <PolarGrid stroke="#ffffff20" />
        <PolarAngleAxis dataKey="subject" stroke="#ffffff80" tick={{ fill: '#ffffff80', fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#ffffff20" tick={false} axisLine={false} />
        <Radar name="Score" dataKey="A" stroke="#39FF14" strokeWidth={2} fill="#39FF14" fillOpacity={0.2} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
          itemStyle={{ color: '#39FF14' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export const PatentBarChart = () => (
  <div className="w-full h-full min-h-[200px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={patentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis dataKey="year" stroke="#ffffff50" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis stroke="#ffffff50" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
          cursor={{ fill: '#ffffff05' }}
        />
        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
        <Bar dataKey="granted" fill="#00F2FF" name="Granted" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pending" fill="#39FF14" name="Pending" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
