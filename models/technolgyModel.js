import mongoose from "mongoose";
const TechnologySchema = mongoose.Schema(
  {
    frontend: {
      type: String,
      required: true,
    },
    backend: {
      type: String,
      required: true,
    },
    database: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    delete_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
const TechnologyModel = mongoose.model("technology", TechnologySchema);
export default TechnologyModel;
