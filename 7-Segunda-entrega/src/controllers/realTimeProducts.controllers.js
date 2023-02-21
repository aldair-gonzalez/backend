export const HandleGetProducts = async (req, res ) => {
    const { page = 1 } = req.query

    res.render('realtime-products', { title: 'Productos en tiempo real', page, })
}