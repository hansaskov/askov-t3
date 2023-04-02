import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { RouterInputs, RouterOutputs } from "askov/utils/api";

type Wish = RouterOutputs["wish"]["getAllFromUserName"][0]
type CreateWish = RouterInputs["wish"]["create"]


export const WishCard = ({
    wish,
    isOwnedUser,
    onDelete,
    setNewWish,
}: {
    wish: Wish,
    isOwnedUser: boolean,
    onDelete: () => void,
    setNewWish: React.Dispatch<React.SetStateAction<CreateWish>>,
}) => {
    return (
        <a href={wish.link ?? undefined} className="block mx-auto my-4 w-64 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-300 focus:ring-indigo-500">
            <div className="relative h-56">
                <img className="object-cover h-full w-full" src={wish.image ?? "/placeholder-image.jpg"} alt={`${wish.title}`} />
                {isOwnedUser && (
                    <div>
                        <button
                            className="btn p-1 btn-sm text-white glass absolute top-2 left-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-300 focus:ring-indigo-500 hover:btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                setNewWish({ ...wish, title: wish.title, description: wish.description ?? undefined, image: wish.image ?? undefined, link: wish.link ?? undefined, price: wish.price ?? undefined });
                            }}
                        >
                            <PencilSquareIcon className="h-5 w-5 text-indigo-500" />
                        </button>
                        <button
                            className="btn p-1 btn-sm text-white glass absolute top-2 right-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-300 focus:ring-indigo-500 hover:btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete();
                            }}
                        >
                            <XMarkIcon className="w-5 h-5 text-indigo-500" />
                        </button>
                    </div>)}
            </div>
            <hr className="border-t border-gray-200" />
            <div className="p-4">
                <p className="mb-1 text-xl font-bold text-indigo-600">{wish.title}</p>
                <p className="mb-2 text-sm text-gray-700">{wish.description}</p>
                <div className="flex items-center mt-1">
                    <p className="ml-auto text-lg font-semibold text-indigo-500">{wish.price} kr</p>
                </div>
            </div>
        </a>
    );
};