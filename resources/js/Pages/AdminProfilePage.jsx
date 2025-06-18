import { useState, useEffect } from 'react'
import AdminLayout from '../Layouts/AdminLayout'
import { fetchCurrentUser } from '../utils/api'
import axios from 'axios'

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  // Fetch user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user } = await fetchCurrentUser()
        setForm({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
        })
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }

    loadUser()
  }, [])

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post('/api/update-profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert(response.data.message || 'Profile updated successfully ✅')
    } catch (error) {
      console.error(error)
      alert('Failed to update profile ')
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match ')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        '/api/change-password',
        {
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword,
          new_password_confirmation: passwords.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      alert(response.data.message || 'Password changed successfully ✅')
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0]
        alert(firstError)
      } else {
        alert('Failed to change password ❌')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#130447] mb-8">Admin Profile</h2>

        {/* Admin Details */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-lg font-semibold text-[#130447] mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleFormChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleFormChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
          </div>

          <button
            onClick={updateProfile}
            disabled={loading}
            className="mt-6 px-6 py-2 bg-[#130447] text-white rounded hover:bg-[#10033c] disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-[#130447] mb-4">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Old Password</label>
              <input
                name="oldPassword"
                type="password"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Confirm New Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#130447]"
              />
            </div>
          </div>

          <button
            onClick={changePassword}
            disabled={loading}
            className="mt-6 px-6 py-2 bg-[#130447] text-white rounded hover:bg-[#10033c] disabled:opacity-50"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
