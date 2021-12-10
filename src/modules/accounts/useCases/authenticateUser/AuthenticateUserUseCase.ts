import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../errors/AppErrors";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.UsersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email or Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email or Password incorrect")
        }

        const token = sign({}, "c97e2b57a6c44cb28aa98211dad2811f", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }