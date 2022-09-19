export function notAuthorized(req, res, next) {
    if (res.locals.isAdmin) {
        next();
    } else {
        res.status(404).send({ error: -1, descripcion: `ruta '${req.url}' método '${req.method}' no autorizada` })
    }
}