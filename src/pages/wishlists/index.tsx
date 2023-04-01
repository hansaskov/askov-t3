// Wishlists.tsx
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import dayjs from 'dayjs';
import { api, type RouterOutputs } from 'askov/utils/api';
import { useLoading } from 'askov/hooks/useLoading';
import { FamilyMembersHorizontal } from 'askov/components/FamilyMembersHorizontal';

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

function useSortedFamilyMembers(familyName: string) {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const { data: users, status: usersStatus } = api.user.getAllFromFamily.useQuery({ familyName });

  useEffect(() => {
    setSortedUsers(sortByNextBirthday(users ?? []));
  }, [users]);

  return { sortedUsers, usersStatus };
}

const Wishlists: NextPage = () => {
  const familyName = "Askov";
  const { sortedUsers, usersStatus } = useSortedFamilyMembers(familyName);
  const LoadingWrapper = useLoading(usersStatus === 'loading', { loadingText: `Loading family members...` });

  return (
    <LoadingWrapper>
      <div className=" min-h-screen bg-gradient-to-t from-base-300">
        <h1 className="text-5xl p-4 font-serif text-center mb-8">Fammilien {familyName}</h1>
        <FamilyMembersHorizontal users={sortedUsers} />
      </div>
    </LoadingWrapper>
  );
};

export default Wishlists;
