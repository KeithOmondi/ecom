import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../../../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8 text-center">
        {error ? (
          <div className="text-red-600 font-semibold text-xl">
            Token Expired
          </div>
        ) : (
          <div className="text-green-600 font-semibold text-xl">
            Your account has been created successfully.
          </div>
        )}
        <p className="text-gray-600 mt-4">
          {error ? "Please try again later or contact support." : "You can now log in to your account."}
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
