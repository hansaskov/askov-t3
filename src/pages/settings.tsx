import { api, type RouterInputs } from 'askov/utils/api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type UpdateUser = RouterInputs["user"]["update"]

function Settings() {
    const { data: userData, refetch: refetchUser } = api.user.getSessionUser.useQuery();

    const [userSettings, setUserSettings] = useState<UpdateUser | null>(null);

    useEffect(() => {
        if (userData) {
            setUserSettings({
                firstName: userData.firstName ?? "",
                middleName: userData.middleName ?? "",
                lastName: userData.lastName ?? "",
                birthDate: userData.birthDate ?? "",
                description: userData.description ?? "",
            });
        }
    }, [userData]);


    const [dateOfBirth, setDateOfBirth] = useState({
        day: '',
        month: '',
        year: '',
    });

    useEffect(() => {
        if (userData?.birthDate) {
            setDateOfBirth({
                day: dayjs(userData.birthDate).date().toString(),
                month: (dayjs(userData.birthDate).month() + 1).toString(),
                year: dayjs(userData.birthDate).year().toString(),
            });
        }
    }, [userData]);


      
    const toDate = (date: typeof dateOfBirth) => {
        return dayjs(`${date.year}-${date.month}-${date.day}`).toDate();
      };
      

    const updateUser = api.user.update.useMutation({
        onSuccess: () => {
            void refetchUser();
        },
    });


    if (!userData || !userSettings) {
        return (
            <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Error: Not signed in</h1>
                <p className="mb-8">
                    You must be signed in to access the settings page. Please login to continue
                </p>
            </div>
        );
    }


    return (
        <div className='p-4 min-h-screen  bg-gradient-to-br from-neutral-content  to-neutral-400'>
            <div className="container mx-auto p-4 min-h-screen from-gray-100bg-gradient-to-br  to-white">
                <div className="mt-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Your Settings</h1>
                    <div className="grid grid-cols-3 gap-4">

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full shadow"
                                value={userSettings?.firstName}
                                onChange={(e) => setUserSettings({ ...userSettings, firstName: e.target.value })}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Middle Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full shadow"
                                value={userSettings?.middleName ?? ""}
                                onChange={(e) => setUserSettings({ ...userSettings, middleName: e.target.value })}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full shadow"
                                value={userSettings?.lastName}
                                onChange={(e) => setUserSettings({ ...userSettings, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full shadow" />
                    </div>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Birthday</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="number"
                                className="input input-bordered w-full shadow"
                                placeholder="DD"
                                value={dateOfBirth.day}
                                onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                                min="1"
                                max="31"
                            />
                            <input
                                type="number"
                                className="input input-bordered w-full shadow"
                                placeholder="MM"
                                value={dateOfBirth.month}
                                onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                                min="1"
                                max="12"
                            />
                            <input
                                type="number"
                                className="input input-bordered w-full shadow"
                                placeholder="YYYY"
                                value={dateOfBirth.year}
                                onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                                min="1900"
                                max="2099"
                            />
                        </div>
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">About You</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-24 shadow"
                            value={userSettings?.description ?? ""}
                            onChange={(e) => setUserSettings({ ...userSettings, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="text-right mt-8">
                        <button className="btn btn-primary" onClick={() => void updateUser.mutate({ ...userSettings, birthDate: toDate(dateOfBirth) })}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
