const isUserGuest = (req, res, next) => {
    if (req.user) {
        return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
    }

    next();
};

const isUserLogged = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized', statusCode: 401 });
    }

    next();
};

const isOwner = (req, res, next) => {
    if (req.user._id != res.locals.preloadData.owner?._id) {
        return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
    }

    next();
};

const isUserRole = (roleArr) => {
    return (req, res, next) => {
        if (req.user.role != res.locals.preloadData.role || !roleArr.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
        }

        next();
    };
};

// const isUserRole = (role) => {
//     return (req, res, next) => {
//         if (req.user.role != res.locals.preloadData.role || req.user.role != role) {
//             return res.status(403).json({ message: 'Forbidden', statusCode: 403 });
//         }

//         next();
//     };
// };

export {
    isUserLogged,
    isUserGuest,
    isOwner,
    isUserRole
};
