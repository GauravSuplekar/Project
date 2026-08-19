import React from "react";
import { Link } from "react-router-dom";
import { deleteClientById } from "../utils/apiFunctions";

const ClientCard = ({client, deleteClient}) => {
    return (
      <div
      className="flex flex-col border-4 hover:ring-4 ring-[#0A66C2] shadow-2xl mx-5  mt-5 mb-5 lg:mt-5 lg:mb-5"
      >
      <Link
      to={`/admin/client/detail/${client.clientId}`}
      state={{client}}
      >
        <p className="mt-3 font-LakesNeueDemiBold text-2xl text-center">
          {client.name}
        </p>
        <p className="m-3 font-LakesNeueRegular text-lg">
          Company : {client.organizationName}
        </p>
      </Link>
      <button
      onClick={deleteClient}
      className=" bg-[#0A66C2] rounded-lg hover:bg-[#004182] focus:bg-[#0A66C2]
          text-white font-bold py-2 px-4 my-5 focus:outline-none mx-auto
          focus:shadow-outline">Remove Client
  </button>
  </div>
    );
}

export default ClientCard;