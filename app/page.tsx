// import ClientComponent from "./client-component"
//return <ClientComponent />
import Image from "next/image"
import { metadata } from "./metadata"
import "styles/global.css"
export { metadata }

export default function Page() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex h-screen flex-col items-center justify-center ">
          <Image src="/images/PupLogo.png" width={200} height={200} alt="logo" />
          <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">Coming Soon!</h2>
        </div>
      </div>
    </>
  )
}
