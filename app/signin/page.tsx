import { Metadata } from "next";
import Label from "../components/ui/label/Label";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to your account",
};

const SignIn: React.FC = () => {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-theme-lg">
              <div className="mb-3 sm:mb-4">
                <h1 className="mb-2 font-semibold text-gray-800 text-xs dark:text-white/90 sm:text-title-md">
                  Sign In
                </h1>
              </div>

              <form>
                <div className="space-y-6">
                  <Label htmlFor="email">
                    Email or Username <span className="text-error-500">*</span>
                  </Label>
                  <input
                    type="text"
                    placeholder="Email or Username"
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-1 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:scheme-dark"
                  />
                </div>
                {/*  <div className="space-y-6">
                  <Label htmlFor="password">
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <Input type="password" placeholder="Enter Password" register={registerLogin("password", {required: "Password is required", minLength:{
                    value:6,
                    message: "Password must be at least 6 characters"
                  }})} 
                  error = 
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
