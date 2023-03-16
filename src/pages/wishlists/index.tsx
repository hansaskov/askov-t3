import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import dayjs from 'dayjs';
import { api, RouterOutputs } from 'askov/utils/api';
import Link from 'next/link';
import { formatName } from 'askov/formatters/formatName';

type User = RouterOutputs["user"]["getAllFromFamily"][0]

function sortByNextBirthday(users: User[]): User[] {
  const today = dayjs();
  return users
    .slice()
    .sort((a, b) => {
      const aBirthday = dayjs(a.birthDate).year(today.year());
      const bBirthday = dayjs(b.birthDate).year(today.year());

      if (aBirthday.isBefore(today)) aBirthday.add(1, 'year');
      if (bBirthday.isBefore(today)) bBirthday.add(1, 'year');

      return aBirthday.diff(today) - bBirthday.diff(today);
    });
}

const Wishlists: NextPage = () => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const familyName = 'Askov';
  const { data: users, refetch: refetchUsers } = api.user.getAllFromFamily.useQuery({ familyName: familyName })

  useEffect(() => {
    setSortedUsers(sortByNextBirthday(users ?? []));
  }, [users]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 lg:px-8">
        <h1 className="text-5xl font-serif text-center mb-8">Fammilien {familyName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-4">
          {sortedUsers.map((user) => (
            <div key={user.id} className="card shadow-lg compact bg-base-100">
              <div className="card-img">
                <Link href={`/wishlists/${user.name ?? ""}`}>
                  <img
                    src={user.image || 'public/placeholder-image.jpg'}
                    alt={user.name ?? ""}
                    className="object-cover w-full h-full object-center"
                  />
                </Link>
              </div>
              <div className="card-body">
                <h2 className="card-title">{formatName(user)}</h2>
                <p className="text-sm">
                  Birthday: {dayjs(user.birthDate).format('MMMM DD, YYYY')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlists;

