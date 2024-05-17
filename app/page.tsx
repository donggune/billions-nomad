import Image from "next/image";
import Link from "next/link";

export function formatNetWorth(value: number) {
  const billions = value / 1000;

  return `${Math.floor(billions)} Billions`;
}

function getBillionaries() {
  return fetch("https://billions-api.nomadcoders.workers.dev/").then((res) => res.json());
}

export default async function Home() {
  const billionaries = await getBillionaries();

  return (
    <main className="flex min-h-screen max-w-5xl flex-col m-auto items-center justify-between p-24">
      <ul className="grid grid-cols-4 gap-4">
        {billionaries.map((billionary: any) => (
          <Link href={`/person/${billionary.id}`} key={billionary.id}>
            <li>
              {billionary.squareImage === "https:undefined" ? (
                <div>이미지 없음</div>
              ) : (
                <Image src={billionary.squareImage} alt={billionary.name} width={416} height={416} />
              )}
              <div className="bg-gray-900 p-2">
                <p className="font-bold text-sm">{billionary.name}</p>
                <p className="text-[10px] text-gray-400">
                  {formatNetWorth(billionary.netWorth)} / {billionary.industries}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
