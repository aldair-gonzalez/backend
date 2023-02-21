export const HandleRenderMessages = async (req, res) => {
    res.render('messages', { title: 'Messages' })
}