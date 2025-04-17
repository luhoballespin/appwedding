import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getUserProfile } from '../services/api';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getUserProfile(user.id);
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
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