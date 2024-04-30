import {useEffect, useState, useRef} from 'react'
import JudgeAxios from '../../axios/JudgeAxios'
import defaultAvatar from '../../assets/default Avatar.png'
import {updateUserField} from "../../store/slices/userSlice.js";
import {useDispatch} from "react-redux";

const Profile = () => {
    const dispatch = useDispatch()
    //Changed and set fetched User Data
    const [preMeData, setPreMeData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        organisation: {
            name: '',
            logo: ''
        },
        role: '',
        avatar: ''
    })

    const [userMeData, setUserMeData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        organisation: {
            name: '',
            logo: ''
        },
        role: '',
        avatar: ''
    })

    const [orgData, setOrgData] = useState({
        name: '',
        logo: ''
    })

    const fetchPreMeData = async () => {
        try {
            const response = await JudgeAxios.get(`/users/me/`)
            if (response.data && response.data.organisation && response.data.organisation.id) {
                const responseOrg = await JudgeAxios.get(`/organisations/${response.data.organisation.id}/`)
                setOrgData(responseOrg.data)

                setPreMeData(response.data)
                preMeData.organisation.logo = responseOrg.data.logo;
            } else
                setPreMeData(response.data)

        } catch (error) {
            console.error('Error by showing my User Data', error)
        }
    }

    const putUserData = async () => {
        if (orgData.logo)
            preMeData.organisation.logo = orgData.logo;

        setUserMeData(preMeData)
    }

    useEffect(() => {
        fetchPreMeData()
    }, [])

    useEffect(() => {
        if (preMeData.email) {
            putUserData()
        }
    }, [preMeData.email])


    //Handle all changes
    const handleChange = (e) => {
        const {name, type} = e.target
        const value = type === 'file' ? e.target.files[0] : e.target.value
        setUserMeData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleLogoChange = (e) => {
        const {name, type} = e.target;
        let value = type === 'file' ? e.target.files[0] : e.target.value;

        handleChange(e) //don't ask me why
        setUserMeData(prevData => {
            // Split the name on dots which allows us to handle nested objects
            const keys = name.split('.');

            if (keys.length === 1) {
                // Handle top-level properties
                return {
                    ...prevData,
                    [keys[0]]: value
                };
            } else {
                // Handle nested properties, specifically for 'organisation.logo'
                return {
                    ...prevData,
                    [keys[0]]: {
                        ...prevData[keys[0]],
                        [keys[1]]: value
                    }
                };
            }
        });
    };

    // Switch on switch off the edit modus
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(true)
    }
    const handleCancel = () => {
        setIsEditing(false)
    }
    //reference for avatarInput
    const fileInputRef = useRef(null)

    const fileLogoRef = useRef(null)

    //Open datei folder
    const handleAvatarChangeClick = () => {
        fileInputRef.current.click()
    }

    const handleLogoChangeClick = () => {
        fileLogoRef.current.click()
    }

    // Sumbimt Form to patch the user informations
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        // Anhängen aller Nutzerdaten außer 'avatar', wenn 'avatar' eine Datei ist.
        Object.keys(userMeData).forEach((key) => {
            if (key === 'avatar') {
                if (userMeData.avatar instanceof File) {
                    formData.append('avatar', userMeData.avatar);
                }
            } else if (key === 'organisation') {

                formData.append(key, JSON.stringify(userMeData[key]));
                // formData.append(key, JSON.stringify(orgData));
            } else {
                formData.append(key, userMeData[key]);
            }
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }
        })
        try {
            const response = await JudgeAxios.patch(`/users/me/`, formData)
            setIsEditing(false)

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
                if (key !== 'organisation')
                    dispatch(updateUserField({field: key, value: value}));
            }
        } catch (error) {
            console.error('Error, users Data could not saved', error)
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-16xl p-4 flex flex-col items-center gap-6 bg-gold">
                <div className="card flex flex-row bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2">
                    <form onSubmit={handleSubmit} className="px-20 py-10 w-full">

                        {/* Avatar Change */}
                        <div data-theme="cupcake">
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-900"
                            >
                                <h3>Avatar</h3>
                            </label>
                            <div className="mt-2 flex items-center gap-x-3 mb-6">
                                <img
                                    alt="Avatar User"
                                    src={
                                        userMeData.avatar
                                            ? typeof userMeData.avatar === 'string'
                                                ? userMeData.avatar
                                                : URL.createObjectURL(userMeData.avatar)
                                            : defaultAvatar
                                    }
                                    className="h-16 w-18 rounded-full"
                                />
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    ref={fileInputRef}
                                />
                                {/* Button to upload new avatar in edit mode */}
                                {isEditing && (
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={handleAvatarChangeClick}
                                    >
                                        Change
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="space-y-12" data-theme="cupcake">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    <h3>Username</h3>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userMeData.username || ''}
                                    readOnly={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    <h3>Email</h3>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={userMeData.email || ''}
                                    readOnly={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    <h3>First Name</h3>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={userMeData.first_name || ''}
                                    readOnly={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    <h3> Last Name</h3>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={userMeData.last_name || ''}
                                    readOnly={!isEditing}
                                    onChange={handleChange}
                                />
                            </div>
                            {orgData && orgData.id &&
                                // {userMeData.organisation && userMeData.organisation.id &&
                                (<div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        <h3>Organisation name</h3>
                                    </label>
                                    <input
                                        type="text"
                                        name="organisation.name"
                                        value={userMeData.organisation.name || ''}
                                        readOnly={!isEditing}
                                        onChange={handleLogoChange}
                                    />
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <label
                                            htmlFor="avatar"
                                            className="block text-sm font-medium text-gray-900 mt-4"
                                        >
                                            <h3> Logo</h3>
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <img
                                                alt="Organisation Logo"
                                                src={
                                                    userMeData.organisation.logo
                                                        ? typeof userMeData.organisation.logo === 'string'
                                                            ? userMeData.organisation.logo   //"http://127.0.0.1:8000" +
                                                            : URL.createObjectURL(userMeData.organisation.logo)
                                                        : defaultAvatar
                                                }
                                                className="h-16 w-18 rounded-full"
                                            />

                                            <input
                                                type="file"
                                                id="organisation.logo"
                                                name="organisation.logo"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoChange}
                                                disabled={!isEditing}
                                                ref={fileLogoRef}
                                            />

                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline"
                                                    onClick={handleLogoChangeClick}
                                                >
                                                    Change
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>)}
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    <h3>Role</h3>
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={userMeData.role || ''}
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-end gap-x-6 mt-6">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-ghost"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
