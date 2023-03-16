
import { api, type RouterInputs } from "askov/utils/api";
import { type NextPage } from "next";
import { type RouterOutputs } from "askov/utils/api"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { formatName } from "askov/formatters/formatName";

type Wish = RouterOutputs["wish"]["getAllFromUserName"][0]
type CreateWish = RouterInputs["wish"]["create"]

const WishlistPage: NextPage = () => {

  const { data: sessionData } = useSession()
  const router = useRouter()
  const username = router.query?.user as string;

  const { data: wishes, refetch: refetchWishes } = api.wish.getAllFromUserName.useQuery({ userName: username })
  const { data: user } = api.user.getUnique.useQuery({userName: username})
  const isOwnedUser: boolean = sessionData?.user.name == username

  const createWish = api.wish.create.useMutation({
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
        <div className="text-center py-4">
          <h1 className="text-4xl font-semibold ">{formatName(user)}s Wishlist</h1>
        </div>
        <div className=" grid p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-w-full">
          {wishes?.map(wish => (
            <WishCard
              isOwnedUser={isOwnedUser}
              wish={wish}
              key={wish.id}
              onDelete={() => void deleteWish.mutate({ id: wish.id })}
            />
          ))}
        </div>
        <div>
          {isOwnedUser &&
            <WishForm 
            onSave={createWish.mutate}
            />
          }
        </div>
      </div>
    </>
  );
};

export default WishlistPage;

const WishCard = ({
  wish,
  isOwnedUser,
  onDelete,
}: {
  wish: Wish,
  isOwnedUser: boolean,
  onDelete: () => void,
}) => {

  return (
    <a href={wish.link ?? undefined}>
      <div className="mx-auto mt-11 w-60 transform overflow-hidden rounded-lg bg-zinc-700 shadow-md duration-300 hover:scale-105 hover:shadow-lg" >
        <div className="relative" >
          <img className=" object-cover h-42 w-full " src={wish.image ?? "/placeholder-image.jpg"} alt="Product Image" />
          {isOwnedUser && <XMarkIcon className="btn p-1 btn-sm text-secondary-content glass absolute top-2  right-2 " onClick={onDelete} />}
        </div>
        <div className="p-4">
          <p className="mb-2 text-base text-neutral-content">{wish.description}</p>
          <div className="flex items-center text-neutral-content">
            <p className="mr-2 text-lg font-semibold">{wish.title}</p>
            <p className="ml-auto text-base font-medium">{wish.price} kr</p>
          </div>
        </div>
      </div>
    </a>
  )
}


const WishForm = ({ 
  onSave, 
}: { 
  onSave: (wish: CreateWish) => void, 
}) => {
  const [newWish, setNewWish] = useState<CreateWish>({
    title: "",
    description: undefined,
    image: undefined,
    price: undefined,
    link: undefined,
  })

  const [inputMethod, setInputMethod] = useState<'manual' | 'fromUrl'>('manual')
  const [url, setUrl] = useState('')


  return (
    <>
      <div className="divider"></div>

      <div className="hero-content flex-col content-center min-w-full">
        <div className="text-center ">
          <h1 className="text-3xl font-bold">Create new wish!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="flex justify-around mb-4">
              <button
                className={`btn ${inputMethod === 'manual' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setInputMethod('manual')}
              >
                Manual
              </button>
              <button
                className={`btn ${inputMethod === 'fromUrl' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setInputMethod('fromUrl')}
              >
                From URL
              </button>
            </div>
            {inputMethod === 'fromUrl' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/product-page"
                />
                <button className="btn btn-primary mt-2" disabled={true}>
                  Fetch
                </button>
              </div>
            )}

            {inputMethod === 'manual' && (
              <div >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Tekande" className="input input-bordered" value={newWish.title} onChange={e => { setNewWish({ ...newWish, title: e.target.value }) }} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                    <span className="label-text-alt text-gray-500">optional</span>
                  </label>
                  <input type="number" placeholder="499.99" className="input input-bordered" value={newWish.price} onChange={e => { setNewWish({ ...newWish, price: Number(e.target.value) }) }} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                    <span className="label-text-alt text-gray-500">optional</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-12" placeholder="Thekande fra Nordic Sense i sort" value={newWish.description} onChange={e => { setNewWish({ ...newWish, description: e.target.value }) }}></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Website url</span>
                    <span className="label-text-alt text-gray-500">optional</span>
                  </label>
                  <input type="text" placeholder="https://www.imerco.dk" className="input input-bordered" value={newWish.link} onChange={(e) => { setNewWish({ ...newWish, link: e.target.value }) }} />
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Image url</span>
                    <span className="label-text-alt text-gray-500">optional</span>
                  </label>
                  <input type="text" className="input input-bordered" value={newWish.image} onChange={(e) => { setNewWish({ ...newWish, image: e.target.value }) }} placeholder="https://integration.imerco.dk/cdn-cgi/image/width=384,format=auto,quality=65/https://integration.imerco.dk/api/assetstorage/3990_11de1834-9e72-48a6-87e5-7ab39c70c84a" />
                </div>
    
                <button
                  className="btn btn-primary mt-2 w-full"
                  onClick={() => void onSave(newWish)}
                >Create</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
