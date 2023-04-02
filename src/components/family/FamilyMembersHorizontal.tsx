// FamilyMembersHorizontal.tsx
import type React from 'react';

import { UserCard } from 'askov/components/UserCard';
import { type RouterOutputs } from 'askov/utils/api';
type User = RouterOutputs["user"]["getAllFromFamily"][0]

interface FamilyMembersHorizontalProps {
    users: User[];
}
export const FamilyMembersHorizontal: React.FC<FamilyMembersHorizontalProps> = ({ users }) => {
    return (
        <div className="flex overflow-x-auto space-x-4 py-4 px-2 ">
            {users.map((user) => (
                <div key={user.id} >
                    <UserCard user={user} />
                </div>
            ))}
        </div>
    );
};