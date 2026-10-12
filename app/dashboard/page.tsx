'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EmployeeFilters } from '@/components/dashboard/EmployeeFilters';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { attendanceService } from '@/services/attendanceService';
import { DashboardStats as StatsType, Employee } from '@/types';
import { mockDashboardStats } from '@/data/mock/dashboard';

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsType>(mockDashboardStats);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [position, setPosition] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [duration, setDuration] = useState<string>('all');

  // Filter options
  const [positionOptions, setPositionOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [durationOptions, setDurationOptions] = useState<string[]>([]);

  // Load filter options on mount
  useEffect(() => {
    async function loadOptions() {
      try {
        const opts = await attendanceService.getFilterOptions();
        setPositionOptions(opts.positions);
        setLocationOptions(opts.locations);
        setDurationOptions(opts.durations);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    }
    loadOptions();
  }, []);

  // Fetch stats and filtered employees
  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        const [statsData, employeesData] = await Promise.all([
          attendanceService.getDashboardStats(),
          attendanceService.getEmployees({
            searchQuery,
            position,
            location,
            duration,
          }),
        ]);
        if (!isCancelled) {
          setStats(statsData);
          setEmployees(employeesData);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load dashboard data:', err);
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [searchQuery, position, location, duration]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPosition('all');
    setLocation('all');
    setDuration('all');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Top Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Асосий Дашборд
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Ходимларнинг кечки йўриқнома бўйича жойлашуви ва оператив давомати
            </p>
          </div>
        </div>

        {/* 1. Statistics Cards */}
        <DashboardStats stats={stats} isLoading={isLoading && employees.length === 0} />

        {/* 2. Search & Filters */}
        <EmployeeFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          position={position}
          onPositionChange={setPosition}
          location={location}
          onLocationChange={setLocation}
          duration={duration}
          onDurationChange={setDuration}
          onReset={handleResetFilters}
          positionOptions={positionOptions}
          locationOptions={locationOptions}
          durationOptions={durationOptions}
          totalResults={employees.length}
        />

        {/* 3. Employee Attendance Table */}
        <EmployeeTable employees={employees} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
}
