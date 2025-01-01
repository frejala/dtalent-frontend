/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchIcon from "@mui/icons-material/Search";
import { FilterItem } from "@/interfaces/filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sort: any;
  setSort: (val: any) => void;
  filters: FilterItem[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  sortingList: { key: string; label: string }[];
  filterList: {
    key: string;
    label: string;
    values: { key: string; label: string; isSelected: boolean }[];
  }[];
  onRowClick?: (id: string) => void;
  page: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchQuery,
  setSearchQuery,
  sort,
  setSort,
  filters,
  setFilters,
  sortingList,
  filterList,
  onRowClick,
  page,
}: DataTableProps<TData, TValue>) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <span>Ordenar por: </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="font-semibold ml-1">
                  {(sort as any).label || sortingList[0].label}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                {sortingList.map((item) => (
                  <DropdownMenuItem
                    key={item.key}
                    onSelect={() => setSort(item)}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="ml-1 text-blue-600">Agregar filtro +</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                {filterList.map((item) => (
                  <DropdownMenuItem
                    key={item.key}
                    onSelect={() => {
                      setFilters((prev) => [...prev, item]);
                    }}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar empleados"
            className="pl-8 pr-2 py-1 rounded-md border border-gray-300"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon className="absolute right-2 top-[5px] text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-6 items-start mb-6">
        {filters.map((filter) => {
          const selectedValue = filter.values.find((item) => item.isSelected);
          return (
            <DropdownMenu key={filter.key}>
              <DropdownMenuTrigger>
                <span className="p-2 text-blue-600 rounded-2xl bg-blue-300">
                  {filter.label}:{" "}
                  {selectedValue ? selectedValue.label : "Todos"} ↓
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuItem
                  onSelect={() => {
                    setFilters((prev) =>
                      prev.map((prevItem) =>
                        prevItem.key === filter.key
                          ? {
                              ...prevItem,
                              values: prevItem.values.map((v) => ({
                                ...v,
                                isSelected: false,
                              })),
                            }
                          : prevItem
                      )
                    );
                  }}
                >
                  <span>Todos</span>
                </DropdownMenuItem>

                {filter.values.map((item) => (
                  <DropdownMenuItem
                    key={item.key}
                    onSelect={() => {
                      setFilters((prev) => {
                        return prev.map((prevItem) => {
                          if (prevItem.key === filter.key) {
                            return {
                              ...prevItem,
                              values: prevItem.values.map((v) =>
                                v.key === item.key
                                  ? { ...v, isSelected: true }
                                  : { ...v, isSelected: false }
                              ),
                            };
                          }
                          return prevItem;
                        });
                      });
                    }}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuItem
                  onSelect={() => {
                    setFilters((prev) =>
                      prev.filter((f) => f.key !== filter.key)
                    );
                  }}
                >
                  <span>Remover Filtro</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-blue-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-center">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-gray-200 text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    onRowClick ? "cursor-pointer text-center" : "text-center"
                  }
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Lo lamentamos, no se han encontrado registros disponibles en
                  esta página.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <button className="px-3 py-1 bg-transparent text-black">&lt;</button>
        <span className="ml-2 mr-2">{page}</span>
        <button className="px-3 py-1 bg-transparent text-black">&gt;</button>
      </div>
    </div>
  );
}
