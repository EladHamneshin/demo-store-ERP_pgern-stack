import * as userService from "../services/userService"


describe("userController",  ()=>{
    test("If getUser returns user by id ",async () =>{
        const user = await userService.getUser("0");
        expect(!user)
    })
})
