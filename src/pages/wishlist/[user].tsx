
import { api } from "askov/utils/api";
import { type NextPage } from "next";
import { RouterOutputs } from "askov/utils/api"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";

type Wish = RouterOutputs["wish"]["getAllFromUserName"][0]


const WishlistPage: NextPage = () => {

  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const [newTitle, setNewTitle] =             useState<string>("");
  const [newDescription, setNewDescription] = useState<string | undefined >(undefined);
  const [newPrice, setNewPrice] =             useState<number | undefined >(undefined);
  const [newWebsiteUrl, setNewWebsiteUrl] =   useState<string | undefined>(undefined);
  const [newImageUrl, setNewImageUrl] =       useState<string | undefined>(undefined);

  const { data: sessionData } = useSession()
  const { data: wishes, refetch: refetchWishes } = api.wish.getAllFromUserName.useQuery({ userName: "hansaskov" })

  const createWish = api.wish.create.useMutation({
    
    onSuccess: () => {
      setNewTitle("")
      setNewDescription(undefined)
      setNewPrice(undefined)
      setNewWebsiteUrl(undefined)
      setNewImageUrl(undefined)
      void refetchWishes();
    },
  });

  const updateWish = api.wish.update.useMutation({
    onSuccess: () => {
      void refetchWishes();
    },
  });

  const deleteWish = api.wish.delete.useMutation({
    onSuccess: () => {
      void refetchWishes();
    },
  });

  return (
    <>
      <div className="bg-slate-100 min-h-screen bg-gradient-to-t from-base-300">
        <div className=" grid p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-w-full">
          {wishes?.map(wish => (
              <WishCard wish={wish} key={wish.id}
                onSave={() => void updateWish.mutate({ id: wish.id })}
                onDelete={() => void deleteWish.mutate({ id: wish.id })}
              />
          ))}
        </div>
        <div className="divider "></div>

        <div className="hero-content  flex-col content-center min-w-full">
          <div className="text-center ">
            <h1 className="text-3xl font-bold">Create new wish!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Tekande" className="input input-bordered" value={newTitle} onChange={e => { setNewTitle(e.target.value) }} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                  <span className="label-text-alt text-gray-500">optional</span>
                </label>
                <input type="number" placeholder="499.99" className="input input-bordered" value={newPrice ?? undefined} onChange={(e) => { setNewPrice(Number(e.target.value)) }} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                  <span className="label-text-alt text-gray-500">optional</span>
                </label>
                <textarea className="textarea textarea-bordered h-12" placeholder="Thekande fra Nordic Sense i sort" value={newDescription ?? undefined} onChange={(e) => { setNewDescription(e.target.value) }}></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Website url</span>
                  <span className="label-text-alt text-gray-500">optional</span>
                </label>
                <input type="text" placeholder="https://www.imerco.dk" className="input input-bordered" value={newWebsiteUrl ?? undefined} onChange={(e) => { setNewWebsiteUrl(e.target.value) }} />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Image url</span>
                  <span className="label-text-alt text-gray-500">optional</span>
                </label>
                <input type="text" className="input input-bordered" value={newImageUrl ?? undefined} onChange={(e) => { setNewImageUrl(e.target.value) }} placeholder="https://integration.imerco.dk/cdn-cgi/image/width=384,format=auto,quality=65/https://integration.imerco.dk/api/assetstorage/3990_11de1834-9e72-48a6-87e5-7ab39c70c84a" />
              </div>

              <button
                className="btn btn-primary mt-2"
                onClick={() => {createWish.mutate({
                  title: newTitle,
                  description: newDescription,
                  price: newPrice,
                  link: newWebsiteUrl,
                  image: newImageUrl,
                })}}
                >Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;



export const WishCard = ({
  wish,
  onSave,
  onDelete,
}: {
  wish: Wish,
  onSave: (wish: Wish) => void,
  onDelete: () => void
}) => {


  const [title, setTitle] = useState(wish.title)

  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-zinc-700 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img className=" object-cover h-48 w-full " src={wish.image ?? "/placeholder-image.jpg"} alt="Product Image" />
        <PencilSquareIcon className="btn p-1 btn-sm text-secondary-content glass absolute top-2 left-2 right-2 " />
        <XMarkIcon className="btn p-1 btn-sm text-secondary-content glass absolute top-2  right-2 " onClick={onDelete} />
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