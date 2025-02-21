import { useMatch } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { type Student } from "types/student.type";
import { useState } from "react";
import { addStudent } from "apis/student.api";
type FormType = Omit<Student, "id">;

const intFormValue: FormType = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  country: "",
  avatar: "",
  btc_address: "",
};

export default function AddStudent() {
  const [formSate, setFormState] = useState<FormType>(intFormValue);
  const match = useMatch("/students/add");
  const isAdd = Boolean(match);
  const mutation = useMutation({
    mutationFn: (body: FormType) => {
      console.log(body);

      return addStudent(body);
    },
  });
  console.log(formSate);

  return (
    <div>
      <h1 className="text-lg">{isAdd ? "Add" : "Edit"} Student</h1>
      <form className="mt-6">
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formSate.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email address
          </label>
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div>
            <div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-1"
                  type="radio"
                  name="gender"
                  value={formSate.gender}
                  checked={formSate.gender === "Male"}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
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
                  name="gender"
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
                  name="gender"
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
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formSate.country}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, country: e.target.value }))
            }
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="first_name"
              id="first_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.first_name}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
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
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.last_name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, last_name: e.target.value }))
              }
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
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.avatar}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, avatar: e.target.value }))
              }
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
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formSate.btc_address}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  btc_address: e.target.value,
                }))
              }
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
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
