import { useEffect, useState, useCallback } from "react";
import employeesService from "@/services/employees";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { FilterItem } from "@/interfaces/filter";
import { sortingList, filterList } from "./const";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<{
    key: string | null;
    value: string | null;
  }>({ key: null, value: null });
  const [filters, setFilters] = useState<FilterItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, _] = useState(1);
  const [pagination, setPagination] = useState({
    numPages: 0,
    perPage: 10,
    next: null,
    previous: null,
    count: 0,
    totalCount: 0,
  });

  const fetchEmployees = useCallback(() => {
    const params: Record<string, string> = {};

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (sort?.key) {
      params.sort = sort.key;
    }

    filters.forEach((filter) => {
      const selected = filter.values.find((v) => v.isSelected);
      if (selected) {
        params[filter.key] = selected.key;
      }
    });

    params.page = String(pagination.next || 1);
    params.perPage = String(pagination.perPage);

    employeesService.getEmployees(params).then((response) => {
      setEmployees(response.results);
      setPagination({
        numPages: response.numPages,
        perPage: response.perPage,
        next: response.next,
        previous: response.previous,
        count: response.count,
        totalCount: response.totalCount,
      });
    });
  }, [searchQuery, sort, filters]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex justify-between items-center space-x-2 mb-4">
        <div className="flex space-x-2">
          <h2 className="text-3xl font-semibold text-gray-800">
            Lista de empleados
          </h2>
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
            2
          </span>
        </div>
        <div className="flex justify-end space-x-2 items-end">
          <button className="bg-white text-gray-400 font-semibold px-4 py-2 rounded-md border-gray-500">
            IMPORTAR
          </button>
          <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md">
            + NUEVO EMPLEADO
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={employees}
        sortingList={sortingList}
        filterList={filterList}
        searchQuery={searchQuery}
        sort={sort}
        filters={filters}
        setSort={setSort}
        setFilters={setFilters}
        setSearchQuery={setSearchQuery}
        page={page}
      />
    </div>
  );
}
