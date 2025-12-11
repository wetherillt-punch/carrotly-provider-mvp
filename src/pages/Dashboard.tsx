import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderData } from '../hooks/useProviderData';
import { mockStats, mockBookings } from '../data/mockData';
import { Button } from '../components/common';
import { Eye, Calendar, Star, DollarSign, Bell, User, Edit, Plus, MessageSquare, Settings, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Mon', bookings: 18 },
  { day: 'Tue', bookings: 22 },
  { day: 'Wed', bookings: 25 },
  { day: 'Thu', bookings: 29 },
  { day: 'Fri', bookings: 28 },
  { day: 'Sat', bookings: 15 },
  { day: 'Sun', bookings: 12 },
];

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, change, subtitle, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-primary-50 text-primary-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className="text-green-600 text-sm font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { provider } = useProviderData();
  const stats = mockStats;
  const todaysBookings = mockBookings.slice(0, 3);

  if (!provider || !provider.practiceName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Carrotly!</h2>
          <p className="text-gray-600 mb-6">Get started by completing your provider profile</p>
          <Button variant="primary" onClick={() => navigate('/onboarding')}>
            Start Onboarding →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl">🥕</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Findr Health Provider Portal</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <User className="w-8 h-8 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{provider.practiceName}</p>
                  <p className="text-xs text-gray-600">Provider Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {provider.practiceName}! 👋
          </h2>
          <p className="text-primary-100">Your profile is live and receiving bookings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Eye}
            label="Profile Views Today"
            value={stats.views.today}
            change="+12%"
            subtitle="vs yesterday"
            color="primary"
          />
          <StatsCard
            icon={Calendar}
            label="Bookings Today"
            value={stats.bookings.today}
            change="+23%"
            subtitle="vs yesterday"
            color="green"
          />
          <StatsCard
            icon={Star}
            label="Rating"
            value={stats.rating.toFixed(1)}
            subtitle={`${stats.reviewCount} reviews`}
            color="purple"
          />
          <StatsCard
            icon={DollarSign}
            label="Revenue (MTD)"
            value={`$${stats.revenue.thisMonth.toLocaleString()}`}
            change="+18%"
            subtitle="vs last month"
            color="blue"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Today's Appointments</h3>
              <span className="text-sm text-gray-600">{mockBookings.length} total</span>
            </div>
            
            <div className="space-y-4">
              {todaysBookings.map(booking => (
                <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{booking.patientName}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-semibold text-gray-900">{booking.time}</p>
                    <p className="text-sm text-gray-600">{booking.duration} min</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
            
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
              View all appointments →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/preview')}
                className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">View Profile</p>
                  <p className="text-xs text-gray-600">See patient view</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Edit className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Edit Profile</p>
                  <p className="text-xs text-gray-600">Update information</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Add Service</p>
                  <p className="text-xs text-gray-600">New service offering</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 relative">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Reviews</p>
                  <p className="text-xs text-gray-600">2 new to respond</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Settings</p>
                  <p className="text-xs text-gray-600">Hours, availability</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Booking Trend Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Trends (Last 7 Days)</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#ff6b35" 
                strokeWidth={3}
                dot={{ fill: '#ff6b35', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};
