import { useMatch, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Student } from "types/student.type";
import { useEffect, useMemo, useState } from "react";
import { addStudent, getStudent, updateStudent } from "apis/student.api";
import { isAxiosErrors } from "utils";
import { toast } from "react-toastify";
type FormType = Omit<Student, "id">;

const initFormState: FormType = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  country: "",
  avatar: "",
  btc_address: "",
};

type ErrorForm =
  | {
      [key in keyof FormType]: string;
    }
  | null;

export default function AddStudent() {
  const [formSate, setFormState] = useState<FormType>(initFormState);
  const { id } = useParams();
  const match = useMatch("/students/add");
  const isAddMode = Boolean(match);
  const queryClient = useQueryClient();
  const addStudentMutation = useMutation({
    mutationFn: (body: FormType) => {
      return addStudent(body);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: (_) => updateStudent(id as string, formSate),
  });

  const studentQuery = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id as string),
    staleTime: 1000 * 10,
    enabled: !!id,
  });

  useEffect(() => {
    if (studentQuery.data) {
      setFormState(studentQuery.data.data);
    }
  }, [studentQuery.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (addStudentMutation.data || addStudentMutation.error) {
      addStudentMutation.reset();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAddMode) {
      addStudentMutation.mutate(formSate, {
        onSuccess: (data) => {
          toast.success("Add Successful!");
          setFormState(initFormState);
        },
        onError: (err) => {
          console.log("🚀 ~ handleSubmit ~ err:", err);
        },
      });
    } else {
      updateStudentMutation.mutate(undefined, {
        onSuccess: (data) => {
          toast.success("Update Successful!");
          queryClient.setQueryData(["student", id], data);
        },
      });
    }
  };

  const errorForm: ErrorForm = useMemo(() => {
    const error = isAddMode
      ? addStudentMutation.error
      : updateStudentMutation.error;
    if (
      isAxiosErrors<{ error: ErrorForm }>(error) &&
      error.response?.status === 422
    ) {
      return error.response?.data.error;
    }
    return null;
  }, [addStudentMutation.error, updateStudentMutation.error, isAddMode]);

  return (
    <div>
      <h1 className="text-lg">{isAddMode ? "Add" : "Edit"} Student</h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="email"
            id="email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formSate.email}
            onChange={handleChange}
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email address
          </label>
          {errorForm && <span className="text-red-400">{errorForm.email}</span>}
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div>
            <div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-1"
                  type="radio"
                  name="gender"
                  value={"male"}
                  checked={formSate.gender === "male"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  defaultChecked
                  id="gender-2"
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultChecked
                  id="gender-3"
                  type="radio"
                  value="other"
                  name="gender"
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-3"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="country"
            id="country"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formSate.country}
            onChange={handleChange}
          />
          <label
            htmlFor="country"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Country
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="tel"
              name="first_name"
              id="first_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.first_name}
              onChange={handleChange}
            />
            <label
              htmlFor="first_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              First Name
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.last_name}
              onChange={handleChange}
            />
            <label
              htmlFor="last_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Last Name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="avatar"
              id="avatar"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.avatar}
              onChange={handleChange}
            />
            <label
              htmlFor="avatar"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Avatar Base64
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="btc_address"
              id="btc_address"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.btc_address}
              onChange={handleChange}
            />
            <label
              htmlFor="btc_address"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              BTC Address
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={
            isAddMode
              ? addStudentMutation.isPending
              : updateStudentMutation.isPending
          }
        >
          {isAddMode ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}
