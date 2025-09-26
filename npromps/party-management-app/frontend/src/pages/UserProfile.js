import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await userService.getUserProfile(user._id);
                if (response.success) {
                    setProfileData(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                toast.error('Error al cargar el perfil');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfileData();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>No profile data available.</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <h2>{profileData.name}</h2>
            <p>Email: {profileData.email}</p>
            <h3>Events Organized:</h3>
            <ul>
                {profileData.events.map(event => (
                    <li key={event.id}>{event.title} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;