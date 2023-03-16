import { RouterOutputs } from "askov/utils/api";

type User = RouterOutputs["user"]["getAllFromFamily"][0]

export const formatName = (user: User | undefined | null): string => {
    if (!user) {
        return 'Unknown'
    }
    const { firstName, middleName, lastName, name } = user;
    if (firstName || middleName || lastName) {
      return [firstName, middleName, lastName].filter(Boolean).join(' ');
    } else {
      return name ?? 'Unknown';
    }
  };