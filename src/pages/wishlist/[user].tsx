
import { api } from "askov/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const WishlistPage: NextPage = () => {
  const { data: sessionData } = useSession()
  const { data: wishes, refetch: refetchWishes } = api.wish.getAllFromUserName.useQuery({ userName: "hansaskov" })

  const createWish = api.wish.create.useMutation({})

  return (
    <>
      <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-6">
        <div className="form-control">
          <div className="card card-compact w-64 h-64 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" alt="Shoes" /></figure>
            <div className="card-body">
              <div className="flex flex-row" >
                <div className="card-title flex-auto text-md">Name!</div>
                <div className="card-title text-md">0.00 kr</div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="card card-compact w-64 h-64 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" alt="Shoes" /></figure>
            <div className="card-body">
              <div className="flex flex-row" >
                <div className="card-title flex-auto text-md">Name!</div>
                <div className="card-title text-md">0.00 kr</div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="card card-compact w-64 h-64 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" alt="Shoes" /></figure>
            <div className="card-body">
              <div className="flex flex-row" >
                <div className="card-title flex-auto text-md">Name!</div>
                <div className="card-title text-md">0.00 kr</div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="card card-compact w-64 h-64 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" alt="Shoes" /></figure>
            <div className="card-body">
              <div className="flex flex-row" >
                <div className="card-title flex-auto text-md">Name!</div>
                <div className="card-title text-md">0.00 kr</div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="card card-compact w-64 h-64 bg-base-100 shadow-xl">
            <figure><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80" alt="Shoes" /></figure>
            <div className="card-body">
              <div className="flex flex-row" >
                <div className="card-title flex-auto text-md">Name!</div>
                <div className="card-title text-md">0.00 kr</div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;