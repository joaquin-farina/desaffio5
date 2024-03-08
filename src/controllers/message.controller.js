class MessageController {
    getMessage = async (req, res) => {
        res.render("chat", { style: "index.css" });
    }
}

export default MessageController