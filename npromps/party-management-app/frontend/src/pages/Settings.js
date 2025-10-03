import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';
import toast from 'react-hot-toast';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [activeTab, setActiveTab] = useState('preferences');

  const [settings, setSettings] = useState({
    preferences: {
      language: user?.preferences?.language || 'es',
      timezone: user?.preferences?.timezone || 'America/Mexico_City',
      theme: 'light'
    },
    notifications: {
      email: user?.preferences?.notifications?.email ?? true,
      push: user?.preferences?.notifications?.push ?? true,
      sms: user?.preferences?.notifications?.sms ?? false,
      eventReminders: true,
      providerUpdates: true,
      paymentNotifications: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true
    }
  });

  const tabs = [
    { id: 'preferences', name: 'Preferencias', icon: Cog6ToothIcon },
    { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
    { id: 'privacy', name: 'Privacidad', icon: ShieldCheckIcon },
    { id: 'danger', name: 'Zona de Peligro', icon: ExclamationTriangleIcon }
  ];

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const response = await userService.updateProfile({
        preferences: settings.preferences,
        notifications: settings.notifications,
        privacy: settings.privacy
      });

      if (response.success) {
        toast.success('Configuraciones guardadas exitosamente');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error al guardar las configuraciones');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'ELIMINAR') {
      toast.error('Debes escribir "ELIMINAR" para confirmar');
      return;
    }

    setLoading(true);
    try {
      const response = await userService.deleteAccount();
      if (response.success) {
        toast.success('Cuenta eliminada exitosamente');
        logout();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error al eliminar la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          <GlobeAltIcon className="w-4 h-4 inline mr-2" />
          Idioma
        </label>
        <select
          value={settings.preferences.language}
          onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
          className="input-field"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Zona horaria
        </label>
        <select
          value={settings.preferences.timezone}
          onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
          className="input-field"
        >
          <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
          <option value="America/New_York">Nueva York (GMT-5)</option>
          <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
          <option value="Europe/Madrid">Madrid (GMT+1)</option>
          <option value="Europe/London">Londres (GMT+0)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Tema de la aplicación
        </label>
        <select
          value={settings.preferences.theme}
          onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
          className="input-field"
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="auto">Automático</option>
        </select>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-secondary-900">
          Canales de notificación
        </h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Notificaciones por email
              </h5>
              <p className="text-sm text-secondary-600">
                Recibe actualizaciones importantes por correo electrónico
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Notificaciones push
              </h5>
              <p className="text-sm text-secondary-600">
                Recibe notificaciones en tiempo real en el navegador
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Notificaciones SMS
              </h5>
              <p className="text-sm text-secondary-600">
                Recibe alertas críticas por mensaje de texto
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-200 pt-6">
        <h4 className="text-sm font-medium text-secondary-900 mb-4">
          Tipos de notificaciones
        </h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Recordatorios de eventos
              </h5>
              <p className="text-sm text-secondary-600">
                Notificaciones antes de tus eventos programados
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.eventReminders}
                onChange={(e) => handleSettingChange('notifications', 'eventReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Actualizaciones de proveedores
              </h5>
              <p className="text-sm text-secondary-600">
                Notificaciones cuando los proveedores actualicen sus servicios
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.providerUpdates}
                onChange={(e) => handleSettingChange('notifications', 'providerUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Notificaciones de pagos
              </h5>
              <p className="text-sm text-secondary-600">
                Alertas sobre transacciones y pagos pendientes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.paymentNotifications}
                onChange={(e) => handleSettingChange('notifications', 'paymentNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">
              Control de privacidad
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Configura quién puede ver tu información y contactarte
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Visibilidad del perfil
        </label>
        <select
          value={settings.privacy.profileVisibility}
          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
          className="input-field"
        >
          <option value="public">Público - Cualquiera puede ver tu perfil</option>
          <option value="private">Privado - Solo usuarios conectados</option>
          <option value="friends">Solo contactos - Solo tus contactos pueden ver tu perfil</option>
        </select>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-secondary-900">
          Información visible
        </h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Mostrar email
              </h5>
              <p className="text-sm text-secondary-600">
                Permite que otros usuarios vean tu dirección de email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Mostrar teléfono
              </h5>
              <p className="text-sm text-secondary-600">
                Permite que otros usuarios vean tu número de teléfono
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-secondary-900">
                Permitir mensajes
              </h5>
              <p className="text-sm text-secondary-600">
                Permite que otros usuarios te envíen mensajes privados
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.allowMessages}
                onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDangerZone = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-red-800">
              Zona de Peligro
            </h4>
            <p className="text-sm text-red-700 mt-1">
              Estas acciones son irreversibles. Por favor, procede con precaución.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-red-200 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-red-900 mb-2">
              Eliminar cuenta
            </h4>
            <p className="text-sm text-red-700 mb-4">
              Eliminar permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
            </p>
            <ul className="text-sm text-red-600 space-y-1 mb-4">
              <li>• Todos tus eventos serán eliminados</li>
              <li>• Se cancelarán todos los pagos pendientes</li>
              <li>• Se eliminará tu historial completo</li>
              <li>• No podrás recuperar esta cuenta</li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <TrashIcon className="w-4 h-4" />
          <span>Eliminar cuenta</span>
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preferences':
        return renderPreferences();
      case 'notifications':
        return renderNotifications();
      case 'privacy':
        return renderPrivacy();
      case 'danger':
        return renderDangerZone();
      default:
        return renderPreferences();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Configuración
            </h1>
            <p className="text-secondary-600">
              Personaliza tu experiencia y gestiona las configuraciones de tu cuenta
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
                {activeTab !== 'danger' && (
                  <div className="mt-8 pt-6 border-t border-secondary-200">
                    <button
                      onClick={handleSaveSettings}
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

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-secondary-900">
                Eliminar cuenta
              </h3>
            </div>

            <p className="text-sm text-secondary-600 mb-4">
              Esta acción eliminará permanentemente tu cuenta y todos los datos asociados.
              Esta acción no se puede deshacer.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Para confirmar, escribe <span className="font-mono bg-gray-100 px-2 py-1 rounded">ELIMINAR</span>
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="input-field"
                placeholder="ELIMINAR"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmation !== 'ELIMINAR'}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <TrashIcon className="w-4 h-4" />
                <span>{loading ? 'Eliminando...' : 'Eliminar cuenta'}</span>
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 btn-outline flex items-center justify-center space-x-2"
              >
                <XMarkIcon className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
