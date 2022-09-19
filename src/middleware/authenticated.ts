export function authenticated(req, res, next) {
    res.locals.isAdmin = true;
    next();
}