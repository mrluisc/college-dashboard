import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d53e4f'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockData = {
          totalApplications: 307,
          uniqueStudents: 29,
          uniqueCountries: 14,
          ivyPlusPercentage: 37.9,
          applicationTypes: [
            { name: 'Common App', value: 222 },
            { name: 'UC Application', value: 45 },
            { name: 'UCAS', value: 12 },
            { name: 'Other Application', value: 18 },
            { name: 'Online App / Mail', value: 10 }
          ],
          geographicDistribution: [
            { name: 'United States', value: 267 },
            { name: 'United Kingdom', value: 14 },
            { name: 'Netherlands', value: 6 },
            { name: 'South Korea', value: 5 },
            { name: 'Singapore', value: 3 },
            { name: 'Canada', value: 3 },
            { name: 'Other', value: 9 }
          ],
          studentsByCountries: [
            { count: "1 Country", students: 21 },
            { count: "2 Countries", students: 4 },
            { count: "3 Countries", students: 2 },
            { count: "4+ Countries", students: 1 }
          ]
        };
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{data.totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Unique Students</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{data.uniqueStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Countries</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{data.uniqueCountries}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Ivy+ %</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{data.ivyPlusPercentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Application Types</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.applicationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.applicationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Geographic Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.geographicDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {data.geographicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Application Timeline</h3>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'Nov 2024', total: 71, early: 55, regular: 16 },
              { month: 'Dec 2024', total: 29, early: 7, regular: 22 },
              { month: 'Jan 2025', total: 106, early: 3, regular: 103 },
              { month: 'Feb 2025', total: 9, early: 0, regular: 9 },
              { month: 'Unknown', total: 76, early: 0, regular: 2 },
              { month: 'Oct 2024', total: 2, early: 1, regular: 1 },
              { month: 'Mar 2025', total: 1, early: 0, regular: 1 },
              { month: 'May 2025', total: 2, early: 0, regular: 2 },
              { month: 'Jul 2025', total: 11, early: 0, regular: 3 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#8884d8" 
                name="Total Applications" 
                dot={{ fill: '#8884d8' }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="early" 
                stroke="#82ca9d" 
                name="Early Applications"
                dot={{ fill: '#82ca9d' }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="regular" 
                stroke="#ffc658" 
                name="Regular Applications"
                dot={{ fill: '#ffc658' }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Application Volume by Institution</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'New York University', value: 11 },
                  { name: 'University of California-Berkeley', value: 10 },
                  { name: 'University of California-San Diego', value: 9 },
                  { name: 'Stanford University', value: 8 },
                  { name: 'University of California-Los Angeles', value: 7 }
                ]}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 12]} />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Early vs Regular Decision Strategy</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Stanford', early: 2, regular: 3 },
                { name: 'Columbia', early: 1, regular: 2 },
                { name: 'Harvard', early: 3, regular: 2 },
                { name: 'Yale', early: 0, regular: 1 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="early" stackId="a" fill="#8884d8" name="Early Applications" />
                <Bar dataKey="regular" stackId="a" fill="#82ca9d" name="Regular Applications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">University Applications by QS Ranking Tiers (2024-2025)</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tier 1 (Top 50)', value: 89, percentage: '31.4%' },
                    { name: 'Tier 2 (51-200)', value: 96 },
                    { name: 'Tier 3 (201-500)', value: 67 },
                    { name: 'Tier 4 (501+)', value: 42 },
                    { name: 'Unranked', value: 12 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percentage}) => percentage ? percentage : name}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">College Applications Dashboard</h1>
          <p className="mt-2 text-gray-600">Track and analyze college application data</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'timeline'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Timeline Analysis
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Strategic Insights
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'timeline' && renderTimeline()}
            {activeTab === 'analytics' && renderAnalytics()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
