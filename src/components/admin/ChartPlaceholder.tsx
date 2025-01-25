import React from 'react';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
    import { AdminAnalytics } from '@/types/admin';

    interface ChartPlaceholderProps {
      type: 'line' | 'bar' | 'pie';
      data?: AdminAnalytics['top_products'] | AdminAnalytics['sales_by_category'];
    }

    export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ type, data }) => {
      const chartData = data?.map((item, index) => ({
        name: item.name || item.product_id,
        sales: item.total_sales,
      })) || [];

      const pieChartData = data?.map((item, index) => ({
        name: item.name || item.product_id,
        value: item.total_sales,
      })) || [];

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

      if (type === 'line') {
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#777A55" />
            </LineChart>
          </ResponsiveContainer>
        );
      }

      if (type === 'bar') {
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#777A55" />
            </BarChart>
          </ResponsiveContainer>
        );
      }

      if (type === 'pie') {
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      }

      return (
        <div className="h-48 flex items-center justify-center text-gray-400 border-dashed border-2 border-gray-300 rounded-md">
          {type} Chart Placeholder
        </div>
      );
    };
