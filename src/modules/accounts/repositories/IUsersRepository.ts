import { ICreateCategoryDTO } from "../../cars/repositories/ICategoriesRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";



interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>

}

export { IUsersRepository }