import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
 

  return (
    <div>
      <h1>Destination Details</h1>
        <p>Destination ID: {id}</p>
    </div>
  );
}
