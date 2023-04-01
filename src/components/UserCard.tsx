import { formatName } from "askov/formatters/formatName";
import { type RouterOutputs } from "askov/utils/api";
import dayjs from "dayjs";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type User = RouterOutputs["user"]["getAllFromFamily"][0];

interface UserCardProps {
    user: User;
    onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <div
            className={`card bg-base-100 shadow-lg w-64 p-4 flex flex-col items-center space-y-2 rounded-box transform hover:scale-105 transition-transform duration-200 ${onClick ? "cursor-pointer" : ""
                }`}
            onClick={onClick}
        >
            <div className="avatar w-28 h-28 overflow-hidden rounded-full relative group">
                <Link href={`/wishlists/${user.name || ""}`}>
                    <img
                        src={user.image || "/public/placeholder-image.jpg"}
                        alt={`${user.name || "user"}'s profile image`}
                        className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <IoIosArrowForward className="h-10 w-10 text-white" />
                    </div>
                </Link>
            </div>
            <div className="text-center space-y-1">
                <h2 className="text-xl font-bold">{formatName(user)}</h2>
                <p className="text-sm">
                    {dayjs(user.birthDate).format("MMMM DD, YYYY")}
                </p>
            </div>
        </div>
    );
};
