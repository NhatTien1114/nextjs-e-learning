import { connectToDatabase } from "@/lib/mongoose"

export default async function Home() {
  const connect = connectToDatabase();
  console.log("Home: ", connect);
  return (

    <div>
      Home
    </div>
  );
}
