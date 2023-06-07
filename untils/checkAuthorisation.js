import  jwt from "jsonwebtoken";

export default (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token){
        try {
            const decoding = jwt.verify(token, 'nazar1');
            req.userId = decoding._id;
            next();
        } catch (err) {
            return res.status(402).json({
                message: 'не має доступу',
            });
        }

    } else {
        return res.status(402).json({
            message: 'не має доступу',
        });
    }
};