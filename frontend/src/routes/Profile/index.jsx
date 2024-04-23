import { useEffect, useState, useRef } from 'react'
import JudgeAxios from '../../axios/JudgeAxios'
import defaultAvatar from '../../assets/default Avatar.png'

const Profile = () => {
  //Changed and set fetched User Data
  const [userMeData, setUserMeData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    organisation_name: '',
    role: '',
    avatar: '',
  })

  const fetchUserMeData = async () => {
    try {
      const response = await JudgeAxios.get(`/users/me/`)
      /* console.log('Fetched User Me Data:', response.data) */
      setUserMeData(response.data)
    } catch (error) {
      console.error('Error by showing my User Data', error)
    }
  }
  useEffect(() => {
    fetchUserMeData()
  }, [])

  //Handle all changes
  const handleChange = (e) => {
    const { name, type } = e.target
    const value = type === 'file' ? e.target.files[0] : e.target.value //Saves the change of the Avatar in localstore
    setUserMeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
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

  //Open datei folder
  const handleAvatarChangeClick = () => {
    fileInputRef.current.click()
  }

  // Sumbimt Form to patch the user informations
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    // Anhängen aller Nutzerdaten außer 'avatar', wenn 'avatar' eine Datei ist.
    Object.keys(userMeData).forEach((key) => {
      if (key !== 'avatar') {
        formData.append(key, userMeData[key])
      } else {
        // Überprüfen, ob es sich bei 'avatar' um eine Datei handelt, und nur dann anhängen.
        if (userMeData.avatar instanceof File) {
          formData.append('avatar', userMeData.avatar)
        }
      }
    })
    try {
      const response = await JudgeAxios.patch(`/users/me/`, formData)
      /* console.log('Patch User Me Data:', response.data) */
      setIsEditing(false)
    } catch (error) {
      console.error('Error, users Data could not saved', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {/* Avatar Change */}
      <div>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-900"
        >
          Avatar
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <img
            alt="Avatar User"
            src={
              userMeData.avatar
                ? typeof userMeData.avatar === 'string'
                  ? userMeData.avatar
                  : URL.createObjectURL(userMeData.avatar)
                : defaultAvatar
            }
            className="h-16 w-18 rounded-full mb-6"
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
      <div className="space-y-12">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={userMeData.username || ''}
            readOnly={!isEditing}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={userMeData.email || ''}
            readOnly={!isEditing}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={userMeData.first_name || ''}
            readOnly={!isEditing}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={userMeData.last_name || ''}
            readOnly={!isEditing}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Organisation
          </label>
          <input
            type="text"
            name="organisation"
            value={userMeData.organisation_name || ''}
            readOnly
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={userMeData.role || ''}
            readOnly
            className="mt-2 block w-full rounded-md bg-base-100 border border-base-300 py-2 pl-3 placeholder:text-gray-400 focus:outline-none"
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
  )
}

export default Profile
