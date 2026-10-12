import { DashboardStats, Employee, EmployeeFilter } from '@/types';
import { mockDashboardStats } from '@/data/mock/dashboard';
import { mockEmployees } from '@/data/mock/employees';

/**
 * Attendance Service
 * Future Backend Integration: Replace the mock returns below with fetch() or axios calls
 * e.g., const res = await fetch('/api/employees'); return await res.json();
 */
export const attendanceService = {
  /**
   * Fetch all employees or filter based on criteria
   */
  async getEmployees(filters?: Partial<EmployeeFilter>): Promise<Employee[]> {
    // Simulate slight network delay for realistic UI states (can be 0 or 100ms)
    await new Promise((resolve) => setTimeout(resolve, 80));

    let results = [...mockEmployees];

    if (!filters) return results;

    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(q) ||
          emp.rank.toLowerCase().includes(q) ||
          emp.position.toLowerCase().includes(q) ||
          emp.badgeNumber?.toLowerCase().includes(q)
      );
    }

    if (filters.position && filters.position !== 'all') {
      results = results.filter((emp) =>
        emp.position.toLowerCase().includes(filters.position!.toLowerCase())
      );
    }

    if (filters.location && filters.location !== 'all') {
      results = results.filter((emp) =>
        emp.eveningInstructionLocation
          .toLowerCase()
          .includes(filters.location!.toLowerCase())
      );
    }

    if (filters.duration && filters.duration !== 'all') {
      results = results.filter((emp) =>
        emp.duration.toLowerCase().includes(filters.duration!.toLowerCase())
      );
    }

    if (filters.departmentId && filters.departmentId !== 'all') {
      results = results.filter((emp) => emp.departmentId === filters.departmentId);
    }

    return results;
  },

  /**
   * Get employee by ID
   */
  async getEmployeeById(id: string): Promise<Employee | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockEmployees.find((e) => e.id === id) || null;
  },

  /**
   * Get executive dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return { ...mockDashboardStats };
  },

  /**
   * Get distinct filter options for select dropdowns
   */
  async getFilterOptions(): Promise<{
    positions: string[];
    locations: string[];
    durations: string[];
  }> {
    const positions = Array.from(new Set(mockEmployees.map((e) => e.position)));
    const locations = Array.from(
      new Set(mockEmployees.map((e) => e.eveningInstructionLocation))
    );
    const durations = Array.from(new Set(mockEmployees.map((e) => e.duration)));

    return { positions, locations, durations };
  },
};
