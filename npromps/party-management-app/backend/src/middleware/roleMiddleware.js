export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Autenticación requerida.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Permisos insuficientes.'
            });
        }

        next();
    };
};

export const authorizeSelfOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Autenticación requerida.'
        });
    }

    const resourceUserId = req.params.userId || req.params.id;

    if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo puedes acceder a tus propios recursos.'
        });
    }
};

export const authorizeProvider = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Autenticación requerida.'
        });
    }

    if (req.user.role !== 'proveedor') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo los proveedores pueden acceder a este recurso.'
        });
    }

    next();
};

export const authorizeOrganizer = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Autenticación requerida.'
        });
    }

    const organizerRoles = ['cumpleañero', 'planeador_bodas', 'organizador'];

    if (!organizerRoles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo los organizadores pueden acceder a este recurso.'
        });
    }

    next();
};