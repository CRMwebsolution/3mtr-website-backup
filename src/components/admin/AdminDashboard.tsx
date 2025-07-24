import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import TrailerManagement from './TrailerManagement';
import CalendarManagement from './CalendarManagement';
import MaintenanceSchedule from './MaintenanceSchedule';
import Analytics from './Analytics';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Admin Dashboard
      </h1>

      <Tabs defaultValue="trailers">
        <TabsList>
          <TabsTrigger value="trailers">Trailers</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="trailers">
          <TrailerManagement />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarManagement />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceSchedule />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}