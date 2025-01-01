import { useEffect, useState, useCallback } from "react";
import receiptsService from "@/services/receipts";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { FilterItem } from "@/interfaces/filter";
import RefreshIcon from "@mui/icons-material/Refresh";
import { sortingList, filterList } from "./const";

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<{
    key: string | null;
    value: string | null;
  }>({ key: null, value: null });
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    numPages: 0,
    perPage: 10,
    next: null,
    previous: null,
    count: 0,
    totalCount: 0,
  });

  const fetchReceipts = useCallback(() => {
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

    receiptsService.getReceipts(params).then((response) => {
      setReceipts(response.results);
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

  const handleViewPDF = (id: string) => {
    receiptsService.getReceiptPDF(id).then((response) => {
      setPdfUrl(response.file);
      setShowModal(true);
    });
  };

  useEffect(() => {
    fetchReceipts();
  }, [fetchReceipts]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="flex justify-between items-center space-x-2 mb-4">
          <div className="flex space-x-2">
            <h2 className="text-3xl font-semibold text-gray-800">
              Lista de Recibos
            </h2>
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
              2
            </span>
          </div>
          <div className="flex justify-end space-x-2 items-end">
            <button
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md border-gray-500 flex items-center gap-2"
              onClick={fetchReceipts}
            >
              <RefreshIcon />
              <span>REFRESCAR LISTA DE RECIBOS</span>
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={receipts}
          sortingList={sortingList}
          filterList={filterList}
          searchQuery={searchQuery}
          sort={sort}
          filters={filters}
          setSort={setSort}
          setFilters={setFilters}
          setSearchQuery={setSearchQuery}
          onRowClick={handleViewPDF}
          page={page}
        />
      </div>

      {showModal && pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl w-full h-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              X
            </button>

            <div className="flex flex-col items-center">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px]"
                title="Recibo PDF"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
