import { Router } from "express";
import { createProductController } from "../controllers/create-product.controller";
import { listAllProductController } from "../controllers/listAll-product.controller";
import { getProductController } from "../controllers/get-product.controller";
import { updateProductController } from "../controllers/update-product.controller";
import { deleteProductController } from "../controllers/delete-product.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";
import { SearchProductController } from "../controllers/search-product.controller";
import { uploadMultipleImages } from "../middlewares/uploadImages";


const productRouter = Router();

productRouter.post("/", uploadMultipleImages, async (req, res) => {
  createProductController(req, res);
});

// productRouter.get("/", isAuth, async (req, res) => {
//   listAllProductController(req, res);
// });

productRouter.get("/:id", async (req, res) => {
  getProductController(req, res);
});

productRouter.get("/", SearchProductController);

productRouter.get("/category/:category_id", async (req, res) => {
  listAllProductController(req, res);
});

productRouter.put("/:id", async (req, res) => {
  updateProductController(req, res);
});

productRouter.delete("/:id", async (req, res) => {
  deleteProductController(req, res);
});

export { productRouter };
