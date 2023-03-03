
import { api } from "askov/utils/api";
import { type NextPage } from "next";
import { RouterOutputs } from "askov/utils/api"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
type Wish = RouterOutputs["wish"]["getAll"][0]
import { PencilSquareIcon } from "@heroicons/react/20/solid";





const WishlistPage: NextPage = () => {
  const { data: sessionData } = useSession()
  const { data: wishes, refetch: refetchWishes } = api.wish.getAllFromUserName.useQuery({ userName: "hansaskov" })




  return (
    <>
      <div className=" grid p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishes?.map(wish => (
          <div className="mx-1">
            <WishCard wish={wish} onSave={() => refetchWishes()} />
          </div>
        ))}



      </div>
    </>
  );
};

export default WishlistPage;



export const WishCard = ({
  wish,
  onSave
}: {
  wish: Wish,
  onSave: (wish: Wish) => void
}) => {


  const [title, setTitle] = useState(wish.title)

  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-zinc-700 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img className="h-48 w-full" src={wish.image ? wish.image : "/placeholder-image.jpg"} alt="Product Image" />
        <PencilSquareIcon className="btn p-1 btn-sm text-secondary-content glass absolute top-2 left-2 right-2 " />
      </div>
      <div className="p-4">
        <p className="mb-2 text-base text-neutral-content">{wish.description}</p>
        <div className="flex items-center text-neutral-content">
          <p className="mr-2 text-lg font-semibold">{wish.title}</p>
          <p className="ml-auto text-base font-medium">{wish.price} kr</p>
        </div>
      </div>
    </div>
  )
}

