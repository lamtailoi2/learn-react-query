import { Link } from "react-router-dom";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteStudent, getStudent, getStudents } from "apis/student.api";
import useQueryString from "../../hooks/useQueryString";
import { PAGE_LIMIT } from "constant";
import classname from "classnames";
import { toast } from "react-toastify";

export default function Students() {
  const queryString = useQueryString();
  const queryClient = useQueryClient();

  const page = Number(queryString.page) || 1;
  const studentsQuery = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page, PAGE_LIMIT),
    placeholderData: keepPreviousData,
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id: string | number) =>
      deleteStudent(id).then((_) => {
        toast.success(`Delete Successful! ${id}`);
        queryClient.invalidateQueries({ queryKey: ["students", page] });
      }),
  });
  const totalStudentCount = Number(
    studentsQuery.data?.headers["x-total-count"] || 0
  );
  const totalPage = Math.ceil(totalStudentCount / PAGE_LIMIT);
  const handleDelete = (id: number | string) => {
    deleteStudentMutation.mutate(id);
  };

  const handlePrefetch = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["student", String(id)],
      queryFn: () => getStudent(id),
    });
  };

  return (
    <div>
      <h1 className="text-lg">Students</h1>
      <Link
        to={`/students/add`}
        className="rounded bg-blue-600 px-5 py-2.5 font-medium text-white hover:underline"
      >
        Add
      </Link>
      {studentsQuery.isLoading && (
        <div role="status" className="mt-6 animate-pulse">
          <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsQuery.data?.data.map((student) => (
              <tr
                key={student.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                onMouseEnter={() => handlePrefetch(student.id)}
              >
                <td className="px-6 py-4">{student.id}</td>
                <td className="px-6 py-4">
                  <img src={student.avatar} alt="student" className="h-5 w-5" />
                </td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {student.last_name}
                </th>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/students/${student.id}`}
                    className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500"
                    onClick={() => handleDelete(student.id)}
                    disabled={
                      studentsQuery.isLoading || deleteStudentMutation.isPending
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              {page === 1 ? (
                <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Previous
                </span>
              ) : (
                <Link
                  to={`/students?page=${page - 1}`}
                  className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </Link>
              )}
            </li>
            {Array(totalPage)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1;
                const isActive = page === pageNumber;
                console.log(page === pageNumber);

                return (
                  <li key={pageNumber}>
                    <Link
                      className={classname(
                        "border border-gray-300 px-3 py-2 leading-tight text-gray-500   hover:bg-gray-100  hover:text-gray-700",
                        {
                          "bg-gray-100 text-gray-700": isActive,
                          "bg-white text-gray-500": !isActive,
                        }
                      )}
                      to={`/students?page=${pageNumber}`}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}

            <li>
              {page === 10 ? (
                <span className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </span>
              ) : (
                <Link
                  className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  to={`/students?page=${page + 1}`}
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
