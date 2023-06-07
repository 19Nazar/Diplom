import mongoose from "mongoose";

const DathckicModel = new mongoose.Schema({
    Dathckic: {
        type: String,
    },
});
export default mongoose.model('Dathckic', DathckicModel);