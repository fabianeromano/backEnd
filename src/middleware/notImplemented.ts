export function notImplemented(req, res) {
    res.status(404).send({ error: -2, descripcion: `ruta '${req.url}' método '${req.method}' no implementada` })
}