import { request, response, Router } from "express"
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController"
import multer from "multer"
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const categoriesRoutes = Router()

const upload = multer({
    dest: "./tmp",
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
)

categoriesRoutes.get("/",
    ensureAuthenticated,
    ensureAdmin,
    listCategoriesController.handle)

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }