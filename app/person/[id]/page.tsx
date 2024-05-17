import Image from "next/image";

async function getPerson(id: string) {
  return await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`).then((res) => res.json());
}

export default async function PersonPage({ params }: { params: { id: string } }) {
  const person = await getPerson(params.id);
  return (
    <div className="max-w-screen-lg m-auto">
      <div className="my-16 bg-gray-800 p-8 py-20">
        {person.squareImage === "https:undefined" ? (
          <div>이미지 없음</div>
        ) : (
          <Image src={person?.squareImage || ""} alt={person.name} width={416} height={416} />
        )}
        <p className="font-bold text-2xl mt-5">{person.name}</p>
        <div className="mt-5 flex flex-col gap-2">
          <p>Networth: {Math.floor(person.netWorth / 1000)} Billion</p>
          <p>Country: {person.country}</p>
          <p>Industry: {person.industries}</p>
          <p>{person.bio}</p>
        </div>
      </div>
      <div className="my-16 bg-gray-800 p-8 py-20">
        <h1 className="text-2xl font-bold">Financial Assets</h1>
        <div className="mt-5 grid grid-cols-4 gap-4">
          {person.financialAssets.map((asset: any) => (
            <div key={asset.id} className="border border-gray-600 p-4 rounded-md">
              <p>Ticekr: {asset.ticker}</p>
              <p>Shares: {asset.numberOfShares.toLocaleString()}</p>
              {asset.exerciseOptionPrice && <p>Excersie Price: ${asset.exerciseOptionPrice}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
