import { Router } from "express";
import { categoriesRouter } from "@/categories/infrastructure/http/routes/category.route";
import { clientRouter } from "@/clients/infrastructure/http/routes/client.routes";
import { productRouter } from "@/products/infrastructure/http/routes/products.router";


const routes = Router();

routes.get("/", (req, res) => {
    res.send("Ola Mundo!")
})
routes.use("/category", categoriesRouter);
routes.use("/client", clientRouter);
routes.use("/product", productRouter);


export { routes };
