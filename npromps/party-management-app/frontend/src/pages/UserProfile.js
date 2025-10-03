import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';
import toast from 'react-hot-toast';
import {
    UserIcon,
    Cog6ToothIcon,
    ShieldCheckIcon,
    BellIcon,
    PhotoIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    EyeIcon,
    EyeSlashIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    BuildingOfficeIcon,
    HeartIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        location: user?.location || { city: '', state: '', country: 'México' },
        avatar: user?.avatar || '',
        preferences: user?.preferences || {
            notifications: { email: true, push: true, sms: false },
            language: 'es',
            timezone: 'America/Mexico_City'
        },
        businessInfo: user?.businessInfo || {}
    });
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const tabs = [
        { id: 'personal', name: 'Información Personal', icon: UserIcon },
        { id: 'account', name: 'Configuración', icon: Cog6ToothIcon },
        { id: 'security', name: 'Seguridad', icon: ShieldCheckIcon },
        { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
        { id: 'stats', name: 'Estadísticas', icon: ChartBarIcon }
    ];

    // Agregar pestaña de negocio para proveedores
    if (user?.role === 'proveedor') {
        tabs.splice(4, 0, { id: 'business', name: 'Información de Negocio', icon: BuildingOfficeIcon });
    }

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const response = await userService.updateProfile(profileData);
            if (response.success) {
                updateUser(response.data);
                toast.success('Perfil actualizado exitosamente');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        try {
            const response = await userService.changePassword(passwordData);
            if (response.success) {
                toast.success('Contraseña actualizada exitosamente');
                setShowPasswordForm(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(error.response?.data?.message || 'Error al cambiar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Por ahora simulamos la subida
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&background=random`;

        try {
            const response = await userService.updateProfile({ avatar: avatarUrl });
            if (response.success) {
                updateUser(response.data);
                setProfileData(prev => ({ ...prev, avatar: avatarUrl }));
                toast.success('Avatar actualizado exitosamente');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error('Error al actualizar el avatar');
        }
    };

    const getRoleIcon = () => {
        switch (user?.role) {
            case 'planeador_bodas':
                return <HeartIcon className="w-6 h-6 text-primary-600" />;
            case 'organizador':
                return <UserGroupIcon className="w-6 h-6 text-primary-600" />;
            case 'proveedor':
                return <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />;
            default:
                return <UserIcon className="w-6 h-6 text-primary-600" />;
        }
    };

    const getRoleLabel = () => {
        switch (user?.role) {
            case 'planeador_bodas':
                return 'Wedding Planner';
            case 'organizador':
                return 'Organizador';
            case 'proveedor':
                return 'Proveedor';
            default:
                return 'Usuario';
        }
    };

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <img
                        src={profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                    />
                    <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                        <PhotoIcon className="w-4 h-4" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-secondary-900">
                        {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-secondary-600">{getRoleLabel()}</p>
                    <div className="flex items-center space-x-2 mt-1">
                        {getRoleIcon()}
                        <span className="text-sm text-secondary-500">@{user.username}</span>
                    </div>
                </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input-field"
                        placeholder="Tu nombre"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input-field"
                        placeholder="Tu apellido"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Biografía
                </label>
                <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="input-field"
                    rows={4}
                    placeholder="Cuéntanos sobre ti..."
                    maxLength={500}
                />
                <p className="text-xs text-secondary-500 mt-1">
                    {profileData.bio.length}/500 caracteres
                </p>
            </div>
        </div>
    );

    const renderAccountSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                        Email
                    </label>
                    <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <PhoneIcon className="w-4 h-4 inline mr-2" />
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input-field"
                        placeholder="+52 55 1234 5678"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-2" />
                    Ubicación
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={profileData.location.city}
                        onChange={(e) => handleInputChange('location.city', e.target.value)}
                        className="input-field"
                        placeholder="Ciudad"
                    />
                    <input
                        type="text"
                        value={profileData.location.state}
                        onChange={(e) => handleInputChange('location.state', e.target.value)}
                        className="input-field"
                        placeholder="Estado"
                    />
                    <input
                        type="text"
                        value={profileData.location.country}
                        onChange={(e) => handleInputChange('location.country', e.target.value)}
                        className="input-field"
                        placeholder="País"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <GlobeAltIcon className="w-4 h-4 inline mr-2" />
                        Idioma
                    </label>
                    <select
                        value={profileData.preferences.language}
                        onChange={(e) => handleInputChange('preferences.language', e.target.value)}
                        className="input-field"
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                        Zona Horaria
                    </label>
                    <select
                        value={profileData.preferences.timezone}
                        onChange={(e) => handleInputChange('preferences.timezone', e.target.value)}
                        className="input-field"
                    >
                        <option value="America/Mexico_City">Ciudad de México</option>
                        <option value="America/New_York">Nueva York</option>
                        <option value="Europe/Madrid">Madrid</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                    <ShieldCheckIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                        <h4 className="text-sm font-medium text-yellow-800">
                            Estado de la cuenta
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                            {user?.emailVerified ? 'Email verificado' : 'Email no verificado'}
                        </p>
                    </div>
                </div>
            </div>

            {!showPasswordForm ? (
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                        <h4 className="text-sm font-medium text-secondary-900">
                            Contraseña
                        </h4>
                        <p className="text-sm text-secondary-600">
                            Última actualización: Hace 3 meses
                        </p>
                    </div>
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="btn-outline flex items-center space-x-2"
                    >
                        <PencilIcon className="w-4 h-4" />
                        <span>Cambiar</span>
                    </button>
                </div>
            ) : (
                <div className="space-y-4 p-4 border border-secondary-200 rounded-lg">
                    <h4 className="text-sm font-medium text-secondary-900">
                        Cambiar contraseña
                    </h4>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Contraseña actual
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                className="input-field pr-10"
                                placeholder="Contraseña actual"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPasswords.current ? <EyeSlashIcon className="w-5 h-5 text-secondary-400" /> : <EyeIcon className="w-5 h-5 text-secondary-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Nueva contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="input-field pr-10"
                                placeholder="Nueva contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPasswords.new ? <EyeSlashIcon className="w-5 h-5 text-secondary-400" /> : <EyeIcon className="w-5 h-5 text-secondary-400" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Confirmar nueva contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="input-field pr-10"
                                placeholder="Confirmar nueva contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPasswords.confirm ? <EyeSlashIcon className="w-5 h-5 text-secondary-400" /> : <EyeIcon className="w-5 h-5 text-secondary-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handlePasswordChange}
                            disabled={loading}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <CheckIcon className="w-4 h-4" />
                            <span>Actualizar</span>
                        </button>
                        <button
                            onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            className="btn-outline flex items-center space-x-2"
                        >
                            <XMarkIcon className="w-4 h-4" />
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-secondary-900">
                            Notificaciones por email
                        </h4>
                        <p className="text-sm text-secondary-600">
                            Recibe actualizaciones importantes por email
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={profileData.preferences.notifications.email}
                            onChange={(e) => handleInputChange('preferences.notifications.email', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-secondary-900">
                            Notificaciones push
                        </h4>
                        <p className="text-sm text-secondary-600">
                            Recibe notificaciones en tiempo real
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={profileData.preferences.notifications.push}
                            onChange={(e) => handleInputChange('preferences.notifications.push', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-secondary-900">
                            Notificaciones SMS
                        </h4>
                        <p className="text-sm text-secondary-600">
                            Recibe alertas importantes por SMS
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={profileData.preferences.notifications.sms}
                            onChange={(e) => handleInputChange('preferences.notifications.sms', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderBusinessInfo = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Nombre del negocio
                    </label>
                    <input
                        type="text"
                        value={profileData.businessInfo.businessName || ''}
                        onChange={(e) => handleInputChange('businessInfo.businessName', e.target.value)}
                        className="input-field"
                        placeholder="Nombre de tu empresa"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Tipo de negocio
                    </label>
                    <select
                        value={profileData.businessInfo.businessType || ''}
                        onChange={(e) => handleInputChange('businessInfo.businessType', e.target.value)}
                        className="input-field"
                    >
                        <option value="">Seleccionar tipo</option>
                        <option value="catering">Catering</option>
                        <option value="decoracion">Decoración</option>
                        <option value="musica">Música</option>
                        <option value="fotografia">Fotografía</option>
                        <option value="video">Video</option>
                        <option value="flores">Flores</option>
                        <option value="transportacion">Transportación</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Número de licencia
                    </label>
                    <input
                        type="text"
                        value={profileData.businessInfo.licenseNumber || ''}
                        onChange={(e) => handleInputChange('businessInfo.licenseNumber', e.target.value)}
                        className="input-field"
                        placeholder="Número de licencia"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        RFC / Tax ID
                    </label>
                    <input
                        type="text"
                        value={profileData.businessInfo.taxId || ''}
                        onChange={(e) => handleInputChange('businessInfo.taxId', e.target.value)}
                        className="input-field"
                        placeholder="RFC o Tax ID"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Sitio web
                </label>
                <input
                    type="url"
                    value={profileData.businessInfo.website || ''}
                    onChange={(e) => handleInputChange('businessInfo.website', e.target.value)}
                    className="input-field"
                    placeholder="https://tu-sitio-web.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Redes sociales
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={profileData.businessInfo.socialMedia?.instagram || ''}
                        onChange={(e) => handleInputChange('businessInfo.socialMedia.instagram', e.target.value)}
                        className="input-field"
                        placeholder="Instagram"
                    />
                    <input
                        type="text"
                        value={profileData.businessInfo.socialMedia?.facebook || ''}
                        onChange={(e) => handleInputChange('businessInfo.socialMedia.facebook', e.target.value)}
                        className="input-field"
                        placeholder="Facebook"
                    />
                    <input
                        type="text"
                        value={profileData.businessInfo.socialMedia?.twitter || ''}
                        onChange={(e) => handleInputChange('businessInfo.socialMedia.twitter', e.target.value)}
                        className="input-field"
                        placeholder="Twitter"
                    />
                </div>
            </div>
        </div>
    );

    const renderStats = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
                    <div className="flex items-center">
                        <CalendarDaysIcon className="w-8 h-8 text-primary-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-primary-900">Eventos Totales</p>
                            <p className="text-2xl font-bold text-primary-900">12</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center">
                        <CheckIcon className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-green-900">Completados</p>
                            <p className="text-2xl font-bold text-green-900">8</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center">
                        <UserGroupIcon className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-blue-900">Proveedores</p>
                            <p className="text-2xl font-bold text-blue-900">24</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center">
                        <HeartIcon className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-purple-900">Días activo</p>
                            <p className="text-2xl font-bold text-purple-900">127</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-secondary-200 p-6">
                <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                    Actividad reciente
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-sm text-secondary-600">
                            Evento "Boda de Ana y Carlos" creado hace 2 días
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-secondary-600">
                            Proveedor "Catering Elegante" confirmado hace 1 semana
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-secondary-600">
                            Perfil actualizado hace 2 semanas
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalInfo();
            case 'account':
                return renderAccountSettings();
            case 'security':
                return renderSecuritySettings();
            case 'notifications':
                return renderNotifications();
            case 'business':
                return renderBusinessInfo();
            case 'stats':
                return renderStats();
            default:
                return renderPersonalInfo();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
            <div className="container-elegant">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                            Mi Perfil
                        </h1>
                        <p className="text-secondary-600">
                            Gestiona tu información personal y configuraciones de cuenta
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                                                ? 'bg-primary-100 text-primary-900 border border-primary-200'
                                                : 'text-secondary-600 hover:bg-secondary-100'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                                {renderTabContent()}

                                {/* Save Button */}
                                {activeTab !== 'stats' && (
                                    <div className="mt-8 pt-6 border-t border-secondary-200">
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={loading}
                                            className="btn-primary flex items-center space-x-2"
                                        >
                                            <CheckIcon className="w-4 h-4" />
                                            <span>{loading ? 'Guardando...' : 'Guardar cambios'}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;