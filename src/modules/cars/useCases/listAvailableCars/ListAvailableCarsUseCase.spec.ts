import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory; CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "DDDD-5641",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "GEDGHYT-5641",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        })

        expect(cars).toEqual([car])
    })
})